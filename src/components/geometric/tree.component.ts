import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { makeFigures, squareThroughtCoordinates } from "../../services/treeGeometry"
import { DrawParams, RenderParams } from "../canvas.component"


export interface TreeProps {
    drawParams: DrawParams
    renderParams: RenderParams
}

export const Tree = PixiComponent<TreeProps, Graphics>('Tree', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        const t1 = performance.now()
        const { x, y, depth, angle, rootSize, colorFunction, branchLong } = props.drawParams
        const getColor =  ColorCollection[colorFunction].func

        ins.clear()
        const [, square] = makeFigures(angle, ins, getColor, branchLong, props.renderParams)
        square(squareThroughtCoordinates(x, y, rootSize, 1, ins, getColor, depth, branchLong), depth)

        const t2 = performance.now()
        console.log(t2-t1)
    }
})