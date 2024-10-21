const dialogues = {
    0: { // Inicio
        text: 'Te despiertas sobresaltado en una habitación oscura y húmeda. No recuerdas nada. Al intentar levantarte, un dolor agudo te atraviesa la espalda. ¿Qué ha pasado?',
        imagen: 'room',
        options: [
            { option: 'Intentar recordar quién eres', nextIndex: 1 },
            { option: 'Saltar Historia', nextIndex: 16 } // Opción para saltar si el jugador quiere omitir la historia
        ]
    },
    1: { // Intentar recordar quién eres
        text: 'Cierras los ojos e intentas recordar quién eres. Empiezan a aparecer destellos de tu pasado, pero tu mente está confundida. ¿Eras un mago, un caballero o algo más?',
        imagen: 'room',
        options: [
            { option: 'Mago', nextIndex: 1.1 },
            { option: 'Caballero', nextIndex: 1.2 },
            { option: 'Cazador', nextIndex: 1.3 }
        ]
    },
    1.1: { // Mago
        text: 'Eres un mago, un maestro de las artes arcanas. Tu vida ha estado dedicada al estudio de la magia y los secretos del universo.',
        imagen: 'room',
        nextIndex: 2 // Conecta con el nodo donde explora la habitación
    },
    1.2: { // Caballero
        text: 'Eres un caballero, un guerrero entrenado en combate y honor. Tu armadura te ha protegido en innumerables batallas.',
        imagen: 'room',
        nextIndex: 2 // Conecta con el nodo donde explora la habitación
    },
    1.3: { // Cazador
        text: 'Eres un cazador, un rastreador experto y un maestro del arco y la flecha. Tu habilidad para cazar bestias te ha llevado a lugares oscuros y peligrosos.',
        imagen: 'room',
        nextIndex: 2 // Conecta con el nodo donde explora la habitación
    },
    2: { // Explorar la habitación
        text: 'Te levantas con cuidado y empiezas a explorar la habitación. Está vacía, salvo por una pequeña ventana que deja pasar un débil rayo de luz. Al acercarte, ves una sombra moverse en la oscuridad...',
        imagen: 'room',
        nextIndex: 3 // Conecta con el nodo donde escucha un ruido o ve una sombra
    },
    3: { // Escucha un ruido
        text: 'El ruido se acerca cada vez más. Decides seguirlo. Al final del pasillo, encuentras una puerta entreabierta...',
        imagen: 'hallway',
        nextIndex: 4 // Conecta con el siguiente nodo
    },
    4: { // Ve una sombra
        text: 'La sombra se mueve rápidamente y desaparece detrás de una puerta. ¿La sigues?',
        imagen: 'hallway',
        options: [
            { option: 'Sí', nextIndex: 5 },
            { option: 'No', nextIndex: 6 }
        ]
    },
    5: { // Entra en la habitación desconocida
        text: 'Al abrir la puerta, una figura se gira hacia ti. "¡Ah, por fin te despiertas!", exclama una voz profunda y amenazadora.',
        imagen: 'boss',
        nextIndex: 7 // Conecta con el siguiente nodo
    },
    6: { // No sigue la sombra
        text: 'Decides no seguir a la sombra y buscas otra salida. Al final del pasillo, encuentras una puerta entreabierta...',
        imagen: 'hallway',
        nextIndex: 5 // Conecta con el nodo donde escucha el ruido
    },
    7: { // Encuentro con el jefe
        text: 'La figura se acerca y te mira fijamente, su rostro apenas iluminado. Su apariencia es aterradora. Tu mente comienza a formular una pregunta inevitable: "¿Qué es esto?".',
        imagen: 'boss',
        options: [
            { option: 'Es un zombie', nextIndex: 8 },
            { option: 'Es un esqueleto', nextIndex: 8 },
            { option: 'Es un demonio', nextIndex: 8 }
        ]
    },
    8: { // Respuesta del jefe
        text: 'La figura sonríe levemente.',
        imagen: 'boss',
        nextIndex: 9 // Conecta con el siguiente nodo
    },
    9: { // Pregunta el nombre
        text: '¿Cuál es tu nombre?',
        imagen: 'boss',
        input: 'name',  
        type: 'string',
        nextIndex: 10 // Conecta con el siguiente nodo
    },
    10: { // Empezar el juego
        text: 'Vamos a jugar un juego...',
        imagen: 'boss',
        options: [
            { option: 'De acuerdo', nextIndex: 11 },
            { option: 'No quiero jugar', nextIndex: 11 }
        ]
    },
    11: { // Reglas del juego
        text: 'Cada jugador juega en una cuadrícula. Cada vez que tires el dado, debes colocarlo en una de tus columnas.',
        imagen: 'boss',
        nextIndex: 12 // Conecta con el siguiente nodo
    },
    12: { 
        text: 'Si logras alinear dos o tres números iguales en una columna, su valor se multiplica exponencialmente.',
        imagen: 'boss',
        nextIndex: 13 // Conecta con el siguiente nodo
    },
    13: { 
        text: 'Sin embargo, si tu oponente lanza un dado del mismo valor en la misma columna, se eliminará cualquier número que coincida.',
        imagen: 'boss',
        nextIndex: 14 // Conecta con el siguiente nodo
    },
    14: { // Aceptar el juego
        text: 'Muy bien. Empecemos...',
        imagen: 'table',
        startGame: true
    },
};

export default dialogues;
