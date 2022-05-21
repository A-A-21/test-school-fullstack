import React, { useState } from 'react';
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userAction";
import { addLesson } from "../../redux/actions/lessonsAction";

const LessonsForm = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', inputs.file);
    formData.append('title', inputs.title);
    formData.append('text', inputs.text);
    const response = await fetch('/lessons', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (response.status === 400) {
      return alert(data.message);
    } else if (response.status === 200) {
      dispatch(addLesson(data));
      navigate('/');
    }
  };

  return (
    <>
      <div className="form">

        <FormControl className="form_inputs">
          <InputLabel htmlFor="my-input">Title</InputLabel>
          <Input name="title" value={inputs.title} onChange={inputHandler} id="my-input"
                 aria-describedby="my-helper-text"/>
        </FormControl>
        <FormControl className="form_inputs">
          <InputLabel htmlFor="my-input">Text</InputLabel>
          <Input name="text" value={inputs.text} onChange={inputHandler} id="my-input"
                 aria-describedby="my-helper-text"/>
        </FormControl>
        <input onChange={inputHandler} name="file" type="file"/>
        <Button onClick={submitHandler} variant="contained">Добавить новый урок</Button>
      </div>
    </>
  );
};

export default LessonsForm;
