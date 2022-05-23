import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addLesson, allLessons, deleteLesson, editLesson } from "../../redux/actions/lessonsAction";
import { useNavigate } from "react-router-dom";

const Lesson = ({ img, title, text, author, id, user, setStateLessons }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({ title, text });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigateHandler = () => {
    navigate(`/details/${id}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', inputs.file);
    formData.append('title', inputs.title);
    formData.append('text', inputs.text);
    const response = await fetch(`/lessons/${id}`, {
      method: 'PUT',
      body: formData,
    });
    const data = await response.json();
    if (response.status === 400) {
      return alert(data.message);
    } else if (response.status === 200) {
      dispatch(editLesson(data.lesson));
      fetch('/lessons').then(res => res.json()).then(data => dispatch(allLessons(data)));
      handleClose();
    }
  };

  const inputHandler = (e) => {
    if (e.target.files) {
      setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        file: e.target.files[0],
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const deleteHandler = async () => {
    const responce = await fetch(`/lessons/${id}`, {
      method: 'DELETE'
    });
    if (responce.status === 201) {
      dispatch(deleteLesson(id));
      fetch('/lessons').then(res => res.json()).then(data => dispatch(allLessons(data)));
    }
  };

  return (
    <>
      <div style={{ width: "40vw", maxHeight: "65vw", margin: "40px" }}>
        <Card onClick={() => navigateHandler()}>
          <CardMedia
            component="img"
            image={`http://localhost:3001${img}`}
            alt="img"
            style={{
              width: "40vw",
              height: "30vw"
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
        </Card>
        <CardActions>
          {((String(user) === String(author))) ?
            <>
              <Button onClick={handleOpen} size="small">Изменить</Button>
              <Button onClick={deleteHandler} size="small">Удалить</Button>
            </>
            : ""
          }
        </CardActions>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <input type="text" style={{ height: "3vw", width: "30vw" }} value={inputs.title} onChange={inputHandler}
                   name="title"/>
            <textarea style={{ height: "20vw", width: "30vw" }} type="text" value={inputs.text} onChange={inputHandler}
                      name="text"/>
            <input onChange={inputHandler} type="file"/>
            <button onClick={submitHandler}>Изменить</button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

const style = {
  position: 'absolute',
  top: '40%',
  left: '40%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default Lesson;

