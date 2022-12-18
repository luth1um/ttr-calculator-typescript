export interface TTPlayer {
  ttRating: number;
  isYoungerThan21?: boolean;
  isYoungerThan16?: boolean;
  lessThan30SingleGames?: boolean;
  lessThan15SingleGamesAfterYearBreak?: boolean;
}

export interface TTGame {
  opponentTTRating: number;
  gameWasWon: boolean;
}

export interface ttrCalculationResult {
  updatedRating: number;
  expectedWinPercentage: number;
  ratingChange: number;
}

/**
 * Calculates the updated TTR value after having played a single game.
 * @param ttPlayer the player for whom the updated TTR rating will be calculated
 * @param playedGame the stats of the played game needed to calculate the updated TTR value
 * @returns the updated TTR value
 */
export function calculateTTRating(ttPlayer: TTPlayer, playedGame: TTGame): ttrCalculationResult {
  // TODO: implement
  return { updatedRating: 1500, expectedWinPercentage: 1.0, ratingChange: 8 };
}

/**
 * Calculates the updated TTR value after having played multiple singles.
 * @param ttPlayer the player for whom the updated TTR rating will be calculated
 * @param playedGames the stats of the played games needed to calculate the updated TTR value
 * @returns the updated TTR value
 */
export function calculateTTRatingMultipeOpponents(ttPlayer: TTPlayer, playedGames: TTGame[]): ttrCalculationResult {
  // TODO: implement
  return { updatedRating: 1500, expectedWinPercentage: 1.0, ratingChange: 8 };
}
