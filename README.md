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

Once all the repositories are cloned and updated, build the container networks with

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

The `auction-service` will throw a database error due to the database being
empty. This **might** cause the docker build to stall. You should be able to run
the `postbuild.sh` script successfully as long as the `auction-service` is
running. You should then be able to restart the `auction-service` manually.

### Building the client

The client is not containerized and must be built separately. To do so, do the
following:

```bash

# navigate to submodule directory
cd /path/to/auction-app/client

# install dependencies

npm i # or pnpm/yarn.

# start the server
npm run dev   # or npm run start to run in production mode







```

### Environment Variables

In short, you will need to add a `.env` file to the root directory of the
`notifications-service`, and `auction-service` and `userService`.

User Service:

```bash
AWS_COGNITO_CLIENT_ID=""
AWS_COGNITO_USERPOOL=""
```

Auction Service:

```bash
 PORT=4000
 ADMIN_USERID="c1bba5c0-b001-7085-7a2e-e74d5399c3d1"
 AWS_ACCESS_KEY_ID=""
 AWS_SECRET_ACCESS_KEY_ID=""
 AWS_REGION="us-east-2"
 AWS_COGNITO_USERPOOL_ID="us-east-2_gyo9HVnEr"
 RABBITMQ_HOST="rabbitmq"
 DATABASE_URL: "postgresql://postgres:password@postgres-db:5432/auction_service_db"

```

Notification Service:

```bash
 PORT=4001
 ADMIN_USERID=c1bba5c0-b001-7085-7a2e-e74d5399c3d1
 AWS_ACCESS_KEY_ID=""
 AWS_SECRET_ACCESS_KEY_ID=""
 AWS_REGION="us-east-2"
 AWS_COGNITO_USERPOOL_ID="us-east-2_gyo9HVnEr"
 RABBITMQ_HOST=rabbitmq
 SENDER_EMAIL=kyle@kylelee.dev
 # can only send emails to verified users in SES due to it being run in Sandbox Mode


```

For more detailed instructions please see the `auction-service`, `notification-service` and `userService` README files for
instructions on setting up the `.env` files for the respective services.

### Initiating Stripe API network

```bash
cd stripe
bash run.sh
```

Wait about one minute or so for the service to be up. When prompting to input card details, please use `4242 4242 4242 4242` with any date in the future as expiry date, CVV and name can be anything. This is the way Stripe recognize the test card.

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
