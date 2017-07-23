/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { parseEmoji } from 'helpers/general';

export const general = {
  confirmButton: 'Aceptar',
};
export const blocklyLocals = {
  actions: {
    play: '▶ Ejecutá!',
    reset: '⏹ Reseteá!',
  },
};

export const engine = {
  errors: {
    MazeExitError: {
      confirmButtonText: general.confirmButton,
      imageUrl: '/images/errors/MazeExitError.png',
      text: 'El número solo tiene fuerzas para saltar cuando llega a una salida',
      title: parseEmoji('🤖 Error: no se pudo saltar 🤖'),
    },
    MazePathError: {
      confirmButtonText: general.confirmButton,
      imageUrl: '/core/images/errors/HasHitAWall.png',
      text: 'La dirección que intenta ir el número es incorrecta',
      title: parseEmoji('🙅 Camino no válido 🙅‍♂️'),
    },
    MazePathOverflowError: {
      confirmButtonText: general.confirmButton,
      // eslint-disable-next-line max-len
      text: 'Diste un paso de más y, en vez de saltar, ¡el número se cayó del laberinto! El pobre cayó en las profundidades del abismo, jamás podrá volver... a no ser que...',
      title: parseEmoji('😱 ¡Oh no! 😱'),
    },
    MazeStarvationError: {
      confirmButtonText: general.confirmButton,
      imageUrl: '/images/errors/MazeStarvationError.png',
      html: parseEmoji('Estará perdido en el laberinto por toda la eternidad 😢'),
      title: 'El número jamás saltó hacia la recta numérica',
    },
    MazeWrongExitError: {
      confirmButtonText: general.confirmButton,
      text: '¿El número es más grande que el de su izquierda y más chico que el de su derecha?',
      title: parseEmoji('👻 El número se equivocó de lugar 👻'),
    },
  },
};

export const game = {
  loading: [
    'Armando la línea numérica',
    'Cazando números salvajes',
    'Levantando los muros del laberinto',
    'Pintando las paredes',
    'Dibujando los bloques',
  ],
  exercise: 'Ejercicio',
  levels: [
    'Primer',
    'Segundo',
    'Tercer',
    'Cuarto',
  ],
  difficulty: {
    easy: 'Nivel inicial',
    normal: 'Nivel intermedio',
    hard: 'Nivel avanzado',
  },
  success: {
    confirmButtonText: 'Ir al siguiente nivel',
    text: '¡Nivel completado!',
    title: parseEmoji('🎉'),
    type: 'success',
  },
};
