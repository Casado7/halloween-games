import UploadWidget from './UploadWidget';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { Resize } from '@cloudinary/url-gen/actions';
import './WelcomePage.css';

function WelcomePage({ setStartDialogue, setUploadResult, cld, uploadResult }) {
    return (
        <div className="welcome-page">
            <h1>Bienvenido</h1>
            <p>
                Sumérgete en una pequeña aventura gráfica interactiva, creada para brindarte una experiencia envolvente.
                Antes de comenzar, sube una fotografía que muestre desde la parte superior de tu torso hasta tu cabeza.
            </p>


            <UploadWidget setUploadResult={setUploadResult} />

            {uploadResult && uploadResult?.uploadInfo?.secure_url && (
                <AdvancedImage
                    cldImg={cld.image(uploadResult.uploadInfo.public_id)
                        .resize(
                            Resize.thumbnail()  // Redimensionar a un thumbnail (miniatura)
                                .width(300)
                                .height(300)
                                .gravity(focusOn(face()))  // Enfocar en el rostro
                        )

                    }
                    alt="imagen subida"
                />
            )}

            <button onClick={() => setStartDialogue(true)}>
                <i className="fas fa-play"></i> Empezar
            </button>
        </div>
    );
}

export default WelcomePage;
