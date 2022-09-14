# BTC_UAH_API

## Stack Technologies

-   TypeScript
-   Node.js
-   Express.js
-   Docker

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
CRYPTO_CURRENCY_PROVIDER="provider"
```

## Usage

### Node

```bash
npm start
```

### Docker

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

Navigate to localhost:3000/api/\*route\*. You should get your API running. Edit a component file in src, save it, and reload the project to see your changes.
