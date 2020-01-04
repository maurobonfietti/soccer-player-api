const express = require('express');
const router = express.Router();
const version = 'v1';
const playersController = require('./controllers/players.controller');

router.get(`/${version}/players`, playersController.getPlayers);
router.get(`/${version}/players/dream-team`, playersController.getDreamTeam);
router.get(`/${version}/players/:playerId`, playersController.getPlayer);
router.post(`/${version}/players`, playersController.insertPlayer);
router.patch(`/${version}/players/:playerId`, playersController.updatePlayer);
router.delete(`/${version}/players/:playerId`, playersController.deletePlayer);

module.exports = router;
