![Build](https://github.com/luth1um/ttr-calculator-typescript/actions/workflows/build_and_test.yml/badge.svg?branch=main)

# 🏓 TTR Calculator

A calculator for the table tennis rating.

# 🔎 Input

The function `calculateTTRatingMultipeOpponents(ttPlayer: TTPlayer, playedGames: TTGame[])` expects as input information about the player for whom the rating shall be calculated, and information about the game(s) that the player played in one event.

The `TTPlayer` must contain (some of) the following information:

- `ttRating: number`: The rating of the player _before_ having played the games.
- `isYoungerThan21: boolean` (optional): Set to `true` if the player is younger than 21.
- `isYoungerThan16: boolean` (optional): Set to `true` if the player is younger than 16. In this case, `isYoungerThan21` **must also** be set to `true`.
- `lessThan30SingleGames: boolean` (optional): Set to `true` if the player has played less than 30 single games **overall**.
- `lessThan15SingleGamesOverallOrAfterYearBreak` (optional): Set to `true` if the player had a break of **at least** one year and has played less than 15 single games since the break.

`TTGame[]` is an array of games that have been played during an event. For each game, the following information must be provided:

- `opponentTTRating: number`: The rating of the opponent player _before_ having played the game.
- `gameWasWon: boolean`: Set to `true` if the game was won.

# 🧮 Calculation Result

The function `calculateTTRatingMultipeOpponents(ttPlayer: TTPlayer, playedGames: TTGame[])` provides the following information as result of the calculation:

- `updatedRating: number`: The updated rating of the player after the game(s).
- `expectedNumberWins: number`: The number of expected wins for the game(s).
- `winExpectations: number[]`: The winning expectation for each single TT game. The order of winning expectation is the same as the order of input TT games.
- `ratingChange: number`: The change to the TTR value of the player.

# 🔗 Links

- TTR calculator on [GitHub](https://github.com/luth1um/ttr-calculator-typescript)
- TTR calculator package on [npm](https://www.npmjs.com/package/ttr-calculator-typescript)
