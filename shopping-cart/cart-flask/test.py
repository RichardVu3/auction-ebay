import httpx
import pytest
import asyncio

USER_ID = "TEST_USER_ID"
URL = "http://127.0.0.1:8000/cart"

async def clear_cart():
    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={"user_id": USER_ID, "action": "clear_cart"},
        )
        assert response.status_code == 200
        assert response.json() == {"message": "Cart cleared", "status": 200}

async def clear_history():
    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={"user_id": USER_ID, "action": "clear_history"},
        )
        assert response.status_code == 200
        assert response.json() == {"message": "Order history cleared", "status": 200}

async def run_test_add_items():
    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={
                "user_id": USER_ID,
                "item_id": "TEST_ITEM_1",
                "quantity": 1,
                "price": 10.0,
                "action": "add",
            },
        )
        assert response.status_code == 201
        assert response.json() == {"message": "Item added to cart", "status": 201}

        response = await client.post(
            URL,
            json={
                "user_id": USER_ID,
                "item_id": "TEST_ITEM_2",
                "quantity": 2,
                "price": 20.0,
                "action": "add",
            },
        )
        assert response.status_code == 201
        assert response.json() == {"message": "Item added to cart", "status": 201}

    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={"user_id": USER_ID, "action": "get"},
        )
        assert response.status_code == 200
        assert response.json() == {
            "cart": [
                {"item_id": "TEST_ITEM_1", "quantity": 1, "price": 10.0},
                {"item_id": "TEST_ITEM_2", "quantity": 2, "price": 20.0},
            ],
            "status": 200,
        }

async def run_test_remove_items():
    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={
                "user_id": USER_ID,
                "item_id": "TEST_ITEM_1",
                "quantity": 1,
                "price": 10.0,
                "action": "add",
            },
        )
        assert response.status_code == 201
        assert response.json() == {"message": "Item added to cart", "status": 201}

        response = await client.post(
            URL,
            json={
                "user_id": USER_ID,
                "item_id": "TEST_ITEM_2",
                "quantity": 1,
                "price": 20.0,
                "action": "add",
            },
        )
        assert response.status_code == 201
        assert response.json() == {"message": "Item added to cart", "status": 201}

    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={
                "user_id": USER_ID,
                "item_id": "TEST_ITEM_1",
                "action": "remove",
            },
        )
        assert response.status_code == 200
        assert response.json() == {"message": "Item removed from cart", "status": 200}

    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={"user_id": USER_ID, "action": "get"},
        )
        assert response.status_code == 200
        assert response.json() == {
            "cart": [
                {"item_id": "TEST_ITEM_2", "quantity": 1, "price": 20.0},
            ],
            "status": 200,
        }

async def run_test_update_items():
    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={
                "user_id": USER_ID,
                "item_id": "TEST_ITEM_1",
                "quantity": 1,
                "price": 10.0,
                "action": "add",
            },
        )
        assert response.status_code == 201
        assert response.json() == {"message": "Item added to cart", "status": 201}

    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={
                "user_id": USER_ID,
                "item_id": "TEST_ITEM_1",
                "quantity": 2,
                "action": "update",
            },
        )
        assert response.status_code == 200
        assert response.json() == {"message": "Item quantity updated", "status": 200}

    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={"user_id": USER_ID, "action": "get"},
        )
        assert response.status_code == 200
        assert response.json() == {
            "cart": [
                {"item_id": "TEST_ITEM_1", "quantity": 2, "price": 10.0},
            ],
            "status": 200,
        }

async def run_test_checkout():
    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={
                "user_id": USER_ID,
                "item_id": "TEST_ITEM_1",
                "quantity": 1,
                "price": 10.0,
                "action": "add",
            },
        )
        assert response.status_code == 201
        assert response.json() == {"message": "Item added to cart", "status": 201}

    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={"user_id": USER_ID, "action": "checkout"},
        )
        assert response.status_code == 200
        response_message = response.json()
        order_id = response_message.pop("order_id")
        assert USER_ID in order_id
        assert response_message == {"message": "Checkout successful", "status": 200}

    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={"user_id": USER_ID, "action": "get"},
        )
        assert response.status_code == 200
        assert response.json() == {"cart": [], "status": 200}

    async with httpx.AsyncClient(timeout=None) as client:
        response = await client.post(
            URL,
            json={"user_id": USER_ID, "action": "history"},
        )
        assert response.status_code == 200
        order_history = response.json()["history"]
        assert order_history[0]["order_id"]
        assert order_history[0]["order_date"]
        assert order_history[0]["items"] == [
            {
            "item_id": "TEST_ITEM_1",
            "quantity": 1,
            "price": 10.0,
            }
        ]

def test_add_items():
    asyncio.run(run_test_add_items())

def test_remove_items():
    asyncio.run(run_test_remove_items())

def test_update_items():
    asyncio.run(run_test_update_items())

def test_checkout():
    asyncio.run(run_test_checkout())

@pytest.fixture(scope="function", autouse=True)
def teardown():
    yield
    asyncio.run(clear_history())
    asyncio.run(clear_cart())
