import pika
import json

import sys
sys.path.insert(0, '..')
from utils import DatabaseLogger
sys.path.pop(0)

import logging
logging.basicConfig(level=logging.DEBUG, filename='./cart-rabbitmq.log', filemode='a', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize the database logger
database_logger = DatabaseLogger(
    connection_string="mongodb://mongodb:27017/",
    database_name="shopping_cart"
)


def process_message(ch, method, properties, body):
    """
    Callback to process a message from RabbitMQ.
    Adds the item to the shopping cart database.
    """
    try:
        # Decode the message body
        message = json.loads(body)
        logger.info(f"Received message: {message}")

        auction_data = message.get('auctionData', {})
        user_id = auction_data.get('bid', {}).get('userId')
        item = auction_data.get('auction')

        if not user_id or not item:
            logger.error("Invalid message structure. Missing userId or item.")
            raise ValueError("Invalid message structure. Missing userId or item.")

        # Add the item to the database
        # database_logger.add_item(user_id, item)
        # logger.info(f"Successfully added item {item['id']} to user {user_id}'s cart.")

        # Acknowledge message
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        logger.error(f"Failed to process message: {e}")
        # Reject the message and requeue it for retry
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

def main():
    """
    Sets up RabbitMQ connection and starts consuming messages.
    """
    # RabbitMQ connection parameters
    rabbitmq_host = "rabbitmq"  # Replace with your RabbitMQ host
    exchange = "cart-exchange"
    queue = "cart-queue"
    routing_key = "auction.atc"

    # Establish a connection to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host))
    channel = connection.channel()

    # Declare exchange and queue
    channel.exchange_declare(exchange=exchange, exchange_type="direct", durable=True)
    channel.queue_declare(queue=queue, durable=True)
    channel.queue_bind(queue=queue, exchange=exchange, routing_key=routing_key)

    logger.info(f"Listening for messages on queue '{queue}'...")
    print(f"Listening for messages on queue '{queue}'...")

    # Start consuming messages
    channel.basic_consume(queue=queue, on_message_callback=process_message, auto_ack=False)

    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        logger.error("Received sigkill. Stopping consumer...")
        print("Stopping consumer...")
        channel.stop_consuming()
    finally:
        connection.close()

if __name__ == "__main__":
    main()
