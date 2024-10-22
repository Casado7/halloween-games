import React from 'react';
import './EndPage.css'; // Puedes personalizar esta hoja de estilos para darle un toque final terrorífico
import { AdvancedImage } from '@cloudinary/react';
import { generativeReplace } from "@cloudinary/url-gen/actions/effect";
import { Resize } from '@cloudinary/url-gen/actions';

function EndPage({ isWinner, handleResetGame, playerChoices, uploadResult, cld }) {
    const getWinningImageEffect = () => {
        switch (playerChoices.class) {
            case 'Mago':
                return generativeReplace().from("clothing").to("wizard's robe with wand");
            case 'Caballero':
                return generativeReplace().from("clothing").to("knight's armor");
            case 'Cazador':
                return generativeReplace().from("clothing").to("hunter's outfit with bow");
            default:
                return null;
        }
    };

    const getLosingImageEffect = () => {
        switch (playerChoices.bossType) {
            case 'Demonio':
                return generativeReplace().from("clothing").to("demon's outfit with horns");
            case 'Zombie':
                return generativeReplace().from("clothing").to("zombie's outfit with blood");
            case 'Esqueleto':
                return generativeReplace().from("clothing").to("skeleton's outfit with bones");
            default:
                return null;
        }
    };

    return (
        <div className="end-page">
            {isWinner ? (
                <div>
                    <h1>¡Felicidades, has ganado!</h1>
                    <p>Has logrado escapar de las garras del malvado jefe. ¡Tu valentía ha sido recompensada!</p>
                </div>
            ) : (
                <div>
                    <h1>¡Has perdido!</h1>
                    <p>El jefe ha tomado control de tu alma y ahora eres uno de sus esbirros, condenado a servirle por la eternidad.</p>
                </div>
            )}


            <button onClick={handleResetGame}>
                <i className="fas fa-redo"></i> Jugar de nuevo
            </button>
            {/* Mostrar la imagen dependiendo de si el jugador ganó o perdió */}
            {uploadResult && uploadResult?.uploadInfo?.secure_url && (
                <AdvancedImage
                    cldImg={cld.image(uploadResult.uploadInfo.public_id)
                        .effect(isWinner ? getWinningImageEffect() : getLosingImageEffect()) // Aplicar el efecto según el resultado
                    }
                    alt={isWinner ? playerChoices.class : playerChoices.bossType}
                />
            )}
        </div>
    );
}

export default EndPage;
