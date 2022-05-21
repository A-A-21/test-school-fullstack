import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteLesson } from "../../redux/actions/lessonsAction";

const Lesson = ({ img, title, text, author, id, user }) => {

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    const responce = await fetch(`/lessons/${id}`, {
      method: 'DELETE'
    });
    if (responce.status === 201) {
      dispatch(deleteLesson(id));
    }
  };

  return (
    <div>
      <Card style={{ width: "20vw", height: "20vw", margin: "2vw" }}>
        <CardMedia
          component="img"
          image={`http://localhost:3001${img}`}
          alt="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          {(user === author) ?
            <>
              <Button size="small">Изменить</Button>
              <Button onClick={() => deleteHandler(id)} size="small">Удалить</Button>
            </>
            : ""
          }
        </CardActions>
      </Card>
    </div>
  );
};

export default Lesson;
