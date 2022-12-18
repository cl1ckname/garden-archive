import { Stage } from "@inlet/react-pixi";
import React from "react";
import { Tree } from "../geometric/tree.component";
import Viewport from "../viewport.component";
import { useSelector } from 'react-redux'
import { RootState } from "../../store";

export interface TreeRenderParams {
	viewport: boolean
	drawSquares: boolean
	drawTriangles: boolean
	fill: boolean
}
export interface TreeDrawParams {
	x: number
	y: number
	rootSize: number
	depth: number
	angle: number
	colorFunction: number
	branchLong: number,
	lineWidth: number
}

export interface TreeCanvasProps {
	drawProps: TreeDrawParams,
	renderProps: TreeRenderParams
}


export const TreeCanvas: React.FC = () => {
	const treeProps = useSelector((state: RootState) => state.tree)
	const canvas = (!!treeProps.renderProps.viewport) ? <Viewport width={window.innerWidth} height={window.innerHeight}>
														<Tree drawParams={treeProps.drawProps} renderParams={treeProps.renderProps} />
													</Viewport> : <Tree drawParams={treeProps.drawProps} renderParams={treeProps.renderProps} />
	return <Stage options={{ backgroundAlpha: 0 }}
		width={window.innerWidth}
		height={window.innerHeight}>
		{canvas}
	</Stage>

}
