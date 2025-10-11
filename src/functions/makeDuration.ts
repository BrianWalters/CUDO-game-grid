import {Game} from "../types/GameSchema";

export function makeDuration(game: Game) {
    if (game.timeLower === game.timeUpper) {
        return `${game.timeLower} minutes`;
    }

    return `${game.timeLower} - ${game.timeUpper} minutes`;
}