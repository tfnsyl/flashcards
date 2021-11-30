import { User } from "./../interfaces/UserItem";
import Colors from "./../constants/Colors";
import WordTypes from "./../constants/WordTypes";
import { Card, CardContent, Grid, Box, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

type UserStatProps = {
  user: User;
};

const UserStats = ({ user }: UserStatProps): JSX.Element => {
  const openWordsToLearn = () => {
    //    wordsBoxHandler(WordTypes.Learning);
  };

  const openWordsToReview = () => {
    //  wordsBoxHandler(WordTypes.Review);
  };

  const openWordsToMaster = () => {
    //wordsBoxHandler(WordTypes.Mastered);
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            borderRadius: 1,
            bgcolor: "background.paper",
            color: "text.secondary",
            fontSize: "18px",
          }}
        >
          <Link to={"/flashcard/" + WordTypes.Learning}>
            <Grid>
              <div>Words To Learn:</div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: Colors.Learning,
                }}
              >
                {user.stats.learning}
              </div>
            </Grid>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link to={"/flashcard/" + WordTypes.Review}>
            <Grid style={{ cursor: "pointer" }} onClick={openWordsToReview}>
              <div>Words To Review: </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: Colors.Review,
                }}
              >
                {user.stats.review}
              </div>
            </Grid>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link to={"/flashcard/" + WordTypes.Mastered}>
            <Grid style={{ cursor: "pointer" }} onClick={openWordsToMaster}>
              <div>Words Mastered: </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: Colors.Mastered,
                }}
              >
                {user.stats.master}
              </div>
            </Grid>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserStats;
