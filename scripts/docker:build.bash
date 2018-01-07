export $(cat .env | grep -v ^# | xargs)
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
PACKAGE_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
echo 'Start build image with project id: ' $(gcloud config get-value project), name: $PACKAGE_NAME tag: $PACKAGE_VERSION
docker build -t gcr.io/$(gcloud config get-value project)/$PACKAGE_NAME:$PACKAGE_VERSION --rm .
docker tag gcr.io/$(gcloud config get-value project)/$PACKAGE_NAME:$PACKAGE_VERSION gcr.io/$(gcloud config get-value project)/$PACKAGE_NAME:latest