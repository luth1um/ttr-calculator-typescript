export interface TTPlayer {
  /**
   * TTR value before the game
   */
  ttRating: number;
  /**
   * set to true if the player is younger than 21
   */
  isYoungerThan21?: boolean;
  /**
   * set to true if the player is younger than 16
   */
  isYoungerThan16?: boolean;
  /**
   * set to true if the player is younger than 18 and the average age of all opponents is younger than 18
   */
  isYoungerThan18AndOpponentAverageYoungerThan18?: boolean;
  /**
   * set to true if the player has played less than 30 single games so far
   */
  lessThan30SingleGames?: boolean;
  /**
   * set to true if the player had a break for at least 1 year and less than 15 single games afterwards
   */
  lessThan15SingleGamesAfterYearBreak?: boolean;
}

export interface TTGame {
  /**
   * rating of the opponent before the game was played
   */
  opponentTTRating: number;
  /**
   * set to true if the game was won
   */
  gameWasWon: boolean;
}

export interface TTRCalculationResult {
  /**
   * the updated rating after the game(s)
   */
  updatedRating: number;
  /**
   * the number of expected wins for the game(s)
   */
  expectedNumberWins: number;
  /**
   * the resulting change to the TTR value
   */
  ratingChange: number;
}

/**
 * Calculates the updated TTR value after having played a single game.
 * @param ttPlayer the player for whom the updated TTR rating will be calculated
 * @param playedGame the stats of the played game needed to calculate the updated TTR value
 * @returns the updated TTR value
 */
export function calculateTTRating(ttPlayer: TTPlayer, playedGame: TTGame): TTRCalculationResult {
  const changeMuliplier: number = calculateChangeMultiplier(
    ttPlayer.isYoungerThan21 ?? false,
    ttPlayer.isYoungerThan16 ?? false,
    ttPlayer.lessThan30SingleGames ?? false,
    ttPlayer.lessThan15SingleGamesAfterYearBreak ?? false
  );
  const expectedNumberWins = calulateWinningProbability(ttPlayer.ttRating, playedGame.opponentTTRating);
  const numberOfGamesWon = playedGame.gameWasWon ? 1 : 0;
  const ratingChange = calculateRatingChange(
    numberOfGamesWon,
    expectedNumberWins,
    changeMuliplier,
    ttPlayer.isYoungerThan18AndOpponentAverageYoungerThan18 ?? false
  );

  return {
    updatedRating: ttPlayer.ttRating + ratingChange,
    expectedNumberWins: expectedNumberWins,
    ratingChange: ratingChange,
  };
}

/**
 * Calculates the updated TTR value after having played multiple singles.
 * @param ttPlayer the player for whom the updated TTR rating will be calculated
 * @param playedGames the stats of the played games needed to calculate the updated TTR value
 * @returns the updated TTR value
 */
export function calculateTTRatingMultipeOpponents(ttPlayer: TTPlayer, playedGames: TTGame[]): TTRCalculationResult {
  const changeMuliplier: number = calculateChangeMultiplier(
    ttPlayer.isYoungerThan21 ?? false,
    ttPlayer.isYoungerThan16 ?? false,
    ttPlayer.lessThan30SingleGames ?? false,
    ttPlayer.lessThan15SingleGamesAfterYearBreak ?? false
  );

  let expectedNumberWins = 0;
  for (const playedGame of playedGames) {
    expectedNumberWins += calulateWinningProbability(ttPlayer.ttRating, playedGame.opponentTTRating);
  }

  const numberOfGamesWon = playedGames.filter((playedGame) => playedGame.gameWasWon).length;

  const ratingChange = calculateRatingChange(
    numberOfGamesWon,
    expectedNumberWins,
    changeMuliplier,
    ttPlayer.isYoungerThan18AndOpponentAverageYoungerThan18 ?? false
  );

  return {
    updatedRating: ttPlayer.ttRating + ratingChange,
    expectedNumberWins: expectedNumberWins,
    ratingChange: ratingChange,
  };
}

function calculateChangeMultiplier(
  isYoungerThan21: boolean,
  isYoungerThan16: boolean,
  lessThan30SingleGames: boolean,
  lessThan15SingleGamesAfterYearBreak: boolean
): number {
  let changeMuliplier = 16;
  if (isYoungerThan21) {
    changeMuliplier += 4;
  }
  if (isYoungerThan16) {
    changeMuliplier += 4;
  }
  if (lessThan30SingleGames) {
    changeMuliplier += 4;
  }
  if (lessThan15SingleGamesAfterYearBreak) {
    changeMuliplier += 4;
  }
  return changeMuliplier;
}

function calulateWinningProbability(playerTTR: number, opponentTTR: number): number {
  return 1 / (1 + Math.pow(10, (opponentTTR - playerTTR) / 150.0));
}

function calculateRatingChange(
  numberOfGamesWon: number,
  expectedNumberOfWins: number,
  changeMuliplier: number,
  isYoungerThan18AndOpponentAverageYoungerThan18: boolean
): number {
  let ratingChange: number = (numberOfGamesWon - expectedNumberOfWins) * changeMuliplier;
  if (isYoungerThan18AndOpponentAverageYoungerThan18) {
    ratingChange += 2;
  }
  return Math.round(ratingChange);
}
