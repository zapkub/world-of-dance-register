export $(cat .env | grep -v ^# | xargs)

echo 'Deploy WOD to' $DEPLOY_TARGET

rsync -e 'ssh -o "StrictHostKeyChecking=no"' -avz ./bundle.tar $DEPLOY_TARGET:~/wod.tar

echo 'Deliver complete, waiting for extracting and yarn install'
ssh -o "StrictHostKeyChecking=no" -t $DEPLOY_TARGET 'cd ~ && mkdir -p wod && ls && tar -xvf wod.tar -C ~/wod && cd wod && yarn'
