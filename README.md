
# Soccer Players API

Tiny RESTful API using Node.js: allows you to manage soccer players.

The idea is to show with a real example some best practices, DynamoDB implementation, the use of LocalStack, how to use Docker Compose to run all locally and some extra things like tests with Jest & SuperTest and documentation with Swagger.

Based and inspired by [this repository](https://github.com/juanip84/api-rest-dynamodb) made by Juan Ignacio Paz.

## Technologies and tools used:

- Node.js.
- Express.
- LocalStack (for DynamoDB).
- Docker & Docker Compose.
- Jest & SuperTest for testing.
- Swagger for documentation.

## Quick start guide

### Prerequisites:

- Docker.

### Setup and LocalStack

This service imitates AWS services. In this case we will use it to have a DynamoDB service locally for development.
It will be used to start it, immediately call setup, to create tables and to put some records to test run:

```bash
docker-compose up -d localstack setup
```

### Start api locally

This service is the Node API for local development. To start the app and start developing right away, just run:

```bash
docker-compose up local
```

The API will restart automatically every time a change is made. To make requests go to http://localhost:3000

### Testing

This service use Jest for unit tests and SuperTest for integration tests. It also produces code coverage reports.

To run all tests execute:

```bash
docker-compose up test
```

#### Code Coverage Report

```
| -------------------------|----------|----------|----------|----------|-------------------|
| File                     |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
| -------------------------|----------|----------|----------|----------|-------------------|
| All files                |    91.23 |     87.5 |    97.06 |    91.12 |                   |
|  src                     |    97.67 |       50 |      100 |    97.67 |                   |
|   app.js                 |      100 |       50 |      100 |      100 |                 7 |
|   config.js              |    83.33 |       50 |      100 |    83.33 |                 6 |
|   router.js              |      100 |      100 |      100 |      100 |                   |
|  src/controllers         |     83.1 |      100 |      100 |     83.1 |                   |
|   players.controller.js  |     83.1 |      100 |      100 |     83.1 |... ,92,93,106,107 |
|  src/daos                |      100 |      100 |      100 |      100 |                   |
|   players.dao.js         |      100 |      100 |      100 |      100 |                   |
|  src/models              |      100 |      100 |      100 |      100 |                   |
|   players.model.js       |      100 |      100 |      100 |      100 |                   |
|  src/repositories        |    85.71 |       50 |     87.5 |    85.71 |                   |
|   dynamodb.repository.js |    85.71 |       50 |     87.5 |    85.71 |             11,22 |
| -------------------------|----------|----------|----------|----------|-------------------|
|
| Test Suites: 2 passed, 2 total
| Tests:       19 passed, 19 total
| Snapshots:   0 total
| Time:        4.264s
| Ran all test suites.
```

### Swagger

This project implements a Swagger UI. To view it, just go to: http://localhost:3000/docs

### Health Check

To check the status of the API go to: http://localhost:3000/status

## Soccer Players Management

### Get All Players

```bash
curl http://localhost:3000/v1/players
```

### Get One Player

```bash
curl http://localhost:3000/v1/players/2
```

### Create Player

```bash
curl -X POST \
  http://localhost:3000/v1/players \
  -H 'Content-Type: application/json' \
  -d '{
	"playerId": "100",
	"myposition": "goalkeeper",
	"fullname": "Gianluigi Donnarumma"
  }'
```

### Update Player

```bash
curl -X PATCH \
  http://localhost:3000/v1/players/100 \
  -H 'Content-Type: application/json' \
  -d '{
	"myposition": "forward",
	"fullname": "Mauro Icardi"
  }'
```

### Delete Player

```bash
curl -X DELETE http://localhost:3000/v1/players/100
```

### Get Dream Team of the Week

This extra endpoint shows the best soccer players of the week. 

Choose 1 goalkeeper, 4 defenders, 3 midfielders and 3 forwards (just random).

Try it and get the dream team of the week ;-)

#### Request

```bash
curl http://localhost:3000/v1/players/dream-team
```

#### Response

```javascript
[
    [
        {
            "myposition": "goalkeeper",
            "fullname": "Alisson Becker"
        }
    ],
    [
        {
            "myposition": "defender",
            "fullname": "Virgil van Dijk"
        },
        {
            "myposition": "defender",
            "fullname": "Jérôme Boateng"
        },
        {
            "myposition": "defender",
            "fullname": "Jordi Alba"
        },
        {
            "myposition": "defender",
            "fullname": "Marcelo Vieira"
        }
    ],
    [
        {
            "myposition": "midfielder",
            "fullname": "Moussa Sissoko"
        },
        {
            "myposition": "midfielder",
            "fullname": "Paul Pogba"
        },
        {
            "myposition": "midfielder",
            "fullname": "Toni Kroos"
        }
    ],
    [
        {
            "myposition": "forward",
            "fullname": "Paulo Dybala"
        },
        {
            "myposition": "forward",
            "fullname": "Cristiano Ronaldo"
        },
        {
            "myposition": "forward",
            "fullname": "Lionel Messi"
        }
    ]
]
```

## Commands Summary

```bash
# Run Setup
docker-compose up -d localstack setup

# Start Api
docker-compose up local

# Run Tests
docker-compose up test

# Restart All :-P
docker-compose down ; docker-compose up -d localstack setup ; docker-compose up local
```

## Endpoints Summary

### Info

- Default: `GET http://localhost:3000`

- Status: `GET http://localhost:3000/status`

### Players

- Get All Players: `GET http://localhost:3000/v1/players`

- Create Player: `POST http://localhost:3000/v1/players`

- Get One Player: `GET http://localhost:3000/v1/players/{{playerId}}`

- Update Player: `PATCH http://localhost:3000/v1/players/{{playerId}}`

- Delete Player: `DELETE http://localhost:3000/v1/players/{{playerId}}`

- Dream Team: `GET http://localhost:3000/v1/players/dream-team`

## That's all

I hope you enjoy it :-)
