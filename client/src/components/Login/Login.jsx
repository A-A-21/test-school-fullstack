import React from 'react';
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const Login = () => {

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
    const response = await fetch('/auth/login', {
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
    <div>
      <div className="form">

        <FormControl className="form_inputs">
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input name="useremail" onChange={inputHandler} id="my-input" aria-describedby="my-helper-text"/>
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl className="form_inputs">
          <InputLabel htmlFor="my-input">Пароль</InputLabel>
          <Input type="password" name="password" onChange={inputHandler} id="my-input"
                 aria-describedby="my-helper-text"/>
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
        <Button onClick={submitHandler} variant="contained">Contained</Button>
      </div>
    </div>
  );
};

export default Login;
