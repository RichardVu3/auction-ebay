# Auction App

## Setup:

### Getting all of the repos

Clone all the individual repositories into a single directory. Example:

```bash
mkdir app && cd app
git clone <git repos>
```

If you've done this correctly, the directory that you cloned all of the repos in
should look similar to this:

```bash
root
├── api-gateway
├── auction-ebay-user-service
├── auction-service
├── client
├── docker-compose.yml
├── notification-service
├── postbuild.sh
└── README.md

```

### Building Docker Container Network

Once all the repositories are cloned, build the container networks with `docker compose up --build`

You can see the configuration in `docker-compose.yaml`

### Post Build Database Initializations

The `auction-service` and `notification-service` need to have the SQL migrations
applied to their respective databases. The auction service also needs some
filler data in order to populate the client application properly. In order to do
this run the `postbuild.sh` script.

```bash
# you may need to run chmod +x postbuild.sh if you get a permission error

./postbuild.sh

```

## Port Mappings

Each service needs to listen on a port. Here's the port mapping:

- api-gateway: 42069

- auctions-service: 4000

- notifications-service: 4001

- users-service: 8080

- client: 5173
