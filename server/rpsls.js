const rules = require('./rules');

const rpsls = (p1, p2) => {
  if (p1.userChoice === p2.userChoice) return 'Ничья!';

  const [first, second] = rules[p1.userChoice];
  return (p2.userChoice === first || p2.userChoice === second) ?
    `${p1.playerName} выиграл!`
    : `${p2.playerName} выиграл!`;
};

module.exports = rpsls;
