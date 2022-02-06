import { Container, Stage } from "@inlet/react-pixi";
import React from "react";
import { Tree } from "./geometric/tree.component"
import Viewport from "./viewport.component";

export interface CanvasProps {
	x: number
	y: number
	rootSize: number
	depth: number
	angle: number
	colorFunction: number
}

export const TreeCanvas: React.FC<CanvasProps> = (props: CanvasProps) => {
	const mouseHandler = (event: React.MouseEvent<HTMLCanvasElement>) => {
		console.log(event.type, event.clientX, event.clientY, event.button)
		
	}

	return <Stage options={{ backgroundAlpha: 0 }} 
				  width={window.innerWidth} 
				  height={window.innerHeight}>
		<Viewport width={window.innerWidth} height={window.innerHeight}>
			<Tree options={props}/>
		</Viewport>
	</Stage>
}
