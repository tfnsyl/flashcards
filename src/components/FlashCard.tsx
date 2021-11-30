import CardItem from "../interfaces/CardItem";
import { User } from "../interfaces/UserItem";
import Colors from "../constants/Colors";
import { Button, Card, CardContent, Box, IconButton } from "@material-ui/core";
import { ArrowBack, ArrowForward, Audiotrack } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import WordTypes from "../constants/WordTypes";
import { useState } from "react";
import "./FlashCard.css";

type CardProps = {
  cardsList: CardItem[];
  user: User;
};

const FlashCard = ({ cardsList, user }: CardProps): JSX.Element => {
  const wordType = useLocation().pathname.split("/")[2];

  console.log(wordType, "box will open");

  let idList: string[] = [];

  switch (wordType) {
    case WordTypes.Learning:
      idList = user.cards.learning;
      break;
    case WordTypes.Review:
      idList = user.cards.review;
      break;
    case WordTypes.Mastered:
      idList = user.cards.master;
      break;
  }

  const flashCards = cardsList.filter((card) => idList.includes(card.id));

  const color = Colors.Default;
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const prevButtonClickHandler = () => {
    if (activeCardIndex > 0) setActiveCardIndex(activeCardIndex - 1);
  };

  const nextButtonClickHandler = () => {
    if (activeCardIndex < flashCards.length - 1)
      setActiveCardIndex(activeCardIndex + 1);
  };

  const audioButtonClickHandler = () => {
    window.responsiveVoice.speak(activeCard.name);
  };

  const activeCard = flashCards[activeCardIndex];

  if (!flashCards.length)
    return <div style={{ height: "500px" }}>No {wordType} words yet.</div>;

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

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <IconButton
            color="primary"
            style={{ backgroundColor: "#ddd" }}
            onClick={audioButtonClickHandler}
            className="btnAudio"
          >
            <Audiotrack />
          </IconButton>
        </Box>
      </Card>
    </div>
  );
};

export default FlashCard;
