import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { generateN } from "../../services/dragonLSystem"
import { DragonDrawParams } from "../canvas/dragonCanvas.component"

export interface DragonProps {
    drawParams: DragonDrawParams
}

export const DragonCurve = PixiComponent<DragonProps, Graphics>('Dragon', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        const { width, angle, depth, colorFunction} = props.drawParams

        const getColor = ColorCollection[colorFunction].func
        let l = generateN(depth)
        let [x, y] = [window.innerWidth / 2, window.innerHeight / 2]
        let currentAngle = 0
        let len = 100 / depth
        ins.clear()
        ins.moveTo(x,y)
        for (let i = l.bitLength; i > 0 ; i--) {
            ins.lineStyle({color: getColor('primary', i, l.bitLength), width: width, alignment: 1})
            x = x + len * Math.cos(currentAngle);
            y = y + len * Math.sin(currentAngle);
            ins.lineTo(x,y);
            currentAngle += l.getBit(i) ? angle : -angle;
        }
        
    }
})