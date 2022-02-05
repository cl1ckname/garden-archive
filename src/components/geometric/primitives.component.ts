import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { Square, Triangle } from "../../services/geometry"


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