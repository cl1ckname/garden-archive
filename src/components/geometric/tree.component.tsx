import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { figure, makeFigures, squareThroughtCoordinates } from "../../services/treeGeometry"
import { TreeDrawParams, TreeRenderParams } from "../canvas/treeCanvas.component"


export interface TreeProps {
    drawParams: TreeDrawParams
    renderParams: TreeRenderParams
}

export const Tree = PixiComponent<TreeProps, Graphics>('Tree', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        const t1 = performance.now()
        const { x, y, depth, angle, rootSize, colorFunction, branchLong, lineWidth } = props.drawParams
        const getColor =  ColorCollection[colorFunction].func

        ins.clear()
        const [triangle, square] = makeFigures(angle, ins, getColor, branchLong, lineWidth,props.renderParams)
        let leafs: figure[] = [squareThroughtCoordinates(x, y, rootSize, 1, ins, getColor, depth, branchLong, !!props.renderParams.fill, lineWidth)]
        let nodes: figure[] = []

        for (let i = 0; i < depth; i++) {
            leafs.forEach(leaf => {
                nodes.push(square(leaf))
            })
            leafs.length = 0
            nodes.forEach(node => {
                leafs.push(...triangle(node))
            })
            nodes.length = 0

        }


        const t2 = performance.now()
        console.log(t2-t1)
    }
})