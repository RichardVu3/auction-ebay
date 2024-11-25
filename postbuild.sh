docker exec -it auction-service npx prisma migrate
docker exec -it auction-service npm run seed
docker exec -it notification-service npx prisma migrate
