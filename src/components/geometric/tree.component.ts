import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { Square, Triangle } from "../../services/geometry"
import { CanvasProps } from "../canvas.component"


export const Tree = PixiComponent<CanvasProps, Graphics>('Tree', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        const { x, y, depth, angle, rootSize } = props
        const leafs: Square[] = [Square.build(x, y, rootSize, 0)]
        const branches: Square[] = []
        const nodes: Triangle[] = []
        const newNodes: Triangle[] = []

        for (let i = 0; i < depth; i++) {
            for (const leaf of leafs){
                newNodes.push(leaf.getNextTriangle(angle))
            }
            branches.push(...leafs)
            leafs.splice(0, leafs.length)
            for (const node of newNodes){
                const lSquare = node.getLeftSquare()
                const rSquare = node.getRightSquare()
                if (lSquare.size > 1)
                    leafs.push(lSquare)
                if (rSquare.size > 1)
                    leafs.push(rSquare)
            }
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