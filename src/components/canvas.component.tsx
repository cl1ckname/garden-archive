import { PixiComponent, Stage } from "@inlet/react-pixi";
import { Graphics } from "pixi.js";
import React from "react";
import { canvas } from "../styles/canvas.style";


interface RectangleProps {
  x: number
  y: number
  width: number
  height: number
  color: number
}
  
  const Rectangle = PixiComponent<RectangleProps, Graphics>('Rectangle', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
      ins.x = props.x
      ins.beginFill(props.color)
      ins.drawRect(props.x, props.y, props.width, props.height)
      ins.endFill()
    },
  })

export class TreeCanvas extends React.Component {
    digits = [1,2,3];
    render() {
        return <div style={canvas}>
          <Stage options={{backgroundAlpha: 0}} width={1000} height={1000}>
            <Rectangle x={450} y={800} width={100} height={100} color={0x9999ff}/>
			{this.digits.map(n => {return <Rectangle x= {n*100} y = {n*100}  width={50} height={50} color={0x99ff99}></Rectangle>})}
          </Stage>
        </div>
    }
}