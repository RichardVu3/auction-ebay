FROM python:3.12

WORKDIR /shopping-cart

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python3", "shopping-cart.py"]
