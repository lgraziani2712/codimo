/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

export const engine = {
  errors: {
    MazeExitError: {
      image: 'https://emojipedia-us.s3.amazonaws.com/cache/f0/0d/f00d2203df672536d79b73d5c6ac1ada.png',
      message: 'El número solo tiene fuerzas para saltar cuando llega a una salida',
      title: '🤖 Error: no se pudo saltar 🤖',
    },
    MazePathError: {
      image: 'http://www.sherv.net/cm/emoticons/yellow-face/brick-hitting-face-smiley-emoticon.png',
      message: 'La dirección que intenta ir el número es incorrecta',
      title: '🙅 Camino no válido 🙅',
    },
    MazePathOverflowError: {
      // eslint-disable-next-line max-len
      message: 'Diste un paso de más y, en vez de saltar, ¡el número se cayó del laberinto! El pobre cayó en las profundidades del abismo, jamás podrá volver... a no ser que...',
      title: '😱 ¡Oh no! 😱',
    },
    MazeStarvationError: {
      image: 'https://emojipedia-us.s3.amazonaws.com/cache/d7/1f/d71f5406d26f4976837f97271c82c979.png',
      message: 'El número jamás saltó hacia la recta numérica. Estará perdido en el laberinto por toda la eternidad 😢',
      title: '💤💤💤',
    },
    MazeWrongExitError: {
      message: '¿El número es más grande que el de su izquierda y más chico que el de su derecha?',
      title: '👻 Parece que el número se equivocó de lugar 👻',
    },
  },
};

export const menu = {};
