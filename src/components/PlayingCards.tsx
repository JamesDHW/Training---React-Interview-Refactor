import { FC } from "react";
import PlayingCard from "./PlayingCard";

interface PlayingCardsProps {
  cards: number[];
}

const PlayingCards: FC<PlayingCardsProps> = ({ cards }) => {
  return (
    <div>
      <div className="row m-5">
        {cards.map((card, index) => (
          <PlayingCard key={index} value={card} />
        ))}
      </div>
    </div>
  );
};

export default PlayingCards;
