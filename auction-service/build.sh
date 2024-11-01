docker run -d -p 27017:27017 \
	--name auction-service-db \
	-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
	-e MONGO_INITDB_ROOT_PASSWORD=password \
	mongo:latest
