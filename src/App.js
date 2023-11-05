import useUserInfo from "./customhook/useUserInfo";
import "./App.css";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Fragment } from "react";

function App() {
  const { userList, current, next, previous, currentIndex, loading } =
    useUserInfo("https://randomuser.me/api");

  return (
    <div className="content">
      <div style={{ padding: 10, minWidth: 230 }}>
        <span className="currentUser">Current User:</span>
        {current !== undefined && (
          <span>
            <b>{current.name.first}</b>
          </span>
        )}
        <div className="buttons">
          <Button
            className={currentIndex === 0 ? "disabledBtn" : "btn"}
            variant="contained"
            disabled={currentIndex === 0}
            onClick={() => previous()}
          >
            previous
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            className="btn"
            onClick={() => next()}
          >
            Next
          </LoadingButton>
        </div>
      </div>

      <div className="allusers">
        <Typography variant="h6" className="userTitle">
          AllUsers:
        </Typography>
        <List>
          {userList.map((user, index) => (
            <Fragment key={`${user.name}${index}`}>
              <ListItem>
                <ListItemAvatar
                  className={currentIndex === index ? "highlight" : null}
                >
                  <Avatar src={user.picture.thumbnail} />
                </ListItemAvatar>
                <ListItemText key={user.name.first}>
                  {user.name.first}
                </ListItemText>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;
