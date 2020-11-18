const express = require("express");
const urllib = require("urllib");
const router = express.Router();

const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};

const dreamTeam = [];

let players = [];
urllib.request("http://data.nba.net/10s/prod/v1/2018/players.json", function (err,response) {
  const data = JSON.parse(response);
  players = data.league.standard.map((p) => {
    return {
      firstName: p.firstName,
      lastName: p.lastName,
      jersey: p.jersey,
      pos: p.pos,
      isActive: p.isActive,
      teamId: p.teamId,
    };
  });
});

router.get("/", function (req, res) {
  res.send("you are doing great");
});

router.get("/teams/:teamName", function (req, res) {
  const teamId = teamToIDs[req.params.teamName];
  const teamPlayers = players.filter(p => p.teamId === teamId && p.isActive)
  res.send(teamPlayers)
});

router.get("/playerStats/:player", function (req, res) {
  const name = req.params.player.split(" ");
  urllib.request(
    `https://nba-players.herokuapp.com/players-stats/${name[1]}/${name[0]}`,
    function (err, response) {
      const data = JSON.parse(response);
      res.send(data);
    }
  );
});

router.put("/team", function (req, res) {
  const team = req.body;
  teamToIDs[team.teamName] = team.teamId;
  res.send("Done");
});

router.get("/dreamTeam", function (req, res) {
  res.send(dreamTeam);
});

router.post("/roster", function (req, res) {
  let message = ""
  if(dreamTeam.length < 5){
    const playerName = req.body
    const player = players.find(p => playerName.firstName === p.firstName && playerName.lastName === p.lastName)
    if(dreamTeam.includes(player)){
      message = "This player is already in the Dream Team"
    }else{
      dreamTeam.push(player)
    }
  }else{
    message = "You already have Five players in the Dream Team"
  }
    res.send(message);
});

router.delete('/dreamTeam/:name', function(req, res){
  const playerName = req.params.name.split(" ")
  const i = dreamTeam.findIndex(p => playerName[0] === p.firstName && playerName[1] === p.lastName)
  dreamTeam.splice(i, 1)
  res.send(dreamTeam)
});

module.exports = router;
