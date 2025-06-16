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
  "images": images[].asset->{
    _id,
    url
  },
  "season": season->{
    _id,
    name
  }
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
    images: z.array(z.object({
        _id: z.string(),
        url: z.string()
    })),
    season: z.object({
        _id: z.string(),
        name: z.string()
    })
})

export async function getGames(): Promise<z.infer<typeof gameSchema>[]> {
    const games = await client.fetch(query)
    if (!games) throw new Error('Could not fetch games.')

    return games.map(g => gameSchema.parse(g));
}