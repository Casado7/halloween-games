import React, { useEffect, useState } from 'react';
import './App.css';
import useSound from 'use-sound';
import backGroundMusic from './components/sounds/background.mp3';
import DiceGame from './games/DiceGame';
import CloudinaryTests from './components/CloudinaryTests';
import Boss from './components/Boss';
import { Cloudinary } from '@cloudinary/url-gen'
import UploadWidget from './components/UploadWidget';


const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME
  }
})

function App() {
  const [startGame, setStartGame] = useState(false);
  const [startDialogue, setStartDialogue] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [playerName, setPlayerName] = useState('Jugador 1');
  const [playerChoices, setPlayerChoices] = useState({
    class: null, // mago, caballero, otra cosa
    bossType: null // zombie, esqueleto, demonio
  });
  const [playBackgroundMusic, { stop: stopBackgroundMusic }] = useSound(backGroundMusic, { volume: 0.3, loop: true });
  useEffect(() => {
    console.log("startGame", startGame);
  }
    , [startGame]);

  useEffect(() => {
    if (startDialogue) {
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }
    , [startDialogue]);
  return (
    <div className="app-container">
      {!startDialogue && !startGame && (
        <>
          <UploadWidget setUploadResult={setUploadResult} />
          <button onClick={() => setStartDialogue(true)}>Empezar</button>
        </>

      )}
      {/* Si startGame es false, mostrar el componente Boss */}
      {startDialogue && !startGame && (
        <div className="boss-container">
          <Boss
            startGame={startGame}
            setStartGame={setStartGame}
            setPlayerName={setPlayerName}
            playerChoices={playerChoices}
            setPlayerChoices={setPlayerChoices}
            cld={cld} />
        </div>
      )}

      {/* Si startGame es true, mostrar el componente DiceGame */}
      {startGame && (
        <div className="dicegame-container">
          <DiceGame startGame={startGame} setStartGame={setStartGame} playerName={playerName} cld={cld} uploadResult={uploadResult} />
        </div>
      )}
    </div>

  );
}

export default App;
