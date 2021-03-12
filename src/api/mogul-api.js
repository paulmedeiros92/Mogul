import axios from "axios";

class MogulApi {
  constructor(
    loginToken = "17495464-efad-43f0-b3b8-cd83f24bacec",
    apiKey = "C434EDE3-2E7E-4B9D-A070-58B2CF94846D"
  ) {
    this.config = {
      headers: {
        "arena-api-key": apiKey,
        "arena-login-token": loginToken
      }
    };
  }

  getAllGames() {
    return axios.get(
      "https://client.mogul.gg/API/Player/My/Games",
      this.config
    );
  }

  getGameByShortCode(gameShortCode) {
    return axios.get(
      `https://client.mogul.gg/API/Game/${gameShortCode}`,
      this.config
    );
  }

  getTopPlayersFromGame(gameShortCode) {
    return axios.get(
      `https://client.mogul.gg/API/Game/${gameShortCode}/Leaderboard/Skill`,
      this.config
    );
  }

  getPlayerByEntityName(entityName) {
    return axios.get(
      `https://client.mogul.gg/API/Player/${entityName}`,
      this.config
    );
  }

  createTeamChallenge(teamName) {
    return axios.post(
      "https://client.mogul.gg/API/Team",
      { DisplayName: teamName, JoinPassword: "challenge" },
      this.config
    );
  }

  inviteToTeam(teamEntityName, entityName) {
    return axios.post(
      `https://client.mogul.gg/API/Team/${teamEntityName}/Roster/Invite`,
      { EntityName: entityName },
      this.config
    );
  }
}

export default MogulApi;
