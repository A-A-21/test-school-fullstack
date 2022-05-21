import React, { useEffect, useState } from 'react';
import Lesson from "../Lesson/Lesson";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { allLessons } from "../../redux/actions/lessonsAction";

const LessonsList = () => {
  const [status, setStatus] = useState(true);
  const dispatch = useDispatch();
  const lessons = useSelector(state => state.lessons);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (lessons.length > 0) {
      setStatus(false);
    }
  }, [lessons]);

  return (
    <>
      {status ?
        <Box sx={{ display: 'flex' }}>
          <CircularProgress/>
        </Box>
        :
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {lessons?.map((el) => (
            <Lesson key={el._id} id={el._id} title={el.title} img={el.img}
                    author={el.author[0]} user={user.email}
                    text={el.text}/>
          ))}


        </div>
      }
    </>
  );
};

export default LessonsList;
