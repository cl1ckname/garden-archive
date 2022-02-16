import { PixiComponent } from "@inlet/react-pixi";
import { Graphics } from "pixi.js";
import { Flare, Gradient, violetGrow } from "../../services/colorFunctionCollection";
import { AttractDrawProps } from "../canvas/attractCanvas.component";

export interface AttractProps {
    drawParams: AttractDrawProps
}


export const Attract = PixiComponent<AttractProps ,Graphics>('Attract', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        const points = props.drawParams.points
        ins.clear()
        ins.lineStyle({color: 0, width: 4})
        ins.moveTo(points[points.length-1].x, points[points.length - 1].y)
        // props.drawParams.points.map(p => {
        //     ins.lineTo(p.x, p.y)
        // })
        const current = {x: (points[0].x + points[1].x)/2, y: (points[0].y + points[1].y) / 2}
        ins.drawCircle(current.x, current.y, 3)
        let n;
        for (let i = 0; i < 500000; ++i) {
            n = Math.floor(Math.random() * 8)
            ins.lineStyle({color: violetGrow('primary', n, 8), width: 4})
            current.x = (current.x + 2 * points[n].x) / 3
            current.y = (current.y + 2 * points[n].y) / 3
            ins.drawCircle(current.x, current.y, 0.05)
            // ins.moveTo(current.x, current.y)
            // ins.lineTo(current.x+0.03, current.y)
        }
    }

})