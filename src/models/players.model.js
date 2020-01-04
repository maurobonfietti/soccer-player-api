const playersDao = require('../daos/players.dao');

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

class PlayersModel {
    static getPlayers() {
        return playersDao.getPlayers();
    }

    static getPlayer(playerId) {
        return playersDao.getPlayer(playerId);
    }

    static async insertPlayer(playerId, mytype, myposition, fullname) {
        const item = {playerId, mytype, myposition, fullname};

        return playersDao.insertPlayer(item);
    }

    static async updatePlayer(playerId, myposition, fullname) {
        return playersDao.updatePlayer(playerId, myposition, fullname);
    }

    static deletePlayer(playerId) {
        return playersDao.deletePlayer(playerId);
    }

    static async getDreamTeam() {
        const goalkeeper = await this.getPlayersByPosition('goalkeeper', 1);
        const defenders = await this.getPlayersByPosition('defender', 4);
        const midfielders = await this.getPlayersByPosition('midfielder', 3);
        const forwards = await this.getPlayersByPosition('forward', 3);

        return [goalkeeper, defenders, midfielders, forwards];
    }

    static async getPlayersByPosition(position, quantity) {
        const p = await playersDao.getPlayersByPosition(position);
        console.log(p.length);
        shuffle(p);
        const players = [];
        for (var i = 0; i < quantity; i++) {
            players.push(p[i]);
        }

        return players;
    }
}

module.exports = PlayersModel;
