export $(cat .env | grep -v ^# | xargs)

echo 'Deploy WOD to' $DEPLOY_TARGET

rsync -e 'ssh -o "StrictHostKeyChecking=no"' -avz ./bundle.tar $DEPLOY_TARGET:/opt/wod.tar

echo 'Deliver complete, waiting for extracting and yarn install'
ssh -o "StrictHostKeyChecking=no" -t $DEPLOY_TARGET 'cd /opt && mkdir -p wod && ls && tar -xvf wod.tar -C /opt/wod && cd wod && yarn'

