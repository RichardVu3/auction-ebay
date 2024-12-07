FROM python:3.12

WORKDIR /shopping-cart/cart-flask

COPY cart-flask/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY cart-flask/shopping-cart.py .

COPY ./utils /shopping-cart/cart-flask/utils

EXPOSE 8000

CMD ["python3", "shopping-cart.py"]
