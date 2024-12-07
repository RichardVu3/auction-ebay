#!/bin/bash

# docker stop $(docker ps -qa)

docker remove -v $(docker ps -a | awk '/shopping-cart-shopping_cart_service/ {print $1}')
docker remove -v $(docker ps -a | awk '/shopping-cart-rabbitmq_consumer/ {print $1}')

docker rmi $(docker images --format "{{.Repository}} {{.Tag}} {{.ID}}" | awk '/shopping-cart-shopping_cart_service/ {print $3}')
docker rmi $(docker images --format "{{.Repository}} {{.Tag}} {{.ID}}" | awk '/shopping-cart-rabbitmq_consumer/ {print $3}')
