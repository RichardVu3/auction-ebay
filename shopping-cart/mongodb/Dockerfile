FROM mongo:latest

# Create initialization scripts to set up the database and collections
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose MongoDB's default port
EXPOSE 27017
