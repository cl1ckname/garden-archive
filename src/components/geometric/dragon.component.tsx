import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { ColorCollection, Flare, Gradient } from "../../services/colorFunctionCollection"
import { generateN } from "../../services/dragonLSystem"

export interface DragonProps {
    n: number
}

export const DragonCurve = PixiComponent<DragonProps, Graphics>('Tree', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        let l = generateN(props.n)
        let [x, y] = [window.innerWidth / 2, window.innerHeight / 2]
        let angle = 0
        let len = 100 / props.n
        let colorFunc = ColorCollection[0].func
        ins.clear()
        ins.moveTo(x,y)
        for (let i = l.bitLength; i > 0 ; i--) {
            ins.lineStyle({color: colorFunc('square', i, Math.log2(l.bitLength)), width: 1, alignment: 0.5})
            x = x + len * Math.cos(angle);
            y = y + len * Math.sin(angle);
            ins.lineTo(x,y);
            angle += l.getBit(i) ? Math.PI / 2 : -(Math.PI / 2);
        }
        
    }
})