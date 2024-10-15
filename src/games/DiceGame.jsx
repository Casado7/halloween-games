import React, { useState } from 'react';
import './DiceGame.css';

const initialBoard = () => Array(3).fill(Array(3).fill(null));

export default function DiceGame() {
    const [playerBoards, setPlayerBoards] = useState([initialBoard(), initialBoard()]);
    const [turn, setTurn] = useState(0); // 0 para el jugador 1, 1 para el jugador 2
    const [rolledValue, setRolledValue] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);

    // Función para tirar el dado
    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setRolledValue(roll);
    };

    // Colocar el dado en la primera celda vacía de la columna del tablero del jugador
    const placeDie = (col) => {
        if (rolledValue) {
            const board = playerBoards[turn].map(row => [...row]);
            let placed = false;

            // Encontrar la primera celda vacía en la columna, desde la fila inferior hacia arriba
            for (let row = 2; row >= 0; row--) {
                if (board[row][col] === null) {
                    board[row][col] = rolledValue;
                    placed = true;
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
        }
    };

    // Verificar si el tablero está lleno para finalizar el juego
    const checkGameOver = (boards) => {
        const isFull = boards.some(board =>
            board.every(row => row.every(cell => cell !== null))
        );
        if (isFull) setIsGameOver(true);
    };


    // Calcular la puntuación del tablero
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


    // Renderizar el tablero
    const renderBoard = (board, player) => (
        <div className="board">
            <h3>Player {player + 1}</h3>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} className="cell" onClick={() => placeDie(colIndex)}>
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    const player1Score = calculateScore(playerBoards[0]);
    const player2Score = calculateScore(playerBoards[1]);

    return (
        <div className="dice-game">
            <h1>Dice Game</h1>
            <div className="game-board">
                {renderBoard(playerBoards[0], 0)}
                {renderBoard(playerBoards[1], 1)}
            </div>

            <div className="info">
                <h2>{isGameOver ? "Game Over!" : `Player ${turn + 1}'s Turn`}</h2>
                <button onClick={rollDice} disabled={rolledValue !== null || isGameOver}>
                    Roll Dice
                </button>
                {rolledValue && <h3>Rolled: {rolledValue}</h3>}
                <div className="scores">
                    <h3>Player 1 Score: {player1Score}</h3>
                    <h3>Player 2 Score: {player2Score}</h3>
                </div>
            </div>
        </div>
    );
}
