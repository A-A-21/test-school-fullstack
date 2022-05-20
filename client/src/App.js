import { Routes, Route } from 'react-router-dom';
import LessonsList from "./components/LessonsList/LessonsList";
import LessonsDetails from "./components/LessonsDetails/LessonsDetails";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/details/:id" element={<LessonsDetails/>}></Route>
        <Route path="/" element={<LessonsList/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
