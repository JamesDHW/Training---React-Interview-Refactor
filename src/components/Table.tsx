import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import Player from "./Player";
import PlayingCards from "./PlayingCards";
import WinnerBadge from "./WinnerBadge";
import { calculateScore, createShuffledDeck } from "./helpers";

const BlackJackTable: FC = () => {
  const [deck, setDeck] = useState<number[]>(createShuffledDeck());
  const [playerHand, setPlayerHand] = useState<number[]>([]);
  const [dealerHand, setDealerHand] = useState<number[]>([]);
  const [hasStuck, setHasStuck] = useState<boolean>(false);
  const [runningCount, setCount] = useState<number>(0);

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  const takeCard = (setHand: Dispatch<SetStateAction<number[]>>) => {
    const recievedCard = deck.pop();
    if (!recievedCard) throw new Error("No cards left in deck");

    setDeck((deck) => deck.slice(0, -1));
    setHand((hand) => [...hand, recievedCard]);

    if (recievedCard <= 6) setCount((runningCount) => runningCount + 1);
    if (recievedCard >= 10) setCount((runningCount) => runningCount - 1);
  };

  useEffect(() => {
    if (!hasStuck) return;
    const isDealerBust = dealerScore > 21;
    const isPlayerWinning = dealerScore < playerScore;
    if (!isDealerBust && isPlayerWinning) takeCard(setDealerHand);
    if (isDealerBust) setDealerHand((dealerHand) => dealerHand.slice(0, -1));
  }, [deck, hasStuck]);

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setHasStuck(false);

    takeCard(setDealerHand);
    takeCard(setPlayerHand);
  };

  useEffect(() => {
    takeCard(setPlayerHand);
    takeCard(setDealerHand);
  }, []);

  const cardsLeft = deck.length === 0 ? "Deck Empty" : deck.length;

  return (
    <div className="bg-light m-3">
      <PlayingCards cards={playerHand} />
      <Player
        onHit={() => takeCard(setPlayerHand)}
        onStick={() => setHasStuck(true)}
        cards={playerHand}
        stick={hasStuck}
      />
      <PlayingCards cards={dealerHand} />
      <h1>
        <span className="badge bg-primary  m-1">Dealer: {dealerScore}</span>
      </h1>
      <WinnerBadge
        dealerScore={dealerScore}
        playerScore={playerScore}
        hasStuck={hasStuck}
      />
      <button className="btn btn-large btn-danger" onClick={resetGame}>
        Reset Game
      </button>
      <h2>
        <span className="badge bg-secondary  m-1">Count : {runningCount}</span>
        <span className="badge bg-secondary  m-1">
          Cards Left : {cardsLeft}
        </span>
      </h2>
    </div>
  );
};

export default BlackJackTable;
