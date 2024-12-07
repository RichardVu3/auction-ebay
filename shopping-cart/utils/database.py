from pymongo import MongoClient
import time

import logging
logging.basicConfig(level=logging.DEBUG, filename='./database.log', filemode='a', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class DatabaseLogger:
    """
    This class handles all database operations for the shopping cart in MongoDB.
    The documents schema is as follows:
        "shopping_cart": {
            "user_id": {
                "cart": [
                    {
                        "item_id": str,
                        "quantity": int,
                        "price": float
                    },
                    {
                        "item_id": str,
                        "quantity": int,
                        "price": float
                    }
                ],
                "order_history": [
                    {
                        "order_id": str,
                        "order_date": datetime,
                        "items": [
                            {
                                "item_id": str,
                                "quantity": int,
                                "price": float
                            },
                            {
                                "item_id": str,
                                "quantity": int,
                                "price": float
                            }
                        ],
                    },
                ]
            }
        }
    """
    def __init__(self, connection_string, database_name, retries=10):
        while retries > 0:
            try:
                self.client = MongoClient(connection_string)
            except Exception as e:
                retries -= 1
                time.sleep(2)
            else:
                logger.info('Database connection established')
                break
        if not hasattr(self, 'client'):
            logger.error('Could not establish database connection')
            raise Exception('Could not establish database connection')

        self.db_name = self.client[database_name]
        self.shopping_cart = self.db_name[database_name]

    # async def add_user_if_not_exists(self, user_id):
    #     """
    #     Add a user to the database.
    #     """
    #     user_cart = self.shopping_cart.find_one({'user_id': user_id})
    #     if not user_cart:
    #         user_cart = {
    #             'user_id': user_id,
    #             'cart': [],
    #             'order_history': []
    #         }
    #         self.shopping_cart.insert_one(user_cart)
    #         logger.info(f'User {user_id} added to database')

    # async def add_item(self, user_id, item_id, quantity, price):
    #     """
    #     Add an item to the user's shopping cart.
    #     """
    #     user_cart = self.shopping_cart.find_one({'user_id': user_id})
    #     if not user_cart:
    #         user_cart = {
    #             'user_id': user_id,
    #             'cart': []
    #         }
    #     user_cart['cart'].append({
    #         'item_id': item_id,
    #         'quantity': quantity,
    #         'price': price
    #     })
    #     self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart}, upsert=True)
    #     logger.info(f'Item {item_id} added to cart for user {user_id}')

    # async def remove_item(self, user_id, item_id):
    #     """
    #     Remove an item from the user's shopping cart.
    #     """
    #     user_cart = self.shopping_cart.find_one({'user_id': user_id})
    #     if not user_cart:
    #         logger.error(f'User {user_id} does not have a shopping cart')
    #         raise Exception(f'User {user_id} does not have a shopping cart')
    #     user_cart['cart'] = [item for item in user_cart['cart'] if item['item_id'] != item_id]
    #     self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart})
    #     logger.info(f'Item {item_id} removed from cart for user {user_id}')

    # async def update_item_quantity(self, user_id, item_id, quantity):
    #     """
    #     Update the quantity of an item in the user's shopping cart.
    #     """
    #     user_cart = self.shopping_cart.find_one({'user_id': user_id})
    #     if not user_cart:
    #         logger.error(f'User {user_id} does not have a shopping cart')
    #         raise Exception(f'User {user_id} does not have a shopping cart')
    #     for item in user_cart['cart']:
    #         if item['item_id'] == item_id:
    #             item['quantity'] = quantity
    #     self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart})
    #     logger.info(f'Item {item_id} quantity updated to {quantity} for user {user_id}')

    # async def clear_cart(self, user_id):
    #     """
    #     Clear the user's shopping cart.
    #     """
    #     self.shopping_cart.delete_one({'user_id': user_id})
    #     logger.info(f'Cart cleared for user {user_id}')

    # async def get_cart(self, user_id):
    #     """
    #     Get the user's shopping cart.
    #     """
    #     user_cart = self.shopping_cart.find_one({'user_id': user_id})
    #     if not user_cart:
    #         logger.error(f'User {user_id} does not have a shopping cart')
    #         raise Exception(f'User {user_id} does not have a shopping cart')
    #     logger.info(f'Cart retrieved for user {user_id}')
    #     return user_cart['cart']
    
    # async def checkout(self, user_id, order_date):
    #     """
    #     Checkout the user's shopping cart.
    #     """
    #     user_cart = self.shopping_cart.find_one({'user_id': user_id})
    #     if not user_cart:
    #         logger.error(f'User {user_id} does not have a shopping cart')
    #         raise Exception(f'User {user_id} does not have a shopping cart')
    #     order_id = user_id + str(order_date)
    #     order = {
    #         'order_id': order_id,
    #         'order_date': order_date,
    #         'items': user_cart['cart']
    #     }
    #     if 'order_history' not in user_cart:
    #         user_cart['order_history'] = []
    #     user_cart['order_history'].append(order)
    #     user_cart['cart'] = []
    #     self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart})
    #     logger.info(f'Order {order_id} placed for user {user_id}')
    #     return order_id

    # async def get_order_history(self, user_id):
    #     """
    #     Get the user's order history.
    #     """
    #     user_cart = self.shopping_cart.find_one({'user_id': user_id})
    #     if not user_cart:
    #         logger.error(f'User {user_id} does not have a shopping cart')
    #         raise Exception(f'User {user_id} does not have a shopping cart')
    #     if 'order_history' not in user_cart:
    #         logger.info(f'User {user_id} does not have any order history')
    #         return []
    #     return user_cart['order_history']
    
    # async def clear_order_history(self, user_id):
    #     """
    #     Clear the user's order history.
    #     """
    #     user_cart = self.shopping_cart.find_one({'user_id': user_id})
    #     if not user_cart:
    #         logger.error(f'User {user_id} does not have a shopping cart')
    #         raise Exception(f'User {user_id} does not have a shopping cart')
    #     if 'order_history' not in user_cart:
    #         logger.info(f'User {user_id} does not have any order history')
    #         return
    #     user_cart['order_history'] = []
    #     self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart})
    #     logger.info(f'Order history cleared for user {user_id}')
    
    def close(self):
        """
        Close the database connection.
        """
        self.client.close()
        logger.info('Database connection closed')



    def add_user_if_not_exists(self, user_id):
        """
        Add a user to the database.
        """
        user_cart = self.shopping_cart.find_one({'user_id': user_id})
        if not user_cart:
            user_cart = {
                'user_id': user_id,
                'cart': [],
                'order_history': []
            }
            self.shopping_cart.insert_one(user_cart)
            logger.info(f'User {user_id} added to database')

    def add_item(self, user_id, item):
        """
        Add an item to the user's shopping cart.
        """
        user_cart = self.shopping_cart.find_one({'user_id': user_id})
        if not user_cart:
            user_cart = {
                'user_id': user_id,
                'cart': []
            }
        user_cart['cart'].append(item)
        self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart}, upsert=True)
        logger.info(f'Item added to cart for user {user_id}')

    def remove_item(self, user_id, item_id):
        """
        Remove an item from the user's shopping cart.
        """
        user_cart = self.shopping_cart.find_one({'user_id': user_id})
        if not user_cart:
            logger.error(f'User {user_id} does not have a shopping cart')
            raise Exception(f'User {user_id} does not have a shopping cart')
        user_cart['cart'] = [item for item in user_cart['cart'] if item['id'] != item_id]
        self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart})
        logger.info(f'Item {item_id} removed from cart for user {user_id}')

    def update_item_quantity(self, user_id, item_id, quantity):
        """
        Update the quantity of an item in the user's shopping cart.
        """
        user_cart = self.shopping_cart.find_one({'user_id': user_id})
        if not user_cart:
            logger.error(f'User {user_id} does not have a shopping cart')
            raise Exception(f'User {user_id} does not have a shopping cart')
        for item in user_cart['cart']:
            if item['item_id'] == item_id:
                item['quantity'] = quantity
        self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart})
        logger.info(f'Item {item_id} quantity updated to {quantity} for user {user_id}')

    def clear_cart(self, user_id):
        """
        Clear the user's shopping cart.
        """
        self.shopping_cart.delete_one({'user_id': user_id})
        logger.info(f'Cart cleared for user {user_id}')

    def get_cart(self, user_id):
        """
        Get the user's shopping cart.
        """
        user_cart = self.shopping_cart.find_one({'user_id': user_id})
        if not user_cart:
            logger.error(f'User {user_id} does not have a shopping cart')
            raise Exception(f'User {user_id} does not have a shopping cart')
        logger.info(f'Cart retrieved for user {user_id}')
        return user_cart['cart']
    
    def checkout(self, user_id, order_date):
        """
        Checkout the user's shopping cart.
        """
        user_cart = self.shopping_cart.find_one({'user_id': user_id})
        if not user_cart:
            logger.error(f'User {user_id} does not have a shopping cart')
            raise Exception(f'User {user_id} does not have a shopping cart')
        order_id = user_id + str(order_date)
        order = {
            'order_id': order_id,
            'order_date': order_date,
            'items': user_cart['cart']
        }
        if 'order_history' not in user_cart:
            user_cart['order_history'] = []
        user_cart['order_history'].append(order)
        user_cart['cart'] = []
        self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart})
        logger.info(f'Order {order_id} placed for user {user_id}')
        return order_id

    def get_order_history(self, user_id):
        """
        Get the user's order history.
        """
        user_cart = self.shopping_cart.find_one({'user_id': user_id})
        if not user_cart:
            logger.error(f'User {user_id} does not have a shopping cart')
            raise Exception(f'User {user_id} does not have a shopping cart')
        if 'order_history' not in user_cart:
            logger.info(f'User {user_id} does not have any order history')
            return []
        return user_cart['order_history']
    
    def clear_order_history(self, user_id):
        """
        Clear the user's order history.
        """
        user_cart = self.shopping_cart.find_one({'user_id': user_id})
        if not user_cart:
            logger.error(f'User {user_id} does not have a shopping cart')
            raise Exception(f'User {user_id} does not have a shopping cart')
        if 'order_history' not in user_cart:
            logger.info(f'User {user_id} does not have any order history')
            return
        user_cart['order_history'] = []
        self.shopping_cart.update_one({'user_id': user_id}, {'$set': user_cart})
        logger.info(f'Order history cleared for user {user_id}')
