import CardItem from "../interfaces/CardItem";
import Colors from "../constants/Colors";
import { Button, Card, CardContent } from "@material-ui/core";
import { useState } from "react";
import "./FlashCard.css";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

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
          width: "440px",
        }}
      >
        <CardContent
          style={{
            color: "white",
            height: "400px",
          }}
        >
          <Button onClick={prevButtonClickHandler} className="btnPrev">
            <ArrowBack />
          </Button>

          <div className="card">
            <div className="content">
              <div className="front">{activeCard.name}</div>
              <div className="back">{activeCard.description}</div>
            </div>
          </div>

          <Button onClick={nextButtonClickHandler} className="btnForward">
            <ArrowForward />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashCard;
