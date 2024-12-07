FROM python:3.12

WORKDIR /shopping-cart/cart-rabbitmq

COPY cart-rabbitmq/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./cart-rabbitmq/cart-consumer.py .

COPY ./utils /shopping-cart/cart-rabbitmq/utils

CMD ["python3", "cart-consumer.py"]
