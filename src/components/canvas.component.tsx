import { Stage } from "@inlet/react-pixi";
import React from "react";
import { Tree } from "./geometric/tree.component"
import { ColorFunction, green, standart, violetGrow } from "../services/colorFunctionCollection"

export interface CanvasProps {
	x: number
	y: number
	rootSize: number
	depth: number
	angle: number
	colorFunction: number
}

export const TreeCanvas: React.FC<CanvasProps> = (props: CanvasProps) => {
	return <Stage options={{ backgroundAlpha: 0 }} width={window.innerWidth} height={window.innerHeight}>
		<Tree options={props}/>
	</Stage>
}
