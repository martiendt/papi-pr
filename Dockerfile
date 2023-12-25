FROM node:lts-bullseye
RUN npm install -g bun
ENV NODE_ENV=test
USER node
WORKDIR /home/node/app
COPY --chown=node:node package.json bun.lockb ./
RUN bun install --frozen-lock
COPY --chown=node:node . .
RUN bun test

ENV NODE_ENV=production
CMD ["bun", "run", "start"]