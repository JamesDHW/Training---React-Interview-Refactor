import React from "react";
import Player from "./Player";
import PlayingCards from "./PlayingCards";
import { calculateScore } from "./helpers";

export interface TableProps {}

export interface TableState {
  deck: Number[];
  player: Number[];
  dealer: Number[];
  stick: boolean;
  count: number;
}

const createShuffledDeck = () => {
  const nums = Array.from({ length: 52 }, (_, index) => index + 1);
  const deck = nums.map((num) => (num % 13) + 2);
  const shuffledDeck = deck.sort(() => Math.random() - 0.5);
  return shuffledDeck;
};

class Table extends React.Component<TableProps, TableState> {
  state = {
    deck: createShuffledDeck(),
    player: new Array<number>(),
    dealer: new Array<number>(),
    stick: false,
    count: 0,
  };

  takeCard = (playerType: "player" | "dealer") => {
    const deck = this.state.deck;
    const recievedCard = deck.pop();
    this.setState({ deck });
    if (typeof recievedCard != "undefined") {
      if (playerType === "player") {
        const player = this.state.player;
        player.push(recievedCard);
        this.setState({ player });
      }
      if (playerType === "dealer") {
        const dealer = this.state.dealer;
        dealer.push(recievedCard);
        this.setState({ dealer });
      }
      //keeps track of count for card counting
      if (recievedCard <= 6) {
        this.setState((state) => ({ count: state.count + 1 }));
      } else if (recievedCard >= 10) {
        this.setState((state) => ({ count: state.count - 1 }));
      }
    }

    return;
  };

  handleStick = () => {
    this.setState({ stick: true });
    while (
      calculateScore(this.state.dealer) < 22 &&
      calculateScore(this.state.dealer) < calculateScore(this.state.player)
    ) {
      this.takeCard("dealer");
    }
    const dealer = this.state.dealer;
    if (calculateScore(this.state.dealer) > 21) {
      this.setState({ dealer: dealer.slice(0, -1) });
    }
  };

  resetGame = () => {
    this.setState(
      {
        player: [],
        dealer: [],
        stick: false,
      },
      () => {
        this.takeCard("dealer");
        this.takeCard("player");
      }
    );
  };

  componentDidMount() {
    this.takeCard("player");
    this.takeCard("dealer");
  }

  displayWinner() {
    if (
      calculateScore(this.state.player) > 21 ||
      (calculateScore(this.state.player) < calculateScore(this.state.dealer) &&
        this.state.stick)
    ) {
      return <span className="badge bg-warning  m-1">Dealer Wins</span>;
    } else if (
      this.state.stick &&
      calculateScore(this.state.player) === calculateScore(this.state.dealer)
    ) {
      return <span className="badge bg-info  m-1">Draw</span>;
    } else if (this.state.stick) {
      return <span className="badge bg-success  m-1">Player Wins</span>;
    }
  }

  cardsLeft() {
    if (this.state.deck.length === 0) {
      return "Deck Empty";
    }
    return this.state.deck.length;
  }

  render() {
    return (
      <div className="bg-light m-3">
        <Player
          onHit={() => {
            this.takeCard("player");
          }}
          onStick={this.handleStick}
          cards={this.state.player}
          stick={this.state.stick}
        />
        <PlayingCards cards={this.state.dealer} />
        <h1>
          <span className="badge bg-primary  m-1">
            Dealer: {calculateScore(this.state.dealer)}
          </span>
        </h1>
        <h1>{this.displayWinner()}</h1>
        <button className="btn btn-large btn-danger" onClick={this.resetGame}>
          Reset Game
        </button>
        <h2>
          <span className="badge bg-secondary  m-1">
            Count : {this.state.count}
          </span>
          <span className="badge bg-secondary  m-1">
            Cards Left : {this.cardsLeft()}
          </span>
        </h2>
      </div>
    );
  }
}

export default Table;
