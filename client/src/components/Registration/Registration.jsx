import React, { useState } from 'react';
import './index.css';
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/auth/registration', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    });
    const data = await response.json();
    if (response.status === 400) {
      return alert(data.message);
    } else if (response.status === 200) {
      const user = { id: data.id, roles: data.roles, email: data.email };
      dispatch(login(user));
      navigate('/');
    }
  };

  return (
    <div className="form">

      <FormControl className="form_inputs" fullWidth>
        <InputLabel id="demo-simple-select-label">Роль</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          name="roles"
          onChange={inputHandler}
        >
          <MenuItem value="TEACHER">Teacher</MenuItem>
          <MenuItem value="STUDENT">Student</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="form_inputs">
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input name="useremail" value={inputs.useremail} onChange={inputHandler} id="my-input"
               aria-describedby="my-helper-text"/>
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl className="form_inputs">
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input name="username" value={inputs.username} onChange={inputHandler} id="my-input"
               aria-describedby="my-helper-text"/>
        <FormHelperText id="my-helper-text">We'll never share your name.</FormHelperText>
      </FormControl>
      <FormControl className="form_inputs">
        <InputLabel htmlFor="my-input">Пароль</InputLabel>
        <Input name="password" value={inputs.password} onChange={inputHandler} id="my-input"
               aria-describedby="my-helper-text"/>
        <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
      </FormControl>
      <Button onClick={submitHandler} variant="contained">Зарегистироваться</Button>
    </div>
  );
};

export default Registration;
