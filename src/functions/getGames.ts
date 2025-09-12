import {client} from "../client";
import {Game, gameSchema, query} from "./GameSchema";

export async function getGames(): Promise<Game[]> {
    const games = await client.fetch(query)
    if (!games) throw new Error('Could not fetch games.')

    return games.map(g => gameSchema.parse(g));
}