import { Stage } from "@inlet/react-pixi";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DragonCurve } from "../geometric/dragon.component";
import Viewport from "../viewport.component";


export interface DragonDrawParams {
    depth: number,
    angle: number,
    width: number,
    colorFunction: number
}
export interface DragonCanvasProps {
	dragonParams: DragonDrawParams

}


export const DragonCanvas: React.FC = () => {
    const props = useSelector((state: RootState) => state.dragon)
	return <Stage options={{ backgroundAlpha: 0 }}
		width={window.innerWidth}
		height={window.innerHeight}>
            <Viewport width={window.innerWidth} height={window.innerHeight}>
                <DragonCurve drawParams={props.dragonParams} />
            </Viewport>
	</Stage>

}
