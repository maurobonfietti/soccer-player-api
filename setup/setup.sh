#!/bin/sh

cd /setup

# Wait just in case LocalStack delays the start
sleep 7s

# Create table in DynamoDB
aws dynamodb create-table --endpoint-url http://localstack:4566 --cli-input-json file://create-players.json

# Insert data
aws dynamodb batch-write-item --request-items file://players-v1.json --endpoint-url http://localstack:4566
aws dynamodb batch-write-item --request-items file://players-v2.json --endpoint-url http://localstack:4566
aws dynamodb batch-write-item --request-items file://players-v3.json --endpoint-url http://localstack:4566
