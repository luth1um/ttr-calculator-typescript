import { calculateTTRatingMultipeOpponents, TTGame, TTPlayer, TTRCalculationResult } from '../src/index';

test('The TTR calculator calculates the correct result for a won single adult game', () => {
  const ttPlayer: TTPlayer = { ttRating: 1544 };
  const playedGames: TTGame[] = [{ opponentTTRating: 1488, gameWasWon: true }];

  const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

  expect(result.ratingChange).toEqual(5);
  expect(result.updatedRating).toEqual(1549);
});
