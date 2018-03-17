
# WOD Register site


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

## Build
```
$ yarn build // output will be >>> ./bundle.tar
```

## Deployment

### Pre-requisite install
- docker
- docker-compose
- nodejs 9++
- pm2
- yarn

## Start service
- extract tar file from build step
- create `.env` file from `.env.example` and fill all environment
- launch script
```
$ sh wod-start.bash
```



## For admin pdf render thai font
```
sudo apt install xfonts-thai 
```
