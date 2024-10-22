import React, { useEffect, useState } from 'react';
import './App.css';
import useSound from 'use-sound';
import backGroundMusic from './components/sounds/background.mp3';
import DiceGame from './games/DiceGame';
import CloudinaryTests from './components/CloudinaryTests';
import Boss from './components/Boss';
import { Cloudinary } from '@cloudinary/url-gen'
import UploadWidget from './components/UploadWidget';
import WelcomePage from './components/WelcomePage';
import EndPage from './components/EndPage';


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
  const [isWinner, setIsWinner] = useState(null);
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

  const handleResetGame = () => {
    setStartGame(false);
    setStartDialogue(false);
    setUploadResult(null);
    setPlayerName('Jugador 1');
    setPlayerChoices({
      class: null,
      bossType: null
    });
  }
  return (
    <div className="app-container">
      {/* Pantalla de bienvenida, se muestra si no ha empezado el diálogo y el juego no ha comenzado */}
      {!startDialogue && !startGame && isWinner === null && (
        <WelcomePage
          setStartDialogue={setStartDialogue}
          setUploadResult={setUploadResult}
          cld={cld}
          uploadResult={uploadResult}
        />
      )}

      {/* Si el diálogo ha comenzado y el juego aún no, mostrar el componente de diálogo con el jefe */}
      {startDialogue && !startGame && isWinner === null && (
        <div className="boss-container">
          <Boss
            startGame={startGame}
            setStartGame={setStartGame}
            setPlayerName={setPlayerName}
            playerChoices={playerChoices}
            setPlayerChoices={setPlayerChoices}
            cld={cld}
          />
        </div>
      )}

      {/* Mostrar el juego si ha comenzado */}
      {startGame && isWinner === null && (
        <div className="dicegame-container">
          <DiceGame
            startGame={startGame}
            setStartGame={setStartGame}
            setIsWinner={setIsWinner} // Determina el ganador
            playerName={playerName}
            cld={cld}
            uploadResult={uploadResult}
          />
        </div>
      )}

      {/* Mostrar la pantalla de final cuando el resultado esté definido (victoria o derrota) */}
      {isWinner !== null && (
        <EndPage
          isWinner={isWinner}
          cld={cld}
          playerChoices={playerChoices}
          uploadResult={uploadResult}
          handleResetGame={handleResetGame}
        />
      )}
    </div>

  );
}

export default App;
