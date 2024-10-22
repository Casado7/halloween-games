import React, { useEffect, useState } from 'react';
import Die from './DiceGameJs/Die'; // Importamos el nuevo componente
import './DiceGame.css';
import { AdvancedImage } from '@cloudinary/react'
import { Resize, Effect, RoundCorners } from '@cloudinary/url-gen/actions'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';

import useSound from 'use-sound'; // Para el sonido
import diceSound from '../components/sounds/dice.mp3';
import thudSound from '../components/sounds/thud.mp3';



const initialBoard = () => Array(3).fill(Array(3).fill(null));

export default function DiceGame({ startGame, playerName, cld, uploadResult, setIsWinner }) {
    const [playerBoards, setPlayerBoards] = useState([initialBoard(), initialBoard()]);
    const [turn, setTurn] = useState(0); // 0 para el jugador 1, 1 para el jugador 2
    const [rolledValue, setRolledValue] = useState(null);
    const [tempValue, setTempValue] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [playDiceSound, { stop: stopDiceSound }] = useSound(diceSound, { volume: 0.2, interrupt: true });
    const [playThudSound, { stop: stopThudSound }] = useSound(thudSound, { volume: 0.2, interrupt: true });

    // Función para tirar el dado
    const rollDice = () => {
        let count = 0;
        playDiceSound()
        const interval = setInterval(() => {
            const randomRoll = Math.floor(Math.random() * 6) + 1;
            setTempValue(randomRoll); // Cambiar el valor temporal del dado para la animación
            count++;

            if (count >= 9) { // Después de 10 intervalos (ajustar para controlar la duración de la animación)
                clearInterval(interval); // Detener la animación
                const finalRoll = Math.floor(Math.random() * 6) + 1; // Generar el valor definitivo del dado
                setRolledValue(finalRoll); // Establecer el valor definitivo
                setTempValue(null); // Limpiar el valor temporal
                stopDiceSound(); // Detener el sonido del dado
            }
        }, 100); // Cambia el valor cada 100ms (puedes ajustar esto para cambiar la velocidad de la animación)
    };

    // Colocar el dado en la primera celda vacía de la columna del tablero del jugador
    const placeDie = (col) => {
        if (rolledValue) {
            console.log(`Placing die ${rolledValue} in column ${col}`);
            const board = playerBoards[turn].map(row => [...row]);
            let placed = false;

            // Encontrar la primera celda vacía en la columna, desde la fila inferior hacia arriba
            for (let row = 2; row >= 0; row--) {
                if (board[row][col] === null) {
                    board[row][col] = rolledValue;
                    placed = true;
                    playThudSound();  // Reproduce el sonido al colocar el dado
                    break;
                }
            }

            // Si no se pudo colocar el dado (columna llena), no hacemos nada
            if (!placed) return;

            const newBoards = [...playerBoards];
            newBoards[turn] = board;

            // Destruir dados del oponente en la columna
            const opponentBoard = playerBoards[1 - turn].map(row => [...row]);
            for (let row = 0; row < 3; row++) {
                if (opponentBoard[row][col] === rolledValue) {
                    opponentBoard[row][col] = null;
                }
            }
            newBoards[1 - turn] = opponentBoard;

            setPlayerBoards(newBoards);
            setRolledValue(null);
            checkGameOver(newBoards);
            setTurn(turn === 0 ? 1 : 0); // Cambiar turno
        } else {
            console.log('Roll the dice first!');
        }
    };

    // Comprobar si el juego ha terminado
    const checkGameOver = (boards) => {
        const isFull = boards.some(board =>
            board.every(row => row.every(cell => cell !== null))
        );
        if (isFull) setIsGameOver(true);
    };

    // Calcular la puntuación de una columna
    const calculateScore = (board) => {
        let totalScore = 0;
        for (let col = 0; col < 3; col++) {
            let colScore = 0;
            let count = {};
            for (let row = 0; row < 3; row++) {
                const value = board[row][col];
                if (value !== null) {
                    count[value] = (count[value] || 0) + 1;
                }
            }
            for (const value in count) {
                const val = parseInt(value);
                colScore += Math.pow(val, count[value]); // Multiplica el valor por sí mismo
            }
            totalScore += colScore;
        }
        return totalScore;
    };

    // Renderizar el tablero del jugador
    const renderBoard = (board, scoresOnTop) => {
        const calculateColumnScore = (colIndex) => {
            let colScore = 0;
            let count = {};
            for (let row = 0; row < 3; row++) {
                const value = board[row][colIndex];
                if (value !== null) {
                    count[value] = (count[value] || 0) + 1;
                }
            }
            for (const value in count) {
                const val = parseInt(value);
                colScore += Math.pow(val, count[value]);
            }
            return colScore;
        };

        const getDieColor = (rowIndex, colIndex) => {
            let count = {};
            for (let row = 0; row < 3; row++) {
                const value = board[row][colIndex];
                if (value !== null) {
                    count[value] = (count[value] || 0) + 1;
                }
            }

            const cellValue = board[rowIndex][colIndex];
            if (cellValue !== null) {
                const repetitions = count[cellValue];
                if (repetitions === 2) {
                    return '#ebd879'; // Duplicado
                } else if (repetitions === 3) {
                    return '#6fadce'; // Triplicado
                }
            }
            return '#f3eacd'; // Color predeterminado si no hay repeticiones
        };


        return (
            <div className="player-board">
                {scoresOnTop && (
                    <div className="row column-scores">
                        {board[0].map((_, colIndex) => (
                            <div key={colIndex} className="score-cell">
                                <span>{calculateColumnScore(colIndex)}</span>
                            </div>
                        ))}
                    </div>
                )}

                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className="cell"
                                onClick={() => placeDie(colIndex)}
                            >
                                {cell && <Die value={cell} color={getDieColor(rowIndex, colIndex)} />}
                            </div>
                        ))}
                    </div>
                ))}

                {!scoresOnTop && (
                    <div className="row column-scores">
                        {board[0].map((_, colIndex) => (
                            <div key={colIndex} className="score-cell">
                                <span>{calculateColumnScore(colIndex)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };


    const player1Score = calculateScore(playerBoards[0]);
    const player2Score = calculateScore(playerBoards[1]);

    // IA para el jugador 2

    // Colocar un dado en una columna aleatoria
    const placeRandomDie = () => {
        const emptyCols = [0, 1, 2].filter(colIndex => {
            return playerBoards[1].some(row => row[colIndex] === null);
        });

        if (emptyCols.length > 0) {
            const randomCol = emptyCols[Math.floor(Math.random() * emptyCols.length)];

            // Asegúrate de que `placeDie` se llame correctamente
            console.log('Placing die in column', randomCol);
            placeDie(randomCol);
        }
    };


    // Simular el dado del jugador 2
    useEffect(() => {
        if (turn === 1 && rolledValue === null && !isGameOver) {
            setTimeout(() => {
                rollDice();
            }, 1000);
        }
    }, [turn, rolledValue, isGameOver]);

    useEffect(() => {
        if (turn === 1 && rolledValue !== null && !isGameOver) {
            setTimeout(() => {
                placeRandomDie();
            }, 1500);
        }
    }, [turn, rolledValue, isGameOver]);

    return (

        <div className="dice-game">
            <div className="game-board">
                <div className='1'>
                    {turn === 1 && (
                        <div className="turn-indicator">
                            <h4>Es el turno del jefe...</h4>
                            {tempValue ? <Die value={tempValue} /> : rolledValue && <Die value={rolledValue} />} {/* El valor lanzado se muestra como un dado */}
                        </div>
                    )}
                </div>

                <div className='2'>
                    {renderBoard(playerBoards[1], false)}
                </div>

                <div className='3'>
                    <div className="player-info">
                        <h3>Jefe</h3>
                        <div className="scores">
                            <h3>{player2Score}</h3>
                        </div>
                    </div>
                </div>

                <div className='4'>
                    <div className="player-info">
                        <h3>{playerName}</h3>
                        <div className="scores">
                            <h3>{player1Score}</h3>
                        </div>
                        {/* poner imagen solo si hay uploadresult */}
                        {uploadResult && uploadResult?.uploadInfo?.secure_url && (
                            <AdvancedImage
                                style={{ borderRadius: '50%' }}
                                cldImg={cld.image(uploadResult.uploadInfo.public_id)
                                    .resize(
                                        Resize.thumbnail()  // Redimensionar a un thumbnail (miniatura)
                                            .width(150)
                                            .height(150)
                                            .gravity(focusOn(face()))  // Enfocar en el rostro
                                    )

                                }
                                alt="Face Focus with Rounded Corners"
                            />
                        )}
                    </div>
                </div>

                <div className='5'>
                    {renderBoard(playerBoards[0], true)}
                </div>

                <div className='6'>
                    {turn === 0 && (
                        <div className="turn-indicator">
                            <h4>Es tu turno!</h4>
                            <button onClick={rollDice} disabled={rolledValue !== null || isGameOver}>
                                Lanzar Dado
                            </button>
                            {tempValue ? <Die value={tempValue} /> : rolledValue && <Die value={rolledValue} />}
                        </div>
                    )}
                </div>
            </div>
            {isGameOver && (
                <div className="game-controls">
                    <h2>{player1Score > player2Score ? `Ganaste!` : "Perdiste!"}</h2>

                    <button onClick={() => setPlayerBoards([initialBoard(), initialBoard()])}>
                        Jugar de nuevo
                    </button>
                    <button onClick={() => setIsWinner(player1Score > player2Score)}>
                        Terminar juego
                    </button>
                </div>
            )}
        </div>
    );
}
