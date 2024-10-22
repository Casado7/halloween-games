import React from 'react';
import './EndPage.css'; // Puedes personalizar esta hoja de estilos para darle un toque final terrorífico

function EndPage({ isWinner, handleResetGame, playerChoices, uploadResult, cld }) {
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
            {/* console.log */}
            <button onClick={ () => console.log(playerChoices, uploadResult) }>
                Ver elecciones
            </button>
        </div>
    );
}

export default EndPage;
