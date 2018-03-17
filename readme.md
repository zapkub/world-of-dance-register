
# WOD Register site

## Pre-requisite install
- docker
- docker-compose
- nodejs 9++
- pm2
- yarn

## Start service
```
$ sh wod-start.bash
```


## TODO
- need to do a lot of source code improvement...

## Development
clone this repo and create `.env` from `.env.example`

```
yarn install

docker-compose -f docker-compose.db.yaml up -d
// or start db without docker

yarn dev
```
## Requirement
Host machine require
- ssh
- docker, docker-compose

## if no docker
- nodejs 9.0.0 +
- mongodb 3.4 +


## For admin pdf render thai font
```
sudo apt install xfonts-thai 
```
