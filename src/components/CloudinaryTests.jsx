import { useEffect, useState } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { generativeReplace } from "@cloudinary/url-gen/actions/effect";
import { Resize, Effect, RoundCorners } from '@cloudinary/url-gen/actions'
import { Actions } from '@cloudinary/url-gen'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import UploadWidget from './UploadWidget'




function CloudinaryTests({ cld, uploadResult }) {

  useEffect(() => {
    console.log("result", uploadResult)
  }, [uploadResult])


  return (
    <>
      {uploadResult && uploadResult?.uploadInfo?.secure_url && (
        <>
          {/* Imagen 1: Filtro de caballero  */}
          <AdvancedImage
            cldImg={cld.image(uploadResult.uploadInfo.public_id)
              .resize(Resize.scale(1.5)) // Escalar la imagen
              .effect(generativeReplace().from("clothing").to("knight's armor")) // Reemplazar las gafas de sol con gafas de sol negras
            }
            alt="Knight's Armor"
          />
          {/* Imagen 2: Filtro de mago */}
          <AdvancedImage
            cldImg={cld.image(uploadResult.uploadInfo.public_id)
              .resize(Resize.scale(1.5)) // Escalar la imagen
              .effect(generativeReplace().from("clothing").to("wizard's robe with wand")) // Reemplazar las gafas de sol con gafas de sol negras
            }
            alt="Wizard's Robe"
          />
          {/* Imagen 3: Filtro de cazador */}
          <AdvancedImage
            cldImg={cld.image(uploadResult.uploadInfo.public_id)
              .resize(Resize.scale(1.5)) // Escalar la imagen
              .effect(generativeReplace().from("clothing").to("hunter's outfit with bow")) // Reemplazar las gafas de sol con gafas de sol negras
            }
            alt="Hunter's Outfit"
          />
          {/* Imagen 4: Filtro de demonio */}
          <AdvancedImage
            cldImg={cld.image(uploadResult.uploadInfo.public_id)
              .resize(Resize.scale(1.5)) // Escalar la imagen
              .effect(generativeReplace().from("clothing").to("demon's outfit with horns")) // Reemplazar las gafas de sol con gafas de sol negras
            }
            alt="Demon's Outfit"
          />
          {/* Imagen 5: Filtro de zombie */}
          <AdvancedImage
            cldImg={cld.image(uploadResult.uploadInfo.public_id)
              .resize(Resize.scale(1.5)) // Escalar la imagen
              .effect(generativeReplace().from("clothing").to("zombie's outfit with blood")) // Reemplazar las gafas de sol con gafas de sol negras
            }
            alt="Zombie's Outfit"
          />
          {/* Imagen 6: Filtro de esqueleto */}
          <AdvancedImage
            cldImg={cld.image(uploadResult.uploadInfo.public_id)
              .resize(Resize.scale(1.5)) // Escalar la imagen
              .effect(generativeReplace().from("clothing").to("skeleton's outfit with bones")) // Reemplazar las gafas de sol con gafas de sol negras
            }
            alt="Skeleton's Outfit"
          />
        </>
      )}
    </>
  )
}

export default CloudinaryTests
