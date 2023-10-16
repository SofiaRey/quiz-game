import { useState, useEffect } from "react";

const Leaderboard = ({ onBack }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const savedScores = localStorage.getItem("leaderboard");
    if (savedScores) {
      setLeaderboard(JSON.parse(savedScores));
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-6">Leaderboard</h1>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index} className="mb-2">
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
      <button
        className="mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
};

export default Leaderboard;
