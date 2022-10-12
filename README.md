# BTC_UAH_API

## Technology stack

-   TypeScript
-   Express.js
-   Jest / Supertest
-   Docker

## Architecture
![BTC TO UAH ARCH (1)](https://user-images.githubusercontent.com/65043455/192067123-8ef1ea32-21f0-4a31-8174-11f21ab91373.png)


## Installation

### Clone project

```bash
git clone https://github.com/GenesisEducationKyiv/hw1-se-school_2022-code-review-DHushchin
```

### Install dependencies

```bash
npm install
```

### Set up environment

-   Create .env file

```bash
EMAIL_NAME='example@gmail.com'
EMAIL_PASSWORD='example_password'
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
COINMARKETCAP_API_KEY="example_api_key"
```

## Usage

### Node

```bash
npm start
```

### Linters

```bash
npm run format:check
npm run format:fix
npm run tslint:check
npm run tslint:fix
```

### Testing

```bash
npm test
```

### Dockerfile

-   Build image

```bash
docker build -t btc_auh_api .
```

-   Run container

```bash
docker run -d -p 3000:3000 --rm --name rate btc_auh_api
```

-   Stop container

```bash
docker stop rate
```

### Makefile

You can also do the same using Makefile.

-   Build image

```bash
make build
```

-   Run container

```bash
make run
```

-   Stop container

```bash
make stop
```

### Docker-compose

-   Run services

```bash
docker-compose run --rm waitforrabbit
docker-compose up btc-uah log-consumer
```