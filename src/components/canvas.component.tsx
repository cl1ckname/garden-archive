import { Stage } from "@inlet/react-pixi";
import React from "react";
import { Tree } from "./geometric/tree.component"
import Viewport from "./viewport.component";

export interface RenderParams {
	viewport: number
	drawSquares: number
	drawTriangles: number
}
export interface DrawParams {
	x: number
	y: number
	rootSize: number
	depth: number
	angle: number
	colorFunction: number
	branchLong: number
}
export interface CanvasProps {
	treeParams: DrawParams
	renderProps: RenderParams
}


export const TreeCanvas: React.FC<CanvasProps> = (props: CanvasProps) => {
	const canvas = (!!props.renderProps.viewport) ? <Viewport width={window.innerWidth} height={window.innerHeight}>
														<Tree drawParams={props.treeParams} renderParams={props.renderProps} />
													</Viewport> : <Tree drawParams={props.treeParams} renderParams={props.renderProps} />
	return <Stage options={{ backgroundAlpha: 0 }}
		width={window.innerWidth}
		height={window.innerHeight}>
		{canvas}
	</Stage>
}
