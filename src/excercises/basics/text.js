// @flow
import * as PIXI from 'pixi.js';

export default function text() {
	const size = {
		width: 800,
		height: 600,
	};
	const options = { backgroundColor: 0x1099bb };
	const app = new PIXI.Application(size.width, size.height, options);
	const DROP_SHADOW_ANGLE_DIV = 6;

	document.body.appendChild(app.view);

	const basicText = new PIXI.Text('Basic text in pixi');

	basicText.x = 30;
	basicText.y = 90;

	app.stage.addChild(basicText);

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

	app.stage.addChild(richText);
}
