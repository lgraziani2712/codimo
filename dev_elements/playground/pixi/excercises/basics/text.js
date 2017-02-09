// @flow
import * as PIXI from 'pixi.js';

type Props = {
	app: Object,
};
export default function text({ app }: Props) {
	app.stage.addChild(generateBasicText());
	app.stage.addChild(generateRichText());
}

function generateBasicText() {
	const basicText = new PIXI.Text('Basic text in pixi');

	basicText.x = 30;
	basicText.y = 90;

	return basicText;
}

function generateRichText() {
	const DROP_SHADOW_ANGLE_DIV = 6;
	const style = new PIXI.TextStyle({
		fontFamily: 'Arial',
		fontSize: 36,
		fontStyle: 'italic',
		fontWeight: 'bold',
		fill: ['#ffffff', '#00ff99'], // gradient
		stroke: '#4a1850',
		strokeThickness: 5,
		dropShadow: true,
		dropShadowColor: '#000000',
		dropShadowBlur: 4,
		dropShadowAngle: Math.PI / DROP_SHADOW_ANGLE_DIV,
		dropShadowDistance: 6,
		wordWrap: true,
		wordWrapWidth: 440,
	});

	const richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);

	richText.x = 30;
	richText.y = 180;

	return richText;
}
