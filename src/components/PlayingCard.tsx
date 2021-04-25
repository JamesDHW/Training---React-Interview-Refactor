import { FC } from "react";

interface PlayingCardProps {
  value: number;
}

const PlayingCard: FC<PlayingCardProps> = (props) => {
  const getCardDigit = (value: number): string => {
    const faceCards = {
      11: "J",
      12: "Q",
      13: "K",
      14: "A",
    };

    return value < 11
      ? value.toString()
      : faceCards[value as keyof typeof faceCards];
  };
  return (
    <div className="card m-1">
      <div className="card-body">{getCardDigit(props.value)}</div>
    </div>
  );
};

export default PlayingCard;
