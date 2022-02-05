import { PixiComponent, Stage } from "@inlet/react-pixi";
import { Graphics } from "pixi.js";
import React from "react";
import { canvas } from "../styles/canvas.style";
import { Point, Square, Triangle } from "../services/geometry";

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

interface RectangleProps {
  square: Square
  color: number
}

interface TriangleProps {
	triangle: Triangle
	color: number
}
  
const SquareFigure = PixiComponent<RectangleProps, Graphics>('Rectangle', {
  create: () => new Graphics(),
  applyProps: (ins, _, props) => {
    ins.beginFill(props.color)
    ins.moveTo(props.square.points[0].x, props.square.points[0].y)
	for (const p of props.square.points){
		ins.lineTo(p.x,p.y)
	}
	ins.lineTo(props.square.points[0].x, props.square.points[0].y)
    ins.endFill()
  },
})

const TriangleFigure = PixiComponent<TriangleProps, Graphics>('Triangle', {
	create: () => new Graphics(),
	applyProps: (ins, _, props) => {
		ins.beginFill(props.color)
		ins.moveTo(props.triangle.points[0].x, props.triangle.points[0].y)
		for (const p of props.triangle.points){
			ins.lineTo(p.x,p.y)
	}
    ins.endFill()
	},
})



export class TreeCanvas extends React.Component {
    canvasSize = 900
	iters = 4
	angle = Math.PI / 6

	leafs: Square[] = [Square.build(400, 800, 100, 0)]
	branches: Square[] = []
	nodes: Triangle[] = []
	newNodes: Triangle[] = []

    render() {

		for (let i = 0; i < this.iters; i++) {
			for (const leaf of this.leafs)
				this.newNodes.push(leaf.getNextTriangle(this.angle))
			this.branches = this.branches.concat(this.leafs)
			this.leafs = []
			for (const node of this.newNodes)
				this.leafs.push(node.getLeftSquare(), node.getRightSquare())
			this.nodes = this.nodes.concat(this.newNodes)
			this.newNodes = []
		}
        return <div style={canvas}>
          <Stage options={{backgroundAlpha: 0}} width={this.canvasSize} height={this.canvasSize}>
			{this.branches.map(s => {return <SquareFigure square={s} color={0x99AA9}/>})}
			{this.nodes.map(t => {return <TriangleFigure triangle={t} color={0x99ff99}/>})}
          </Stage>
        </div>
    }
}