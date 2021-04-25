import { FC } from "react";
import { calculateScore } from "./helpers";

interface Props {
  dealerScore: number;
  playerScore: number;
  hasStuck: boolean;
}

const WinnerBadge: FC<Props> = ({ playerScore, dealerScore, hasStuck }) => {
  const hasDealerWon =
    playerScore > 21 || (playerScore < dealerScore && hasStuck);
  if (hasDealerWon) {
    return (
      <h1>
        <span className="badge bg-warning  m-1">Dealer Wins</span>
      </h1>
    );
  }
  if (hasStuck && playerScore === dealerScore) {
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
