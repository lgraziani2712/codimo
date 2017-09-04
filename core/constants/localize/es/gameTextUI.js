/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import CompleteURL from '../../images/complete.gif';

const difficulty = {
  easy: 'NIVEL INICIAL',
  normal: 'NIVEL INTERMEDIO',
  hard: 'NIVEL AVANZADO',
};

export default {
  accept: 'ACEPTAR',
  loadingMessages: [
    'ARMANDO LA LÍNEA NUMÉRICA',
    'CAZANDO NÚMEROS SALVAJES',
    'LEVANTANDO LOS MUROS DEL LABERINTO',
    'PINTANDO LAS PAREDES',
    'DIBUJANDO LOS BLOQUES',
  ],
  successMessage: {
    confirmButtonText: 'IR AL SIGUIENTE NIVEL',
    imageUrl: CompleteURL,
    title: '¡NIVEL COMPLETADO!',
  },
  endGameMessage: {
    title: '¡GENIAL!',
    text: (actualDifficulty: string) => (
      `¡TERMINASTE TODOS LOS EJERCICIOS DEL ${difficulty[actualDifficulty]}!`
    ),
  },
  exercise: 'EJERCICIO',
  levels: (level: string | number) => `Nº ${level}`,
  difficulty,
};
