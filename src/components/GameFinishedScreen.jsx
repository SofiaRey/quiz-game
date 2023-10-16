import PrimaryButton from "./PrimaryButton";
import { useRef } from "react";

const GameFinishedScreen = ({
  score,
  correctAnswers,
  incorrectAnswers,
  name,
  setName,
  saveScore,
  leaderboard,
  startGame,
}) => {
  const ref = useRef(null);

  const onClear = () => {
    ref.current.value = "";
  };
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <h1 className="text-4xl mb-12 text-white font-bold">Game Finished!</h1>
        {/* Results */}
        <h2 className="mb-4 text-2xl text-white font-bold text-left">
          Results
        </h2>
        <div className="flex mb-12 text-white text-xl h-24">
          <div className="flex flex-col flex-2 items-start justify-between">
            <p>Your Score:</p>
            <p>Correct Answers:</p>
            <p>Incorrect Answers: </p>
          </div>
          <div className="flex flex-col flex-1 items-end  justify-between">
            <p className="text-yellow-400 font-bold">{score}</p>
            <p className="text-yellow-400 font-bold">{correctAnswers}</p>
            <p className="text-yellow-400 font-bold">{incorrectAnswers}</p>
          </div>
        </div>
        {/* Save score */}
        <h2 className="mb-4 text-2xl text-white font-bold text-left">
          Register your score
        </h2>
        <div className="flex">
          <input
            className="px-4 p-2 rounded-l-full w-full"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={ref}
          />
          <button
            className="bg-violet-500 text-white p-2 rounded-r-full w-32 hover:bg-violet-600"
            onClick={() => {
              if (name === "") {
                document
                  .getElementById("error-msg")
                  .classList.add("opacity-100");
                return;
              }
              document
                .getElementById("error-msg")
                .classList.remove("opacity-100");
              saveScore();
              onClear();
            }}
          >
            Save
          </button>
        </div>
        <p id="error-msg" className="mb-10 text-red-500 py-2 w-full opacity-0">
          Ingrese un nombre.
        </p>
        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-4 text-2xl text-white font-bold text-left">
              Leaderboard
            </h2>
            <div className="flex flex-col">
              <div className="flex text-white">
                <p className="flex-1 text-lg font-bold">Name</p>
                <p className="flex-1 text-lg font-bold">Score</p>
              </div>
              {leaderboard.map((entry, index) => (
                <div key={index} className="flex text-white">
                  <p className="flex-1 ">{entry.name}</p>
                  <p className="flex-1 ">{entry.score}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Play Again button} */}
      </div>
      <PrimaryButton text="Play Again" onClick={startGame} />
    </div>
  );
};

export default GameFinishedScreen;
