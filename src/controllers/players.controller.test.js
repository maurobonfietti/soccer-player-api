const playersController = require('./players.controller');
const playersModel = require('../models/players.model');
jest.mock('../models/players.model');
const sendMock = jest.fn();
const statusMock = jest.fn();
const res = {status: statusMock, send: sendMock};
statusMock.mockImplementation(() => res);

describe('Unit Tests For Players Controller', () => {
    describe('getPlayers', () => {
        it('should return 200', async () => {
            const req = {};
            const mockPlayersResult = [];
            playersModel.getPlayers.mockImplementationOnce(() => mockPlayersResult);
            await playersController.getPlayers(req, res);
            expect(statusMock).toBeCalledWith(200);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockPlayersResult))
        });
    });

    describe('getPlayer', () => {
        it('should return 200', async () => {
            const req = { params:
                {
                    "playerId": "1000"
                }
            };
            const mockPlayersResult = [];
            playersModel.getPlayer.mockImplementationOnce(() => mockPlayersResult);
            await playersController.getPlayer(req, res);
            expect(statusMock).toBeCalledWith(200);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockPlayersResult))
        });
    });

    describe('insertPlayer', () => {
        it('with player data should return 201', async () => {
            const req = { body:
                {
                    "playerId": "1000",
                    "myposition": "goalkeeper",
                    "fullname": "My New Player"
                }
            };
            const mockPlayersResult = [];
            playersModel.insertPlayer.mockImplementationOnce(() => mockPlayersResult);
            await playersController.insertPlayer(req, res);
            expect(statusMock).toBeCalledWith(201);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockPlayersResult))
        });

        it('without player data should return 400', async () => {
            const req = { body: {} };
            const mockPlayersResult = [];
            playersModel.insertPlayer.mockImplementationOnce(() => mockPlayersResult);
            await playersController.insertPlayer(req, res);
            expect(statusMock).toBeCalledWith(400);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockPlayersResult))
        });
    });

    describe('updatePlayer', () => {
        it('with player data should return 200', async () => {
            const req = {
                params:
                {
                    "playerId": "1000"
                },
                body:
                {
                    "myposition": "goalkeeper",
                    "fullname": "My New Player"
                }
            };
            const mockPlayersResult = [];
            playersModel.updatePlayer.mockImplementationOnce(() => mockPlayersResult);
            await playersController.updatePlayer(req, res);
            expect(statusMock).toBeCalledWith(200);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockPlayersResult))
        });

        it('without player data should return 400', async () => {
            const req = {
                params:
                {
                    "playerId": "1000"
                },
                body:
                {}
            };
            const mockPlayersResult = [];
            playersModel.updatePlayer.mockImplementationOnce(() => mockPlayersResult);
            await playersController.updatePlayer(req, res);
            expect(statusMock).toBeCalledWith(400);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockPlayersResult))
        });
    });

    describe('deletePlayer', () => {
        it('should return 204', async () => {
            const req = {
                params:
                {
                    "playerId": "1000"
                }
            };
            const mockPlayersResult = [];
            playersModel.deletePlayer.mockImplementationOnce(() => mockPlayersResult);
            await playersController.deletePlayer(req, res);
            expect(statusMock).toBeCalledWith(204);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockPlayersResult))
        });
    });

    describe('getDreamTeam', () => {
        it('should return 200', async () => {
            const req = {};
            const mockPlayersResult = [];
            playersModel.getDreamTeam.mockImplementationOnce(() => mockPlayersResult);
            await playersController.getDreamTeam(req, res);
            expect(statusMock).toBeCalledWith(200);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockPlayersResult))
        });
    });
});
