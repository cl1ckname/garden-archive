import { Stage } from "@inlet/react-pixi";
import React from "react";
import { Tree } from "./geometric/tree.component"



export interface CanvasProps {
	x: number
	y: number
	rootSize: number
	depth: number
	angle: number
}

export const TreeCanvas: React.FC<CanvasProps> = (props: CanvasProps) => {
	return <Stage options={{ backgroundAlpha: 0 }} width={window.innerWidth} height={window.innerHeight}>
		<Tree angle={props.angle} depth={props.depth} rootSize={props.rootSize} x={props.x} y={props.y} />
	</Stage>
}
