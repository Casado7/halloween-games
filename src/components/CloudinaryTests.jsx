import { useEffect, useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'

import { Resize, Effect, RoundCorners } from '@cloudinary/url-gen/actions'
import {Actions} from '@cloudinary/url-gen'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import UploadWidget from './UploadWidget'


const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME
  }
})

function CloudinaryTests() {
  const [uploadResult, setUploadResult] = useState(null);
  useEffect(() => {
  console.log("result", uploadResult)
}, [uploadResult])
  return (
    <>
      <UploadWidget  setUploadResult={setUploadResult}/>

      {uploadResult && uploadResult?.uploadInfo?.secure_url && (
        <>
          <h2>Imagen cargada:</h2>
          {/* Imagen 1: Filtro oscuro y sombrío */}
          <h3>Filtro oscuro y sombrío</h3>
          <AdvancedImage 
            cldImg={cld.image(uploadResult.uploadInfo.public_id)
              .resize(Resize.scale(1.5)) // Escalar la imagen
              .effect(Effect.generativeBackgroundReplace("Cartoon Mickey House")) // Reemplazar el fondo con un color oscuro
            } 
            alt="Halloween Dark Filter"
          />

          {/* Imagen 4: Enfoque en el rostro, esquinas redondeadas, formato automático */}
          <h3>Enfoque en el rostro con esquinas redondeadas</h3>
          <AdvancedImage 
            cldImg={cld.image(uploadResult.uploadInfo.public_id)
              .resize(
                Resize.thumbnail()  // Redimensionar a un thumbnail (miniatura)
                  .width(200)
                  .height(200)
                  .gravity(focusOn(face()))
                  // Enfocar en el rostro
              )
              .roundCorners(RoundCorners.max())  // Redondear las esquinas al máximo
         // Formato automático
            } 
            alt="Face Focus with Rounded Corners"
          />
        

        </>
      )}
    </>
  )
}

export default CloudinaryTests
