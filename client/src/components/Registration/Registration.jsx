import React, { useState } from 'react';
import './index.css';
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import login from "../Login/Login";

const Registration = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  console.log(inputs);
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
      body: JSON.stringify({ inputs })
    });
    const data = await response.json();
    if (response.status === 400) {
      return alert(data.message);
    } else if (response.status === 200) {
      const user = { id: data.id, roles: data.roles };
      dispatch(login(user));
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
        <Input name="useremail" onChange={inputHandler} id="my-input" aria-describedby="my-helper-text"/>
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl className="form_inputs">
        <InputLabel htmlFor="my-input">Пароль</InputLabel>
        <Input name="password" onChange={inputHandler} id="my-input" aria-describedby="my-helper-text"/>
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <Button onClick={submitHandler} variant="contained">Contained</Button>
    </div>
  );
};

export default Registration;
