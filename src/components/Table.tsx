import { FC, useEffect, useState } from "react";
import Player from "./Player";
import PlayingCards from "./PlayingCards";
import { calculateScore, createShuffledDeck } from "./helpers";

const Table: FC = () => {
  const [deck, setDeck] = useState<number[]>(createShuffledDeck());
  const [player, setPlayer] = useState<number[]>(createShuffledDeck());
  const [dealer, setDealer] = useState<number[]>(createShuffledDeck());
  const [stick, setStick] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const takeCard = (playerType: "player" | "dealer") => {
    const recievedCard = deck.pop();
    setDeck(deck.slice(0, -1));
    if (typeof recievedCard != "undefined") {
      if (playerType === "player") {
        player.push(recievedCard);
        setPlayer((player) => [...player, recievedCard]);
      }
      if (playerType === "dealer") {
        setDealer((dealer) => [...dealer, recievedCard]);
      }
      //keeps track of count for card counting
      if (recievedCard <= 6) {
        setCount((count) => count + 1);
      } else if (recievedCard >= 10) {
        setCount((count) => count - 1);
      }
    }

    return;
  };

  const handleStick = () => {
    setStick(true);
    while (
      calculateScore(dealer) < 22 &&
      calculateScore(dealer) < calculateScore(player)
    ) {
      takeCard("dealer");
    }
    if (calculateScore(dealer) > 21) {
      setDealer(dealer.slice(0, -1));
    }
  };

  const resetGame = () => {
    setPlayer([]);
    setDealer([]);
    setStick(false);

    takeCard("dealer");
    takeCard("player");
  };

  useEffect(() => {
    takeCard("player");
    takeCard("dealer");
  }, []);

  const displayWinner = () => {
    if (
      calculateScore(player) > 21 ||
      (calculateScore(player) < calculateScore(dealer) && stick)
    ) {
      return <span className="badge bg-warning  m-1">Dealer Wins</span>;
    } else if (stick && calculateScore(player) === calculateScore(dealer)) {
      return <span className="badge bg-info  m-1">Draw</span>;
    } else if (stick) {
      return <span className="badge bg-success  m-1">Player Wins</span>;
    }
  };

  const cardsLeft = () => {
    if (deck.length === 0) {
      return "Deck Empty";
    }
    return deck.length;
  };

  return (
    <div className="bg-light m-3">
      <PlayingCards cards={player} />
      <Player
        onHit={() => {
          takeCard("player");
        }}
        onStick={handleStick}
        cards={player}
        stick={stick}
      />
      <PlayingCards cards={dealer} />
      <h1>
        <span className="badge bg-primary  m-1">
          Dealer: {calculateScore(dealer)}
        </span>
      </h1>
      <h1>{displayWinner()}</h1>
      <button className="btn btn-large btn-danger" onClick={resetGame}>
        Reset Game
      </button>
      <h2>
        <span className="badge bg-secondary  m-1">Count : {count}</span>
        <span className="badge bg-secondary  m-1">
          Cards Left : {cardsLeft()}
        </span>
      </h2>
    </div>
  );
};

export default Table;
