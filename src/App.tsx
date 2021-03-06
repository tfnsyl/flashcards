import React from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import FlashCard from "./components/FlashCard";
import UserStats from "./components/UserStats";
import { UserCards, User, Stats } from "./interfaces/UserItem";
import CardItem from "./interfaces/CardItem";
import ArrayHelper from "./utilities/ArrayHelper";
import TimerHelper from "./utilities/TimerHelper";
import { Button } from "@material-ui/core";
import CardsList from "./data/db.json";
import { Routes, Route, Link } from "react-router-dom";
import { CloseRounded } from "@material-ui/icons";

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

window.responsiveVoice = window.responsiveVoice || {};

interface AppState {
  cardsList: CardItem[];
  questionCards: CardItem[];
  flashCards: CardItem[];
  correctCard: CardItem;
  user: User;
  loading: boolean;
}
class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.onAnswer = this.onAnswer.bind(this);

    this.state = {
      cardsList: [],
      questionCards: [],
      correctCard: { id: "", name: "", description: "" },
      flashCards: [],
      user: {
        stats: { review: 0, learning: 0, master: 0 },
        cards: { review: [], learning: [], master: [] },
      },

      loading: true,
    };
  }

  async getUser() {
    const dataFromStorage = localStorage.getItem("cards");

    const cards: UserCards = dataFromStorage
      ? JSON.parse(dataFromStorage)
      : { review: [], learning: [], master: [] };

    const stats: Stats = {
      review: cards.review.length,
      master: cards.master.length,
      learning: cards.learning.length,
    };

    const user: User = {
      cards: cards,
      stats: stats,
    };

    return user;
  }

  async componentDidMount() {
    const cardsList: CardItem[] = CardsList.cards;
    console.warn("cardsList", cardsList);
    this.setState({ cardsList });

    const user = await this.getUser();
    this.setState({ user, loading: false });

    this.createShuffledAnswers();
  }

  getRandomCard(cards: CardItem[], excludedCards: CardItem[] = []) {
    const availableCards = cards.filter(
      (card) => excludedCards.includes(card) === false
    );

    return ArrayHelper.getRandomElement(availableCards);
  }

  createShuffledAnswers() {
    const questionCards: CardItem[] = [];

    for (let i = 0; i < 4; i++) {
      const card = this.getRandomCard(this.state.cardsList, questionCards);
      questionCards.push(card);
    }

    const correctCard = this.getRandomCard(questionCards);
    questionCards.push({ id: "N", name: "I DONT KNOW", description: "" });

    this.setState({ questionCards, correctCard });
  }

  async onAnswer(card: CardItem, correctCard: CardItem) {
    const cards = this.state.user.cards;

    if (card.id === "N") {
      if (!cards.learning.includes(correctCard.id)) {
        cards.learning.push(correctCard.id);
      }
    } else {
      const isCorrect = card.id === correctCard.id;

      const isLearning = cards.learning.includes(card.id);
      const isReview = cards.review.includes(card.id);
      const isMaster = cards.master.includes(card.id);

      let newType = "";
      if (isCorrect) {
        console.log("answer is true");

        if (isReview) {
          //remove from review, add to master
          cards.review = cards.review.filter((c) => c !== card.id);
          cards.master.push(card.id);
          newType = "master";
        } else if (!isMaster) {
          //remove from learning, add to review
          cards.learning = cards.learning.filter((c) => c !== card.id);
          cards.review.push(card.id);
          newType = "review";
        }
      } else {
        if (isMaster) {
          //remove from master, add to review
          cards.master = cards.master.filter((c) => c !== card.id);
          cards.review.push(card.id);
          newType = "review";
        } else {
          //remove from review, add to learning
          cards.review = cards.review.filter((c) => c !== card.id);
          cards.learning.push(card.id);
          newType = "learning";
        }
      }

      console.log("newType", newType);
      console.log("isCorrect", isCorrect);
      console.log("isLearning", isLearning);
      console.log("isReview", isReview);
      console.log("isMaster", isMaster);
    }

    await TimerHelper.sleep(2000);

    this.setState({
      loading: true,
    });

    localStorage.setItem("cards", JSON.stringify(cards));

    const user = await this.getUser();
    this.createShuffledAnswers();

    this.setState({ user, loading: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div style={{ position: "absolute", top: "50px" }}>
                <UserStats user={this.state.user} />
              </div>

              <Routes>
                <Route
                  path="/"
                  element={
                    <div style={{ padding: "10px" }}>
                      <Link to="/quiz">
                        <Button
                          style={{
                            fontSize: "22px",
                            color: "#666",
                            fontWeight: "bold",
                            backgroundColor: "#ccc",
                          }}
                        >
                          EN to TR QUIZ
                        </Button>
                      </Link>
                    </div>
                  }
                ></Route>

                <Route
                  path="/*"
                  element={
                    <Link to="/">
                      <Button
                        style={{
                          color: "white",
                          position: "absolute",
                          right: "0",
                        }}
                      >
                        <CloseRounded />
                      </Button>
                    </Link>
                  }
                ></Route>
              </Routes>
              <div style={{ margin: "20px" }}>
                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Routes>
                  <Route
                    path="/quiz"
                    element={
                      <QuestionCard
                        questionCards={this.state.questionCards}
                        correctCard={this.state.correctCard}
                        handler={this.onAnswer}
                        user={this.state.user}
                      />
                    }
                  ></Route>
                  <Route
                    path="/flashcard/:id"
                    element={
                      <FlashCard
                        cardsList={this.state.cardsList}
                        user={this.state.user}
                      />
                    }
                  ></Route>
                </Routes>
              </div>
            </>
          )}
        </header>
      </div>
    );
  }
}

export default App;
