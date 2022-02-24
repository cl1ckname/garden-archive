import { PixiComponent } from "@inlet/react-pixi";
import { Application, Graphics } from "pixi.js";
import { ColorCollection } from "../../services/colorFunctionCollection";
import { AttractDrawProps } from "../canvas/attractCanvas.component";

export interface AttractProps {
    drawParams: AttractDrawProps
    app: Application
}


export const Attract = PixiComponent<AttractProps ,Graphics>('Attract', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        let n = 0;
        let to;
        const points = props.drawParams.points
        const {iters, points_number, ratio, colorFunction, speed, size} = props.drawParams
        const getColor = ColorCollection[colorFunction].func
        const expSize = Math.pow(10,size)
        ins.clear()
        const animate = () => {
            for (let i = 0; i < speed; ++i)
            {
                to = Math.floor(Math.random() * points_number)
                ins.lineStyle({color: getColor('primary', to, points_number), width: expSize})
                current.x = current.x * (1 - ratio) + points[to].x * ratio
                current.y = current.y * (1 - ratio) + points[to].y * ratio
                ins.drawCircle(current.x, current.y, 0.05)
            }
            props.app.renderer.render(props.app.stage)
            console.log(Math.ceil(n / iters * 100)+'%')
            n += speed
            if (n >= iters)
                props.app.ticker.remove(animate)
        }
        ins.moveTo(points[points.length-1].x, points[points.length - 1].y)
        const current = {x: (points[0].x + points[1].x)/2, y: (points[0].y + points[1].y) / 2}
        props.app.ticker.add(animate)
        }
    }
)