// @flow

const IMAGES = '/images/';
const SHADERS = '/shaders/';
const TWO_DIGITS = 10;

export const BUNNY_IMG = `${IMAGES}bunny.png`;
export const BKG_GRASS_IMG = `${IMAGES}bkg-grass.jpg`;
export const P2_IMG = `${IMAGES}p2.jpeg`;

export const FIGHTER_FRAME_SIZE = 30;
export const FIGHTER_SPRITE = `${IMAGES}fighter.json`;
export const getFighterSequence = (i: number) => `rollSequence00${i < TWO_DIGITS ? `0${i}` : i}.png`;

export const CUSTOM_SHADER_SHD = `${SHADERS}custom-shader.frag`;
