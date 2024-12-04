docker exec -it auction-service npx prisma migrate dev
docker exec -it auction-service npm run seed
