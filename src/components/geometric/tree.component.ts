import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { figure, makeFigures, squareThroughtCoordinates } from "../../services/geometry"
import { DrawParams, RenderParams } from "../canvas.component"


export interface TreeProps {
    drawParams: DrawParams
    renderParams: RenderParams
}

// export const Tree = PixiComponent<TreeProps, Graphics>('Tree', {
//     create: () => new Graphics(),
//     applyProps: (ins, _, props) => {
//         const t1 = performance.now()
//         const { x, y, depth, angle, rootSize, colorFunction } = props.drawParams
//         const { viewport } = props.renderParams
//         const getColor =  ColorCollection[colorFunction].func

//         const leafs: Square[] = [Square.build({x, y, size: rootSize, depth, number: 1, angle: 0})]
//         const nodes: Triangle[] = []

//         ins.clear()
//         for (let i = 0; i < depth; i++) {
//             while (leafs.length > 0) {
//                 nodes.push(leafs[0].getNextTriangle(angle))
//                 leafs[0].draw(ins, getColor)
//                 leafs.splice(0, 1)
//             }

//             while (nodes.length > 0){
//                 const node = nodes[0]
//                 const lSquare = node.getLeftSquare()
//                 const rSquare = node.getRightSquare()
//                 if (!!viewport || lSquare.size > 2)
//                     leafs.push(lSquare)
//                 if (!!viewport || rSquare.size > 2)
//                     leafs.push(rSquare)
//                 node.draw(ins, getColor)
//                 nodes.splice(0,1)
//             }

//         }
//         const t2 = performance.now()
//         console.log(t2-t1)
//     }
// })

export const Tree = PixiComponent<TreeProps, Graphics>('Tree', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        const t1 = performance.now()
        const { x, y, depth, angle, rootSize, colorFunction } = props.drawParams
        const { viewport } = props.renderParams
        const getColor =  ColorCollection[colorFunction].func

        ins.clear()
        // const drawFigure = makeDrawer(ins, getColor)
        const [triangle, square] = makeFigures(angle, ins, getColor)
        square(squareThroughtCoordinates(x, y, rootSize, 1), depth)

        const t2 = performance.now()
        console.log(t2-t1)
    }
})