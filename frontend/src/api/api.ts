import axios from "axios";

export async function getTeams() {
  const res = await axios.get("http://localhost:5000/api/teams");
  return res.data;
}

export async function getSpecificTeam(teamId: string) {
  const res = await fetch(`http://localhost:5000/api/teams/${teamId}`);
  return res.json();
}

export async function getPlayers() {
  const res = await axios.get("http://localhost:5000/api/players");
  return res.data;
}

export async function getSpecificPlayer(playerId: string) {
  const res = await axios.get(`http://localhost:5000/api/players/${playerId}`);
  return res.data;
}
