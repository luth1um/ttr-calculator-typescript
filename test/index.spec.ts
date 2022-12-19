import { calculateTTRatingMultipeOpponents, TTGame, TTPlayer, TTRCalculationResult } from '../src/index';

test('The TTR calculator calculates the correct result for a won single adult game', () => {
  const ttPlayer: TTPlayer = { ttRating: 1544 };
  const playedGames: TTGame[] = [{ opponentTTRating: 1488, gameWasWon: true }];

  const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

  expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(0.703);
  expect(result.ratingChange).toEqual(5);
  expect(result.updatedRating).toEqual(1549);
});

/**
 * Rounds a **positive** number to three decimal places.
 *
 * **This method is only meant for testing purposes and might not work for all edge cases.**
 * @param n the number to round
 * @returns the input rounded to three decimal places
 */
function roundTo3DecimalPlaces(n: number) {
  return Math.round(n * 1000) / 1000;
}
