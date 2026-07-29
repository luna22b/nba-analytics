import axios from "axios";
import { API_URL } from "./config";

export async function getTeams() {
  const res = await axios.get(`${API_URL}/api/teams`);
  return res.data;
}

export async function getSpecificTeam(teamId: string) {
  const res = await fetch(`${API_URL}/api/teams/${teamId}`);
  return res.json();
}

export async function getPlayers() {
  const res = await axios.get(`${API_URL}/api/players`);
  return res.data;
}

export async function getSpecificPlayer(playerId: string) {
  const res = await axios.get(`${API_URL}/api/players/${playerId}`);
  return res.data;
}

export async function getGames() {
  const res = await axios.get(`${API_URL}/api/games`);
  return res.data;
}
