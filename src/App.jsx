import React, { useEffect, useState } from 'react';
import './App.css';
import useSound from 'use-sound';
import backGroundMusic from './components/sounds/background.mp3';
import DiceGame from './games/DiceGame';
import CloudinaryTests from './components/CloudinaryTests';
import Boss from './components/Boss';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [playerName, setPlayerName] = useState('Jugador 1');
  const [playBackgroundMusic, { stop: stopBackgroundMusic }] = useSound(backGroundMusic, { volume: 0.3, loop: true });
  useEffect(() => {
    console.log("startGame", startGame);
  }
    , [startGame]);

  useEffect(() => {
    if (startGame) {
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }
    , [startGame]);
  return (
    <div className="app-container">
      {/* Si startGame es false, mostrar el componente Boss */}
      {!startGame && (
        <div className="boss-container">
          <Boss startGame={startGame} setStartGame={setStartGame} setPlayerName={setPlayerName} />
        </div>
      )}

      {/* Si startGame es true, mostrar el componente DiceGame */}
      {startGame && (
        <div className="dicegame-container">
          <DiceGame startGame={startGame} setStartGame={setStartGame} playerName={playerName} />
        </div>
      )}
    </div>

  );
}

export default App;
