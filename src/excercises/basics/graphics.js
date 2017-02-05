// @flow
import * as PIXI from 'pixi.js';

export default function graphics() {
	const size = {
		width: 800,
		height: 600,
	};
	const options = { antialias: true };
	const app = new PIXI.Application(size.width, size.height, options);
	const shape = {
		backgroundColor: 0xFF3300,
		line: {
			width: 4,
			color: 0xffd900,
			alpha: 1,
		},
		vertices: {
			start: { x: 50, y: 50 },
			first: { x: 250, y: 50 },
			second: { x: 100, y: 100 },
		},
	};
	const rectangle = {
		backgroundColor: 0xFF700B,
		line: {
			width: 2,
			color: 0xFF700B,
		},
		point: { x: 50, y: 250 },
		width: 120,
		height: 120,
	};
	const roundedRectangle = {
		line: {
			width: 2,
			color: 0xFF00FF,
		},
		background: {
			color: 0xFF00BB,
			alpha: 0.25,
		},
		point: { x: 150, y: 450 },
		width: 300,
		height: 100,
		round: 15,
	};
	const circle = {
		background: {
			color: 0xFFFF0B,
			alpha: 0.25,
		},
		point: { x: 470, y: 90 },
		radius: 60,
	};

	document.body.appendChild(app.view);

	const graphics = new PIXI.Graphics();

	// set a fill and line style
	graphics.beginFill(shape.backgroundColor);
	graphics.lineStyle(shape.line.width, shape.line.color, shape.line.alpha);

	// draw a shape
	graphics.moveTo(shape.vertices.start.x, shape.vertices.start.y);
	graphics.lineTo(shape.vertices.first.x, shape.vertices.first.y);
	graphics.lineTo(shape.vertices.second.x, shape.vertices.second.y);
	graphics.lineTo(shape.vertices.start.x, shape.vertices.start.y);
	graphics.endFill();

	// set a fill and a line style again and draw a rectangle
	graphics.lineStyle(rectangle.line.width, rectangle.line.color);
	graphics.beginFill(rectangle.backgroundColor);
	graphics.drawRect(rectangle.point.x, rectangle.point.y, rectangle.width, rectangle.height);

	// draw a rounded rectangle
	graphics.lineStyle(roundedRectangle.line.width, roundedRectangle.line.color);
	graphics.beginFill(roundedRectangle.background.color, roundedRectangle.background.alpha);
	graphics.drawRoundedRect(
		roundedRectangle.point.x,
		roundedRectangle.point.y,
		roundedRectangle.width,
		roundedRectangle.height,
		roundedRectangle.round,
	);
	graphics.endFill();

	// draw a circle, set the lineStyle to zero so the circle doesn't have an outline
	graphics.lineStyle();
	graphics.beginFill(circle.background.color, circle.background.alpha);
	graphics.drawCircle(circle.point.x, circle.point.y, circle.radius);
	graphics.endFill();

	app.stage.addChild(graphics);
}
