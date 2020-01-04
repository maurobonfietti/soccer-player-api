const dynamodbRepository = require('../repositories/dynamodb.repository');

class PlayersDao {
    static async getPlayers(limit = 500) {
        const params = {
            TableName: 'players',
            KeyConditionExpression: "mytype = :mytype",
            ExpressionAttributeValues: {
                ':mytype': 'player'
            },
            ProjectionExpression: 'playerId, fullname, myposition',
            ScanIndexForward: true,
            Limit: limit
        };
        const result = await dynamodbRepository.query(params);

        return result.Items;
    }

    static async getPlayer(playerId) {
        const params = {
            TableName: 'players',
            IndexName: 'playerId-index',
            KeyConditionExpression: "playerId = :playerId",
            ExpressionAttributeValues: {
                ':playerId': playerId
            },
            ProjectionExpression: 'playerId, fullname, myposition',
            Limit: 1
        };
        const result = await dynamodbRepository.query(params);

        return result.Items;
    }

    static async insertPlayer(item) {
        const params = {
            TableName: 'players',
            Item: item,
            ReturnValues: 'NONE'
        };

        return dynamodbRepository.put(params);
    }

    static async updatePlayer(playerId, myposition, fullname) {
        const params = {
            TableName: 'players',
            Key: {
                'mytype': 'player',
                'playerId': playerId.toString()
            },
            UpdateExpression: `set fullname = :fullname, myposition = :myposition`,
            ExpressionAttributeValues: {
                ':myposition': myposition,
                ':fullname': fullname
            },
            ReturnValues: 'ALL_NEW'
        };

        return dynamodbRepository.update(params);
    }

    static async deletePlayer(playerId) {
        const params = {
            TableName: 'players',
            Key: {
                'mytype': 'player',
                'playerId': playerId.toString()
            }
        };

        return dynamodbRepository.delete(params);
    }

    static async getPlayersByPosition(myposition, limit = 25) {
        const params = {
            TableName: 'players',
            IndexName: 'myposition-playerId-index',
            KeyConditionExpression: "myposition = :myposition",
            ExpressionAttributeValues: {
                ':myposition': myposition
            },
            ProjectionExpression: 'fullname, myposition',
            ScanIndexForward: false,
            Limit: limit
        };
        const result = await dynamodbRepository.query(params);

        return result.Items;
    }
}

module.exports = PlayersDao;

