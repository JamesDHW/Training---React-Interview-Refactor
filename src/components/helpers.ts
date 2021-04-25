export const calculateScore = (cards: number[]) => {
  var aces = 0;
  var score = 0;
  var card: number;
  for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    if (card === 14) {
      aces += 1;
    } else if (card < 11) {
      score += card;
    } else {
      score += 10;
    }
  }
  if (aces === 1) {
    if (score < 10) {
      score += 11;
    } else score += 1;
  } else if (aces !== 0) {
    score += 11 + aces - 1;
  }
  return score;
};
