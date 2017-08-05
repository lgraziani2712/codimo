/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import parseEmoji from 'core/helpers/parseEmoji';

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
    confirmButtonText: 'Ir al siguiente nivel',
    text: '¡Nivel completado!',
    title: parseEmoji('🎉'),
    type: 'success',
  },
};
