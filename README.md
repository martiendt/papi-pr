# Pointhub API Starter

## Features
- **Compression** Using gzip compression with [Compression](https://github.com/expressjs/compression)
- **CORS** Cross-Origin Resource-Sharing enabled using [Cors](https://github.com/expressjs/cors)
- **Environment Variable** using [dotenv](https://www.npmjs.com/package/dotenv)
- **Secure HTTP Headers** using [Helmet](https://github.com/helmetjs/helmet)

## Development Stack
- [Bun](https://bun.sh) JavaScript run-time environment
- [Express](https://expressjs.com) Node.js framework
- [Typescript](https://www.typescriptlang.org) for type checking
- [Bun Test](https://bun.sh/guides/test) for unit testing
- [Supertest](https://www.npmjs.com/package/supertest) for e2e testing
- [ESLint](https://eslint.org) for code linting
- [Prettier](https://prettier.io) for code formatting

## Services
- [MongoDB](https://www.mongodb.com/docs/drivers/node/current/) Database

## Directory Structure

```bash
PAPI-STARTER
├── node_modules
├── src
│   ├── assets
│   ├── config
│   ├── database
│   ├── middleware
│   ├── modules
│   │   └── example
│   │       ├── controller
│   │       ├── model
│   │       ├── use-case
│   │       ├── validation
│   │       └── router.ts
│   ├── services
│   └── test
│       ├── setup.ts
│       ├── teardown.ts
│       └── utils.ts
├── .env.example
├── .cli.ts
└── README.md
```

## Contribution Guide

---

### Database for development

Since transactions are built on concepts of logical sessions they require mechanics which are only available in a replica set environment.

Choose one of the options that you prefer

- Install offline MongoDB database replica set using docker
[Docker MongoDB RS](https://github.com/point-hub/docker-mongodb-rs)

- Use online Database as a Service (DBaaS) [Atlas MongoDB](https://www.mongodb.com/atlas/database)

### Installation

```bash
cp .env.example .env
cp .env.test.example .env.test
bun install --frozen-lock
bun run dev
```

### Setup Database

#### Add Validation Schema

```bash
bun cli db:init
```

#### Seed Default Database

```bash
bun cli db:seed
```

### Testing

Setup Database Schema

```bash
bun cli db:init --db-name="starterTestDB"
```

Testing all test case

```bash
npm run test
```

Testing specific file or folder

```bash
# Test specific file
npm run test -- src/modules/example/controller/create.spec

# Test specific folder
npm run test -- src/modules/example/controller

# Test example module
npm run test -- src/modules/example
```

(Optional) Running test from docker

1. Check running container

```bash
docker ps
```

```bash
CONTAINER ID   IMAGE              COMMAND                  CREATED             STATUS                PORTS                                 NAMES
902293b368b3   papi-starter-api   "docker-entrypoint.s…"   About an hour ago   Up 11 minutes         0.0.0.0:3000->3000/tcp
```

2. Access docker container using CONTAINER ID above

```bash
docker exec -it 902293b368b3 bash
```

3. Run test inside docker container

```bash
node@902293b368b3:~/app$ npm run test
```

### Deployment

```bash
docker build -t pointhub/papi-starter .
```