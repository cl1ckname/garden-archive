import { Stage } from "@inlet/react-pixi";
import React from "react";
import { DragonCurve } from "./geometric/dragon.component";
import { Tree } from "./geometric/tree.component"
import Viewport from "./viewport.component";

export interface TreeRenderParams {
	viewport: number
	drawSquares: number
	drawTriangles: number
}
export interface TreeDrawParams {
	x: number
	y: number
	rootSize: number
	depth: number
	angle: number
	colorFunction: number
	branchLong: number
}
export interface TreeCanvasProps {
	treeParams: TreeDrawParams
	renderProps: TreeRenderParams
}


export const TreeCanvas: React.FC<TreeCanvasProps> = (props: TreeCanvasProps) => {
	const canvas = (!!props.renderProps.viewport) ? <Viewport width={window.innerWidth} height={window.innerHeight}>
														<Tree drawParams={props.treeParams} renderParams={props.renderProps} />
													</Viewport> : <Tree drawParams={props.treeParams} renderParams={props.renderProps} />
	return <Stage options={{ backgroundAlpha: 0 }}
		width={window.innerWidth}
		height={window.innerHeight}>
		{canvas}
	</Stage>

}
