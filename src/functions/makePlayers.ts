import {Game} from "../types/GameSchema";

export function makePlayers(game: Game) {
    if (game.minimumPlayers === game.maximumPlayers) {
        return `${game.minimumPlayers} players`
    }

    return `${game.minimumPlayers} - ${game.maximumPlayers} players`;
}