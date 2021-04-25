import { FC } from "react";

interface Props {
  value: number;
}

const PlayingCard: FC<Props> = ({ value }) => {
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
      <div className="card-body">{getCardDigit(value)}</div>
    </div>
  );
};

export default PlayingCard;
