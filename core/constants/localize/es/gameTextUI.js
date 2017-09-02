/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import CompleteURL from '../../images/complete.gif';

export default {
  accept: 'Aceptar',
  loadingMessages: [
    'Armando la línea numérica',
    'Cazando números salvajes',
    'Levantando los muros del laberinto',
    'Pintando las paredes',
    'Dibujando los bloques',
  ],
  successMessage: {
    imageUrl: CompleteURL,
    title: '¡NIVEL COMPLETADO!',
    confirmButtonText: 'IR AL SIGUIENTE NIVEL',
  },
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
};
