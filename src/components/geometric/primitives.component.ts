import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { Square, Triangle } from "../../services/geometry"
import { CanvasProps } from "../canvas.component"


interface RectangleProps {
    square: Square
    color: number
}

interface TriangleProps {
    triangle: Triangle
    color: number
}

export const SquareFigure = PixiComponent<RectangleProps, Graphics>('Rectangle', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        ins.clear()
        ins.beginFill(props.color)
        ins.moveTo(props.square.points[0].x, props.square.points[0].y)
        for (const p of props.square.points) {
            ins.lineTo(p.x, p.y)
        }
        ins.lineTo(props.square.points[0].x, props.square.points[0].y)
        ins.endFill()
    },
})

export const TriangleFigure = PixiComponent<TriangleProps, Graphics>('Triangle', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        ins.clear()
        ins.beginFill(props.color)
        ins.moveTo(props.triangle.points[0].x, props.triangle.points[0].y)
        for (const p of props.triangle.points) {
            ins.lineTo(p.x, p.y)
        }
        ins.endFill()
    },
})

export const Tree = PixiComponent<CanvasProps, Graphics>('Tree', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
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

        ins.clear()
        for (const branch of branches) {
            ins.beginFill(0x99AA9)
            ins.moveTo(branch.points[0].x, branch.points[0].y)
            for (const p of branch.points) {
                ins.lineTo(p.x, p.y)
            }
            ins.lineTo(branch.points[0].x, branch.points[0].y)
            ins.endFill()
        }
        for (const node of nodes) {
            ins.beginFill(0x99ff99)
            ins.moveTo(node.points[0].x, node.points[0].y)
            for (const p of node.points) {
                ins.lineTo(p.x, p.y)
            }
            ins.endFill()
        }

    }
})