import { TTGame, TTPlayer, TTRCalculationResult, calculateTTRatingMultipeOpponents } from '../src';
import { expect, test } from 'vitest';

test('The TTR calculator calculates the correct result for a won single adult game', () => {
  const ttPlayer: TTPlayer = { ttRating: 1544 };
  const playedGames: TTGame[] = [{ opponentTTRating: 1488, gameWasWon: true }];

  const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

  expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(0.703);
  expect(result.ratingChange).toEqual(5);
  expect(result.updatedRating).toEqual(1549);
});

test('The TTR calculator calculates the correct result for two out of two won single adult games', () => {
  const ttPlayer: TTPlayer = { ttRating: 1392 };
  const playedGames: TTGame[] = [
    { opponentTTRating: 1422, gameWasWon: true },
    { opponentTTRating: 1388, gameWasWon: true },
  ];

  const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

  expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(0.902);
  expect(result.ratingChange).toEqual(18);
  expect(result.updatedRating).toEqual(1410);
});

test('The TTR calculator calculates the correct result for one out of two won single adult games', () => {
  const ttPlayer: TTPlayer = { ttRating: 1407 };
  const playedGames: TTGame[] = [
    { opponentTTRating: 1412, gameWasWon: true },
    { opponentTTRating: 1387, gameWasWon: false },
  ];

  const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

  expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(1.057);
  expect(result.ratingChange).toEqual(-1);
  expect(result.updatedRating).toEqual(1406);
});

test('The TTR calculator calculates the correct result for zero out of two won single adult games', () => {
  const ttPlayer: TTPlayer = { ttRating: 1406 };
  const playedGames: TTGame[] = [
    { opponentTTRating: 1468, gameWasWon: false },
    { opponentTTRating: 1481, gameWasWon: false },
  ];

  const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

  expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(0.519);
  expect(result.ratingChange).toEqual(-8);
  expect(result.updatedRating).toEqual(1398);
});

test('The TTR calculator calculates the correct result for a player being younger than 21 (two out of two games won)', () => {
  const ttPlayer: TTPlayer = { ttRating: 1489, isYoungerThan21: true };
  const playedGames: TTGame[] = [
    { opponentTTRating: 1477, gameWasWon: true },
    { opponentTTRating: 1522, gameWasWon: true },
  ];

  const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

  expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(0.922);
  expect(result.ratingChange).toEqual(22);
  expect(result.updatedRating).toEqual(1511);
});

test(
  'The TTR calculator calculates the correct result for a player having less than 15 games after a break of at least one year ' +
    '(one out of two games won)',
  () => {
    const ttPlayer: TTPlayer = { ttRating: 1407, lessThan15SingleGamesOverallOrAfterYearBreak: true };
    const playedGames: TTGame[] = [
      { opponentTTRating: 1469, gameWasWon: true },
      { opponentTTRating: 1411, gameWasWon: false },
    ];

    const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

    expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(0.763);
    expect(result.ratingChange).toEqual(5);
    expect(result.updatedRating).toEqual(1412);
  }
);

test(
  'The TTR calculator calculates the correct result for a player being younger than 16 and having less than 30 single games ' +
    '(two out of two games won)',
  () => {
    const ttPlayer: TTPlayer = {
      ttRating: 765,
      isYoungerThan21: true,
      isYoungerThan16: true,
      lessThan30SingleGames: true,
      lessThan15SingleGamesOverallOrAfterYearBreak: true,
    };
    const playedGames: TTGame[] = [
      { opponentTTRating: 715, gameWasWon: true },
      { opponentTTRating: 765, gameWasWon: true },
    ];

    const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

    expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(1.183);
    expect(result.ratingChange).toEqual(26);
    expect(result.updatedRating).toEqual(791);
  }
);

test(
  'The TTR calculator calculates the correct result for a player being younger than 16 and having less than 30 single games ' +
    '(four out of six games won)',
  () => {
    const ttPlayer: TTPlayer = {
      ttRating: 775,
      isYoungerThan21: true,
      isYoungerThan16: true,
      lessThan30SingleGames: true,
    };
    const playedGames: TTGame[] = [
      { opponentTTRating: 615, gameWasWon: true },
      { opponentTTRating: 851, gameWasWon: true },
      { opponentTTRating: 791, gameWasWon: true },
      { opponentTTRating: 999, gameWasWon: false },
      { opponentTTRating: 757, gameWasWon: true },
      { opponentTTRating: 838, gameWasWon: false },
    ];

    const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

    expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(2.473);
    expect(result.ratingChange).toEqual(43);
    expect(result.updatedRating).toEqual(818);
  }
);

test(
  'The TTR calculator calculates the correct result for a player being younger than 16 and having more than 30 single games ' +
    '(two out of two games won)',
  () => {
    const ttPlayer: TTPlayer = {
      ttRating: 900,
      isYoungerThan21: true,
      isYoungerThan16: true,
    };
    const playedGames: TTGame[] = [
      { opponentTTRating: 837, gameWasWon: true },
      { opponentTTRating: 925, gameWasWon: true },
    ];

    const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);

    expect(roundTo3DecimalPlaces(result.expectedNumberWins)).toEqual(1.13);
    expect(result.ratingChange).toEqual(21);
    expect(result.updatedRating).toEqual(921);
  }
);

test('The expected number of wins is equal to the sum of the winning expectations', () => {
  const ttPlayer: TTPlayer = {
    ttRating: 1392,
  };
  const playedGames: TTGame[] = [
    { opponentTTRating: 1422, gameWasWon: true },
    { opponentTTRating: 1388, gameWasWon: true },
  ];

  const result: TTRCalculationResult = calculateTTRatingMultipeOpponents(ttPlayer, playedGames);
  const winExpectations: number[] = result.winExpectations;
  const expectedNumberWins: number = result.expectedNumberWins;

  expect(roundTo3DecimalPlaces(expectedNumberWins)).toEqual(0.902);
  expect(winExpectations.length).toEqual(2);
  expect(expectedNumberWins).toEqual(winExpectations[0] + winExpectations[1]);
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
