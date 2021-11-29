import CardItem from "../interfaces/CardItem";
import { User } from "../interfaces/UserItem";
import Colors from "../constants/Colors";
import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useState } from "react";

type CardProps = {
  questionCards: CardItem[];
  correctCard: CardItem;
  handler: Function;
  user: User;
};

const QuestionCard = ({
  questionCards,
  correctCard,
  handler,
  user,
}: CardProps): JSX.Element => {
  const [clicked, setClicked] = useState("");
  const [canClick, setCanClick] = useState(true);

  const handleClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    card: CardItem
  ) => {
    if (!canClick) {
      console.log("waiting for results, can't click...");
      return;
    }
    setCanClick(false);
    setClicked(card.id);

    await handler(card, correctCard);
    setCanClick(true);
  };

  const isLearning = user.cards.learning.includes(correctCard.id);
  const isReview = user.cards.review.includes(correctCard.id);
  const isMaster = user.cards.master.includes(correctCard.id);

  const color = isLearning
    ? Colors.Learning
    : isReview
    ? Colors.Review
    : isMaster
    ? Colors.Mastered
    : Colors.Default;

  console.log("activeCards", questionCards);

  return (
    <div>
      <Card
        style={{
          backgroundColor: color,
          borderRadius: "10px",
          width: "300px",
          margin: "20px",
        }}
      >
        <CardContent
          style={{
            color: "white",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {correctCard.description}
        </CardContent>
      </Card>
      <div>
        {questionCards.map((card) => {
          return (
            <Card
              key={card.id}
              style={{
                backgroundColor:
                  card.id === "N"
                    ? Colors.Gray
                    : clicked === ""
                    ? Colors.White
                    : card.id === clicked || card.id === correctCard.id
                    ? card.id === correctCard.id
                      ? Colors.Correct
                      : Colors.Alert
                    : Colors.White,
                borderRadius: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={(e) => handleClick(e, card)}
            >
              <CardContent>
                <Typography style={{ fontSize: 18 }}>{card.name}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
