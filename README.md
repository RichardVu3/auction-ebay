# Auction App

## Setup:

### Getting all of the repos

Clone the repo and update the submodules

```bash

# clone
git clone <repo url>
cd path/to/this/repos

# update submodules. ONLY USE THIS COMMAND THE FIRST TIME
git submodules update --init --recursive
```

To update submodules after the initial update, use the following command:

```bash

git submodules update --merge --remote --recursive
```

### Building Docker Container Network

Once all the repositories are cloned, build the container networks with

```bash
# builds all of the submodules and dependencies containers
docker compose up --build
```

You can see the configuration in `docker-compose.yaml`

### Post Build Database Initialization

The `auction-service` needs to have the SQL migrations
applied to their respective databases. The auction service also needs some
filler data in order to populate the client application properly. In order to do
this run the `postbuild.sh` script.

```bash
# you may need to run chmod +x postbuild.sh if you get a permission error
./postbuild.sh
```

## Port Mappings

Each service needs to listen on a port. Here's the port mapping:

- mongodb container: 27017

- postgresql container: 5433

- rabbitmq container: 5672 (admin management UI: 15672 )

- api-gateway: 42069

- auctions-service: 4000

- notifications-service: 4001

- users-service: 8080

- metrics-service: 8001 

- cart-service: 8000

- client: 5173
