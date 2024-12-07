"""
This is the microservice that handles the shopping cart.
It connects to MongoDB to store the user's shopping cart.
Interface RPC is REST API with Flask API.
This is an Asynchronous Microservice.
"""

from flask import Flask, request, jsonify
from datetime import datetime

import sys
sys.path.insert(0, '..')
from utils import DatabaseLogger
sys.path.pop(0)

from flask_cors import CORS, cross_origin

import logging
logging.basicConfig(level=logging.DEBUG, filename='./cart.log', filemode='a', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

database_logger = DatabaseLogger(
    connection_string='mongodb://mongodb:27017/',
    database_name='shopping_cart'
)

app = Flask(__name__)

cors = CORS(app)  # allow CORS for all domains on all routes.
app.config["CORS_HEADERS"] = "Content-Type"


@app.route('/api/cart', methods=['POST'])
def cart():
    data = request.get_json()
    user_id = data.get('userId')
    if not user_id:
        logger.error('User ID not provided')
        return jsonify({'message': 'User ID not provided', 'status': 400}), 400
    try:
        database_logger.add_user_if_not_exists(user_id)
    except Exception as e:
        logger.error(f'Error adding user: {e}')
        return jsonify({'message': f'Error adding user: {str(e)}', 'status': 500}), 500
    logger.info(f'User {user_id} exists or has been added')

    action = data.get('action')

    if not action:
        logger.error('Action not provided')
        return jsonify({'message': 'Action not provided', 'status': 400}), 400
    logger.info(f'Action: {action} from user {user_id}')

    # Integrated
    if action == "healthcheck":
        return jsonify({'message': 'Cart service is healthy', 'status': 200}), 200
    
    # Integrated
    elif action == 'add':
        item = data.get('item')
        # quantity = data.get('quantity')
        # price = data.get('price')
        # if not item_id or not quantity or not price:
        if not item:
            logger.error('Item not provided')
            return jsonify({'message': 'Item ID, quantity, or price not provided', 'status': 400}), 400
        try:
            database_logger.add_item(user_id, item)
            logger.info(f'Item added to cart for user {user_id}: {item}')
            return jsonify({'message': 'Item added to cart', 'status': 201}), 201
        except Exception as e:
            logger.error(f'Error adding item to cart: {e}')
            return jsonify({'message': f'Error adding item to cart: {str(e)}', 'status': 500}), 500
    
    # Integrated
    elif action == 'remove':
        item_id = data.get('itemId')
        if not item_id:
            logger.error('Item ID not provided')
            return jsonify({'message': 'Item ID not provided', 'status': 400}), 400
        try:
            database_logger.remove_item(user_id, item_id)
            logger.info(f'Item removed from cart: {item_id}')
            return jsonify({'message': 'Item removed from cart', 'status': 200}), 200
        except Exception as e:
            logger.error(f'Error removing item from cart: {e}')
            return jsonify({'message': f'Error removing item from cart: {str(e)}', 'status': 500}), 500
    
    elif action == 'update':
        item_id = data.get('item_id')
        quantity = data.get('quantity')
        if not item_id or not quantity:
            logger.error('Item ID or quantity not provided')
            return jsonify({'message': 'Item ID or quantity not provided', 'status': 400}), 400
        try:
            database_logger.update_item_quantity(user_id, item_id, quantity)
            logger.info(f'Item quantity updated: {item_id}')
            return jsonify({'message': 'Item quantity updated', 'status': 200}), 200
        except Exception as e:
            logger.error(f'Error updating item quantity: {e}')
            return jsonify({'message': f'Error updating item quantity: {str(e)}', 'status': 500}), 500
    
    elif action == 'clear_cart':
        try:
            database_logger.clear_cart(user_id)
            logger.info(f'Cart cleared')
            return jsonify({'message': 'Cart cleared', 'status': 200}), 200
        except Exception as e:
            logger.error(f'Error clearing cart: {e}')
            return jsonify({'message': f'Error clearing cart: {str(e)}', 'status': 500}), 500
    
    # Integrated
    elif action == 'get':
        try:
            logger.info(f'Getting cart for user {user_id}')
            cart = database_logger.get_cart(user_id)
            logger.info(f'Cart retrieved {cart}')
            return jsonify(cart), 200
        except Exception as e:
            logger.error(f'Error getting cart: {e}')
            return jsonify({'message': f'Error getting cart: {str(e)}', 'status': 500}), 500
    
    elif action == 'checkout':
        try:
            order_id = database_logger.checkout(user_id, datetime.now())
            logger.info(f'Checkout successful: {order_id}')
            return jsonify({'order_id': order_id, 'status': 200, "message": "Checkout successful"}), 200
        except Exception as e:
            logger.error(f'Error during checkout: {e}')
            return jsonify({'message': f'Error during checkout: {str(e)}', 'status': 500}), 500
    
    elif action == 'history':
        try:
            history = database_logger.get_order_history(user_id)
            logger.info(f'Order history retrieved {history}')
            return jsonify({'history': history, 'status': 200}), 200
        except Exception as e:
            logger.error(f'Error getting order history: {e}')
            return jsonify({'message': f'Error getting order history: {str(e)}', 'status': 500}), 500
        
    elif action == "clear_history":
        try:
            database_logger.clear_order_history(user_id)
            logger.info(f'Order history cleared')
            return jsonify({'message': 'Order history cleared', 'status': 200}), 200
        except Exception as e:
            logger.error(f'Error clearing order history: {e}')
            return jsonify({'message': f'Error clearing order history: {str(e)}', 'status': 500}), 500
    
    else:
        return jsonify({'message': f'Invalid action: ', 'status': 400}), 400

    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)