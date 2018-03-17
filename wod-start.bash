docker-compose -f docker-compose.db.yaml up -d
pm2 start --name wod yarn -- start
