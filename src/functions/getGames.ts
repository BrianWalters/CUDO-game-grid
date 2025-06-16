import {client} from "../client";
import {z} from "zod";

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
  "images": images[].asset->{ url }
}`

export const gameSchema = z.object({
    _id: z.string(),
    name: z.string(),
    timeLower: z.number(),
    timeUpper: z.number(),
    minimumPlayers: z.number(),
    maximumPlayers: z.number(),
    summary: z.string(),
    teamMembers: z.array(z.object({
        _id: z.string(),
        name: z.string()
    })),
    awards: z.array(z.object({
        _id: z.string(),
        name: z.string(),
    })),
    runnerUpAwards: z.array(z.object({
        _id: z.string(),
        name: z.string()
    })),
    website: z.string().nullable(),
    image: z.array(z.object({
        url: z.string()
    })).optional()
})

export async function getGames(): Promise<z.infer<typeof gameSchema>[]> {
    const games = await client.fetch(query)
    if (!games) throw new Error('Could not fetch games.')

    return games.map(g => gameSchema.parse(g));
}