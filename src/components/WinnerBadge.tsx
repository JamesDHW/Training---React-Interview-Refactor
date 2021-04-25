import { FC } from "react";
import { calculateScore } from "./helpers";

interface Props {
  playerHand: number[];
  dealerHand: number[];
  hasStuck: boolean;
}

const WinnerBadge: FC<Props> = ({ playerHand, dealerHand, hasStuck }) => {
  if (
    calculateScore(playerHand) > 21 ||
    (calculateScore(playerHand) < calculateScore(dealerHand) && hasStuck)
  ) {
    return (
      <h1>
        <span className="badge bg-warning  m-1">Dealer Wins</span>
      </h1>
    );
  }
  if (hasStuck && calculateScore(playerHand) === calculateScore(dealerHand)) {
    return (
      <h1>
        <span className="badge bg-info  m-1">Draw</span>
      </h1>
    );
  }
  if (hasStuck) {
    return (
      <h1>
        <span className="badge bg-success  m-1">Player Wins</span>
      </h1>
    );
  }
  return <></>;
};

export default WinnerBadge;
