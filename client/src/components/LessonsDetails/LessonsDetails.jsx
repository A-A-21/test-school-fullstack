import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const LessonsDetails = () => {
  const [lesson, setLesson] = useState({});
  const id = useParams();
  console.log(lesson);
  useEffect(() => {
    fetch(`/lessons/${id}`).then(res => res.json()).then(data => setLesson(data));
  }, []);


  return (
    <div>
      <div style={{ width: "65vw", maxHeight: "80vw", margin: "40px" }}>
        <Card>
          <CardMedia
            component="img"
            image={`http://localhost:3001${lesson.img}`}
            alt="img"
            style={{
              width: "65vw",
              height: "45vw"
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {lesson.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lesson.text}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonsDetails;
