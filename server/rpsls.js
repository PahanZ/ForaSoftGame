const rules = require('./rules');

const rpsls = (p1, p2) => {
  if (p1.move === p2.move) return 'Ничья!';

  const [first, second] = rules[p1.move];
  return (p2.move === first || p2.move === second) ?
    `${p1.playerName} выиграл!`
    : `${p2.playerName} выиграл!`;
};

module.exports = rpsls;
