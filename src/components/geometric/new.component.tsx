import { PixiComponent } from "@inlet/react-pixi";
import { Graphics } from "pixi.js";


export interface NewProps {

}

export const New = PixiComponent<NewProps, Graphics>('New', {
	create: () => new Graphics(),
	applyProps: (ins, _, props) => {
		ins.moveTo(100, 100)
		ins.lineStyle({ color: 0xff00ff, width: 3 })
		ins.lineTo(200, 200)
	}
})