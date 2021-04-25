import { FC } from "react";
import PlayingCard from "./PlayingCard";

interface PlayingCardsProps {
  cards: number[];
}

const PlayingCards: FC<PlayingCardsProps> = (props) => {
  return (
    <div>
      <div className="row m-5">
        {props.cards.map((card, index) => (
          <PlayingCard key={index} value={card} />
        ))}
      </div>
    </div>
  );
};

export default PlayingCards;
