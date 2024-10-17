import { useEffect, useState } from 'react'
import './App.css'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import MemoryGame from './games/MemoryGame'
import DiceGame from './games/DiceGame'
import { Resize } from '@cloudinary/url-gen/actions'
import UploadWidget from './components/UploadWidget'

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME
  }
})

function App() {

  return (
    <>

      <AdvancedImage cldImg={cld.image('/cld-sample-5').resize(Resize.scale(0.2))} />
      <DiceGame />
      <h1>Cloudinary React Game</h1>
      <UploadWidget />

    </>
  )
}

export default App
