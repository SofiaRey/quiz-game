import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchQuestions } from "./services/api";
import lottie from "lottie-web";
import starsAnimation from "./assets/stars_animation.json";
import Confetti from "react-confetti";
import QuestionScreen from "./components/QuestionScreen";
import PrimaryButton from "./components/PrimaryButton";
import GameFinishedScreen from "./components/GameFinishedScreen";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const animationContainer = useRef(null);

  useEffect(() => {
    const savedScores = localStorage.getItem("leaderboard");
    if (savedScores) {
      setLeaderboard(JSON.parse(savedScores));
    }
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: starsAnimation,
    });
    return () => {
      animation.destroy();
    };
  }, []);

  const startGame = async () => {
    const questionsFromApi = await fetchQuestions();
    setQuestions(questionsFromApi);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setCurrentQuestionIndex(0);
    setGameFinished(false);
    setName("");
  };

  const handleNext = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameFinished(true);
    }
  };

  const saveScore = () => {
    const newLeaderboard = [...leaderboard, { name, score }];
    setLeaderboard(newLeaderboard);
    localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
  };

  // If the result is more than 60%, show confetti
  const showConfetti = gameFinished && score / questions.length >= 0.6;

  return (
    <div className="flex flex-col items-center p-10 h-screen ">
      {showConfetti && <Confetti />}
      {questions.length === 0 ? (
        // First Screen
        <div className="w-full h-full flex flex-col justify-between items-center">
          <h1 className="text-4xl mb-6 font-semibold text-white">Quiz Game</h1>
          <div className="md:w-6/12" ref={animationContainer}></div>
          <PrimaryButton text="Jugar" onClick={startGame} />
        </div>
      ) : gameFinished ? (
        <GameFinishedScreen
          score={score}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          name={name}
          setName={setName}
          saveScore={saveScore}
          leaderboard={leaderboard}
          startGame={startGame}
        />
      ) : (
        <QuestionScreen
          question={questions[currentQuestionIndex]}
          onNext={handleNext}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
};

export default App;
