ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY . .

USER node

RUN npm install

CMD ["npm", "run", "dev"]
