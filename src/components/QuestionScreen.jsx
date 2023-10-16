import PrimaryButton from "./PrimaryButton";
import { useState, useMemo } from "react";

const QuestionScreen = ({
  question,
  onNext,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const {
    question: questionText,
    correct_answer,
    incorrect_answers,
  } = question;
  // Answers are only shuffled when the question changes, not on every render.
  const answers = useMemo(() => {
    return [correct_answer, ...incorrect_answers].sort(
      () => Math.random() - 0.5
    );
  }, [question]);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === correct_answer;
    setSelectedAnswer(answer);
    setIsAnswerCorrect(isCorrect);
    setTimeout(() => {
      onNext(isCorrect);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      onNext(isCorrect);
    }, 1000);
  };

  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center w-full h-full justify-between">
      <div className="w-full flex flex-col items-center">
        {/* Barra de Progreso */}
        <div className="relative mb-8 w-full h-2 bg-violet-600 rounded">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="absolute h-2 bg-yellow-500 rounded"
          ></div>
        </div>

        {/* Question */}
        <h2
          className="text-2xl mb-6 text-white"
          dangerouslySetInnerHTML={{ __html: questionText }}
        />
      </div>

      <div className="w-full">
        {answers.map((answer, index) => (
          <div key={index} className="mb-4">
            <PrimaryButton
              key={index}
              text={answer}
              onClick={() => handleAnswerClick(answer)}
              bgColor={
                answer === selectedAnswer
                  ? isAnswerCorrect
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-yellow-500"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionScreen;
