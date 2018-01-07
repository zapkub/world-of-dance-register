FROM node:8.9.1 as builder

WORKDIR /usr/app
ENV NODE_ENV development
COPY . /usr/app
RUN yarn && \
  sh ./scripts/build.bash && \
  rm -rf node_modules && \
  rm -rf .git

FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/app
COPY --from=builder /usr/app .
ENV NODE_ENV production
RUN yarn --production --only=production && \
  npm i --production -g --quiet --depth 0 modclean && \
  modclean -r -D /node_modules && \
  npm r -g --quiet modclean && du -ms .

EXPOSE 8080
CMD ["yarn", "start"]