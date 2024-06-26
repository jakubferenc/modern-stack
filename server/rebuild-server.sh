#!/usr/bin/env bash
docker-compose stop
docker-compose rm
rm -rf ~/.docker/config.json
rm -rf db-data
docker build . -t modern-stack-server
docker-compose up --force-recreate
