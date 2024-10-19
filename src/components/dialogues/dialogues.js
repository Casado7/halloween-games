const dialogues = {
    0: { // Inicio
        text: 'Te despiertas sobresaltado en una habitación oscura y húmeda. No recuerdas nada. Al intentar levantarte, un dolor agudo te atraviesa la espalda. ¿Qué ha pasado?',
        options: [
            { option: 'Intentar recordar', nextIndex: 1 },
            { option: 'Explorar la habitación', nextIndex: 2 }
        ]
    },
    1: { // Intentar recordar
        text: 'Cierras los ojos y tratas de concentrarte, pero tu mente está en blanco. De repente, escuchas un ruido lejano...',
        nextIndex: 3 // Conecta con el nodo donde escucha el ruido
    },
    2: { // Explorar la habitación
        text: 'Te levantas con cuidado y empiezas a explorar la habitación. Está vacía, salvo por una pequeña ventana que deja pasar un débil rayo de luz. Al acercarte, ves una sombra moverse en la oscuridad...',
        nextIndex: 4 // Conecta con el nodo donde ve la sombra
    },
    3: { // Escucha un ruido
        text: 'El ruido se acerca cada vez más. Decides seguirlo. Al final del pasillo, encuentras una puerta entreabierta...',
        nextIndex: 5 // Conecta con el siguiente nodo
    },
    4: { // Ve una sombra
        text: 'La sombra se mueve rápidamente y desaparece detrás de una puerta. ¿La sigues?',
        options: [
            { option: 'Sí', nextIndex: 5 },
            { option: 'No', nextIndex: 6 }
        ]
    },
    5: { // Entra en la habitación desconocida
        text: 'Al abrir la puerta, una figura se gira hacia ti. "¡Ah, por fin te despiertas!", exclama una voz profunda y amenazadora.',
        nextIndex: 7 // Conecta con tus nodos existentes
    },
    6: { // No sigue la sombra
        text: 'Decides no seguir a la sombra y buscas otra salida. Al final del pasillo, encuentras una puerta entreabierta...',
        nextIndex: 5 // Conecta con el nodo donde escucha el ruido
    },
    7: { // Encuentro con el jefe
        text: 'La figura se acerca y te mira fijamente.',
        options: [
            { option: '¿Quién eres?', nextIndex: 8 },
            { option: '¿Dónde estoy?', nextIndex: 9 }
        ]
    },
    8: { // Pregunta quién es
        text: 'No importa quien soy.',
        nextIndex: 9 // Conecta con el siguiente nodo
    },
    9: { // Pregunta dónde está
        text: '¿Dónde crees que estás?',
        options: [
            { option: 'No lo sé', nextIndex: 10 },
            { option: 'En una pesadilla', nextIndex: 10 },
            { option: 'En un calabozo', nextIndex: 10 }
        ]
    },
    10: { // Respuesta a la ubicación
        text: '¿Cual es tu nombre?',
        nextIndex: 11 // Conecta con el siguiente nodo
    },
    11: { // Empezar el juego
        text: 'Vamos a jugar un juego. Si ganas, te dejaré ir. Si pierdes, te quedarás aquí para siempre.',
        options: [
            { option: 'De acuerdo', nextIndex: 12 },
            { option: 'No quiero jugar', nextIndex: 12 }
        ]
    },
    12: { // Aceptar el juego
        text: 'Muy bien. Empecemos...',
    }
  };

export default dialogues;