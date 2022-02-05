import { Stage } from "@inlet/react-pixi";
import React from "react";
import { canvasWrapStyle } from "../styles/canvas.style";
import { Square, Triangle } from "../services/geometry";
import { SquareFigure, TriangleFigure } from "../components/geometric/primitives.component"



export interface CanvasProps {
	x: number
	y: number
	rootSize: number
	depth: number
	angle: number
}

export const TreeCanvas: React.FC<CanvasProps> = (props: CanvasProps) => {
	const { x, y, depth, angle, rootSize } = props
	const leafs: Square[] = [Square.build(x, y, rootSize, 0)]
	const branches: Square[] = []
	const nodes: Triangle[] = []
	const newNodes: Triangle[] = []

	for (let i = 0; i < depth; i++) {
		for (const leaf of leafs)
			newNodes.push(leaf.getNextTriangle(angle))
		branches.push(...leafs)
		leafs.splice(0, leafs.length)
		for (const node of newNodes)
			leafs.push(node.getLeftSquare(), node.getRightSquare())
		nodes.push(...newNodes)
		newNodes.splice(0, newNodes.length)
	}
	return <div>
		<Stage options={{ backgroundAlpha: 0 }} width={window.innerWidth} height={window.innerHeight}>
			{branches.map(s => { return <SquareFigure square={s} color={0x99AA9} /> })}
			{nodes.map(t => { return <TriangleFigure triangle={t} color={0x99ff99} /> })}
		</Stage>
	</div>
}
