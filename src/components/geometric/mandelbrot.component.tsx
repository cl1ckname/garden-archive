import { useCallback } from "react"
import * as Pixi from "pixi.js"
import { MandelbrotSet } from "./shaders/MandelbrotSet"
import { Graphics } from "@inlet/react-pixi"
import { ColorCollection } from "../../services/colorFunctionCollection"

export interface MandelbrotProps {
	x: number,
	y: number,
	scale: number,
	colorFunc: number,
	n: number
}

function getColorList(props: MandelbrotProps) {
	const colorF = ColorCollection[props.colorFunc].func;
	const colors = [];
	for (let i = 0; i < 12; i++) {
		colors.push(colorF("primary", i, 12));
	}
	return colors;
}

export const Mandelbrot: React.FC<MandelbrotProps> = (props: MandelbrotProps) => {
	
	const draw = useCallback((g) => {
		const uniforms = {
			resol: [window.innerWidth, window.innerHeight],
			xx: props.x,
			yy: props.y,
			scale: props.scale,
			colors: getColorList(props),
		}
		const shad = new Pixi.Filter(undefined, MandelbrotSet, uniforms)
		g.clear()
		g.drawRect(0, 0, window.innerWidth, window.innerHeight)
		g.filters = [shad]
	}, [props])
	return <Graphics draw={draw} />;
}