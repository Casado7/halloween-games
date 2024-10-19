import './App.css'
import DiceGame from './games/DiceGame'
import CloudinaryTests from './components/CloudinaryTests'
import Boss from './components/Boss'

function App() {

  return (
    <>
      <Boss></Boss>
      <h1>Cloudinary React Game</h1>
      <DiceGame />
    </>
  )
}

export default App
