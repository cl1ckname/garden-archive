import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { Square, Triangle } from "../../services/geometry"


export interface TreeProps {
    options: {
        x: number
        y: number
        rootSize: number
        depth: number
        angle: number
        colorFunction: number
    }
}

export const Tree = PixiComponent<TreeProps, Graphics>('Tree', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        const { x, y, depth, angle, rootSize } = props.options
        const leafs: Square[] = [Square.build({x, y, size: rootSize, depth, number: 1, angle: 0})]
        const nodes: Triangle[] = []

        ins.clear()
        for (let i = 0; i < depth; i++) {
            while (leafs.length > 0) {
                nodes.push(leafs[0].getNextTriangle(angle))
                leafs[0].draw(ins, ColorCollection[props.options.colorFunction].func)
                leafs.splice(0, 1)
            }

            while (nodes.length > 0){
                const node = nodes[0]
                const lSquare = node.getLeftSquare()
                const rSquare = node.getRightSquare()
                if (lSquare.size > 2)
                    leafs.push(lSquare)
                if (rSquare.size > 2)
                    leafs.push(rSquare)
                node.draw(ins, ColorCollection[props.options.colorFunction].func)
                nodes.splice(0,1)
            }

        }

    }
})