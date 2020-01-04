const playersModel = require('../models/players.model');
const xid = require('xid-js');

const generateUuid = () => {
    return xid.next();
};

const isValidString = value => {
    return typeof value === "string" && value.trim().length > 0;
};

class PlayersController {
    static async getPlayers(req, res) {
        const callId = generateUuid();
        console.log('Call %s %s id: %s', req.method, req.url, callId);
        try {
            const result = await playersModel.getPlayers();
            console.log('Call id: %s response: %s', callId, JSON.stringify(result));
            console.log(result.length);
            res.status(200).send(result);
        } catch (error) {
            console.log('Call id: %s error: %s', callId, error);
            res.status(500).send({error: 'Internal Server Error.'});
        }
    }

    static async getPlayer(req, res) {
        const playerId = req.params.playerId;
        const callId = generateUuid();
        console.log('Call %s %s id: %s', req.method, req.url, callId);
        try {
            const result = await playersModel.getPlayer(playerId);
            console.log('Call id: %s response: %s', callId, JSON.stringify(result));
            if (Array.isArray(result) && result.length) {
                res.status(200).send(result);
            } else {
                res.status(404).send({error: 'Player Not Found.'});
            }
        } catch (error) {
            console.log('Call id: %s error: %s', callId, error);
            res.status(500).send({error: 'Internal Server Error.'});
        }
    }

    static async insertPlayer(req, res) {
        const {playerId, myposition, fullname} = req.body;
        const callId = generateUuid();
        const mytype = 'player';
        console.log('Call %s %s id: %s body: %s', req.method, req.url, callId, JSON.stringify(req.body));
        if (!isValidString(playerId) || !isValidString(myposition) || !isValidString(fullname)) {
            console.log('Call id: %s error:%s', callId, JSON.stringify('Missing info.'));
            return res.status(400).send({error: 'Player info is incomplete.'});
        }
        try {
            await playersModel.insertPlayer(playerId, mytype, myposition, fullname);
            console.log('Call id: %s response: %s', callId, 'Player created.');
            res.status(201).send({message: 'Player created.'});
        } catch (error) {
            console.log('Call id: %s error: %s', callId, error);
            res.status(500).send({error: 'Internal Server Error.'});
        }
    }

    static async updatePlayer(req, res) {
        const playerId = req.params.playerId;
        const {myposition, fullname} = req.body;
        const callId = generateUuid();
        console.log('Call %s %s id: %s body: %s params: %s', req.method, req.url, callId, JSON.stringify(req.body), JSON.stringify(req.params));
        if (!isValidString(playerId) || !isValidString(myposition) || !isValidString(fullname)) {
            console.log('call id: %s error:%s', callId, JSON.stringify('Missing info.'));
            return res.status(400).send({error: 'Player info is incomplete.'});
        }
        try {
            await playersModel.updatePlayer(playerId, myposition, fullname);
            console.log('call id:%s result:%s ', callId, 'Player updated.');
            res.status(200).send({message: 'Player updated.'});
        } catch (error) {
            console.log('Call id: %s error: %s', callId, error);
            res.status(500).send({error: 'Internal Server Error.'});
        }
    }

    static async deletePlayer(req, res) {
        const playerId = req.params.playerId;
        const callId = generateUuid();
        console.log('Call %s %s id: %s', req.method, req.url, callId);
        try {
            const result = await playersModel.deletePlayer(playerId);
            console.log('Call id: %s response: %s', callId, JSON.stringify(result));
            res.status(204).send(result);
        } catch (error) {
            console.log('Call id: %s error: %s', callId, error);
            res.status(500).send({error: 'Internal Server Error.'});
        }
    }

    static async getDreamTeam(req, res) {
        const callId = generateUuid();
        console.log('Call %s %s id: %s', req.method, req.url, callId);
        try {
            const team = await playersModel.getDreamTeam();
            console.log('Call id: %s response: %s', callId, JSON.stringify(team));
            console.log(team);
            res.status(200).send(team);
        } catch (error) {
            console.log('Call id: %s error: %s', callId, error);
            res.status(500).send({error: 'Internal Server Error.'});
        }
    }
}

module.exports = PlayersController;
