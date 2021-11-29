import { User } from "./../interfaces/UserItem";
import Colors from "./../constants/Colors";
import WordTypes from "./../constants/WordTypes";
import { Card, CardContent, Grid, Box, Divider } from "@material-ui/core";

type UserStatProps = {
  user: User;
  wordsBoxHandler: Function;
};

const UserStats = ({ user, wordsBoxHandler }: UserStatProps): JSX.Element => {
  const openWordsToLearn = () => {
    wordsBoxHandler(WordTypes.Learning);
  };

  const openWordsToReview = () => {
    wordsBoxHandler(WordTypes.Review);
  };

  const openWordsToMaster = () => {
    wordsBoxHandler(WordTypes.Mastered);
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
          <Grid style={{ cursor: "pointer" }} onClick={openWordsToLearn}>
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
          <Divider orientation="vertical" variant="middle" flexItem />
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
          <Divider orientation="vertical" variant="middle" flexItem />
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserStats;
