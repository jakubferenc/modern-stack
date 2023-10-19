#!/usr/bin/env bash
cd server
docker build . -t modern-stack-server
docker-compose stop
docker-compose rm
docker-compose up -d --force-recreate
