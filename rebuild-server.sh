#!/usr/bin/env bash
cd server
rm -rf ~/.docker/config.json
rm -rf db-data
docker build . -t modern-stack-server
docker-compose stop
docker-compose rm
docker-compose up -d --force-recreate
