import { Routes, Route, useNavigate } from 'react-router-dom';
import LessonsList from "./components/LessonsList/LessonsList";
import LessonsDetails from "./components/LessonsDetails/LessonsDetails";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import LessonsForm from "./components/LessonsForm/LessonsForm";
import Lesson from "./components/Lesson/Lesson";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/actions/userAction";
import { allLessons } from "./redux/actions/lessonsAction";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetch('/auth/check').then(res => res.json()).then(data => dispatch(login(data)));
    fetch('/lessons').then(res => res.json()).then(data => dispatch(allLessons(data)));
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(login(user));
    }
  }, [user]);

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      {user?.message ? (<>Надо авторизоваться</>) :
        <>
          <Routes>
            <Route path="/details/:id" element={<LessonsDetails/>}></Route>
            <Route path="/" element={<LessonsList/>}></Route>
            <Route path="/form" element={<LessonsForm/>}/>
          </Routes>
        </>
      }
    </div>
  );
}

export default App;
