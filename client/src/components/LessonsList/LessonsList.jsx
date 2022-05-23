import React, { useEffect, useState } from 'react';
import Lesson from "../Lesson/Lesson";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { allLessons } from "../../redux/actions/lessonsAction";

const LessonsList = () => {
  const [status, setStatus] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/lessons').then(res => res.json()).then(data => dispatch(allLessons(data)));
  }, []);


  const lessons = useSelector(state => state.lessons);
  const user = useSelector(state => state.user);

  const [stateLessons, setStateLessons] = useState([]);

  useEffect(() => {
    if (lessons.length > 0) {
      setStatus(false);
      setStateLessons(lessons);
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
          {stateLessons?.map((el) => (
            <Lesson setStateLessons={setStateLessons} key={el._id} id={el._id}
                    title={el.title} img={el.img}
                    author={Array.isArray(el?.author) ? el.author[0] : ''} user={user?.email}
                    text={el.text}/>
          ))}


        </div>
      }
    </>
  );
};

export default LessonsList;
