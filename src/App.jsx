import './App.css';
import DiceGame from './games/DiceGame';
import CloudinaryTests from './components/CloudinaryTests';
import Boss from './components/Boss';

function App() {
  return (
    <div className="app-container">
      {/* Contenedor de Boss */}
      <div className="boss-container">
        <Boss />
      </div>
      
      {/* Contenedor del juego */}
      <div className="dicegame-container">
        <DiceGame />
      </div>
    </div>
  );
}

export default App;
