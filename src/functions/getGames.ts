import {client} from "../client";

const query = `*[_type == 'game'] {
  _id,
  name,
  timeLower,
  timeUpper,
  minimumPlayers,
  maximumPlayers,
  summary,
  "teamMembers": teamMembers[]->{
    _id,
    name
  },
  "awards": awards[]->{
    _id,
    name
  },
  "runnerUpAwards": runnerUpAwards[]->{
    _id,
    name
  },
  website,
  "images": images[].asset->
}`

export async function getGames() {
    const games = await client.fetch(query)
    return games;
}