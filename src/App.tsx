import React from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import FlashCard from "./components/FlashCard";
import UserStats from "./components/UserStats";
import { UserCards, User, Stats } from "./interfaces/UserItem";
import CardItem from "./interfaces/CardItem";
import ApiService from "./utilities/ApiService";
import ArrayHelper from "./utilities/ArrayHelper";
import TimerHelper from "./utilities/TimerHelper";
import { Dialog } from "@material-ui/core";
import WordTypes from "./constants/WordTypes";

interface AppState {
  cardsList: CardItem[];
  questionCards: CardItem[];
  flashCards: CardItem[];
  correctCard: CardItem;
  user: User;
  loading: boolean;
  openDialog: boolean;
}
class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.onAnswer = this.onAnswer.bind(this);
    this.onWordBoxClick = this.onWordBoxClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);

    this.state = {
      openDialog: false,
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
    const cardsList = this.state.cardsList;

    const cards: UserCards = await ApiService.getApi("usercards");
    const stats: Stats = {
      review: cardsList.filter((card) => cards.review.includes(card.id)).length,
      master: cardsList.filter((card) => cards.master.includes(card.id)).length,
      learning: cardsList.filter((card) => cards.learning.includes(card.id))
        .length,
    };

    const user: User = {
      cards: cards,
      stats: stats,
    };

    return user;
  }

  async componentDidMount() {
    const cardsList: CardItem[] = await ApiService.getApi("cards");
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

    await ApiService.putApi("userCards", cards);

    const user = await this.getUser();
    this.createShuffledAnswers();

    this.setState({ user, loading: false });
  }

  onWordBoxClick(wordType: string) {
    console.log(wordType, "box will open");

    const cards = this.state.user.cards;
    let idList: string[];

    switch (wordType) {
      case WordTypes.Learning:
        idList = cards.learning;
        break;
      case WordTypes.Review:
        idList = cards.review;
        break;
      case WordTypes.Mastered:
        idList = cards.master;
        break;
    }

    const flashCards = this.state.cardsList.filter((card) =>
      idList.includes(card.id)
    );

    this.setState({ openDialog: true, flashCards });
  }

  handleDialogClose() {
    this.setState({ openDialog: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Dialog
                onClose={this.handleDialogClose}
                open={this.state.openDialog}
              >
                <FlashCard flashCards={this.state.flashCards} />
              </Dialog>

              <UserStats
                user={this.state.user}
                wordsBoxHandler={this.onWordBoxClick}
              />
              <QuestionCard
                questionCards={this.state.questionCards}
                correctCard={this.state.correctCard}
                handler={this.onAnswer}
                user={this.state.user}
              />
            </>
          )}
        </header>
      </div>
    );
  }
}

export default App;
