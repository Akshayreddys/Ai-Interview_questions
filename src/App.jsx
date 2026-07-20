import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/Header";
import InterviewForm from "./components/InterviewForm";
import QuestionsList from "./components/QuestuonList";

function App() {
  const [questions, setQuestions] = useState([]);

  return (
    <>
      <Header />
      <InterviewForm setQuestions={setQuestions} />
      <QuestionsList questions={questions} />
    </>
  );
}

export default App;
