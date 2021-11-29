import CardItem from "../interfaces/CardItem";
import Colors from "../constants/Colors";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React, { useState } from "react";

type CardProps = {
  flashCards: CardItem[];
};

const FlashCard = ({ flashCards }: CardProps): JSX.Element => {
  const color = Colors.Default;
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const prevButtonClickHandler = () => {
    if (activeCardIndex > 0) setActiveCardIndex(activeCardIndex - 1);
  };

  const nextButtonClickHandler = () => {
    if (activeCardIndex < flashCards.length - 1)
      setActiveCardIndex(activeCardIndex + 1);
  };

  const activeCard = flashCards[activeCardIndex];

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
          {activeCard.name} =&gt; {activeCard.description}
        </CardContent>
        <CardActions>
          <Button onClick={prevButtonClickHandler}> PREV </Button>
          <Button onClick={nextButtonClickHandler}> NEXT </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default FlashCard;
