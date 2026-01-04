export interface TTPlayer {
  /**
   * TTR value before the game.
   */
  ttRating: number;
  /**
   * Set to *true* if the player is younger than 21.
   * **This option must explicitly be set to *true* if *isYoungerThan16* is set to true!**
   */
  isYoungerThan21?: boolean;
  /**
   * Set to *true* if the player is younger than 16.
   */
  isYoungerThan16?: boolean;
  /**
   * Set to *true* if the player has played less than 30 single games so far.
   */
  lessThan30SingleGames?: boolean;
  /**
   * Set to *true* if the player has less than 15 games overall or less than 15 games after a break for a least one year.
   */
  lessThan15SingleGamesOverallOrAfterYearBreak?: boolean;
}

export interface TTGame {
  /**
   * Rating of the opponent before the game was played.
   */
  opponentTTRating: number;
  /**
   * Set to *true* if the game was won.
   */
  gameWasWon: boolean;
}

export interface TTRCalculationResult {
  /**
   * The updated rating after the game(s).
   */
  updatedRating: number;
  /**
   * The number of expected wins for the game(s).
   */
  expectedNumberWins: number;
  /**
   * The winning expectation for each single TT game. The order of winning expectation is the same as the order of input TT games.
   */
  winExpectations: number[];
  /**
   * The resulting change to the TTR value.
   */
  ratingChange: number;
}

/**
 * Calculates the updated TTR value after having played multiple singles.
 * @param ttPlayer the player for whom the updated TTR rating will be calculated
 * @param playedGames the stats of the played games needed to calculate the updated TTR value
 * @returns the updated TTR value
 */
export function calculateTTRatingMultipeOpponents(ttPlayer: TTPlayer, playedGames: TTGame[]): TTRCalculationResult {
  const changeMuliplier: number = calculateChangeMultiplier(
    !!ttPlayer.isYoungerThan21,
    !!ttPlayer.isYoungerThan16,
    !!ttPlayer.lessThan30SingleGames,
    !!ttPlayer.lessThan15SingleGamesOverallOrAfterYearBreak
  );

  const winExpectations = playedGames.map((playedGame) =>
    calulateWinningProbability(ttPlayer.ttRating, playedGame.opponentTTRating)
  );
  const expectedNumberWins = winExpectations.reduce((expectedSum, expectedCurrent) => expectedSum + expectedCurrent, 0);

  const numberOfGamesWon = playedGames.filter((playedGame) => playedGame.gameWasWon).length;
  const ratingChange = calculateRatingChange(numberOfGamesWon, expectedNumberWins, changeMuliplier);

  return {
    updatedRating: ttPlayer.ttRating + ratingChange,
    expectedNumberWins: expectedNumberWins,
    winExpectations: winExpectations,
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
  return 1 / (1 + 10 ** ((opponentTTR - playerTTR) / 150));
}

function calculateRatingChange(
  numberOfGamesWon: number,
  expectedNumberOfWins: number,
  changeMuliplier: number
): number {
  const ratingChange: number = (numberOfGamesWon - expectedNumberOfWins) * changeMuliplier;
  return Math.round(ratingChange);
}
