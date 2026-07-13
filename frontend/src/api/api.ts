import axios from "axios";

export async function getTeams() {
  const res = await axios.get("http://localhost:5000/api/teams");
  return res.data;
}
