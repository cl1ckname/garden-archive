import { Stage } from "@inlet/react-pixi"
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Pool } from "../geometric/pool.component";

export interface PoolProps {
	n: number,
	iters: number,
	angle: number,
	colorFunc: number,
	scale: number,
}

export const PoolCanvas: React.FC = () => {
	const poolProps = useSelector((state: RootState) => state.pool)
	return <Stage options={{ backgroundAlpha: 0 }}
		width={window.innerWidth}
		height={window.innerHeight}>
            {/* <Viewport width={window.innerWidth} height={window.innerHeight}> */}
                <Pool 
					angle={poolProps.angle} 
					iters={poolProps.iters} 
					n={poolProps.n} 
					colorFunc={poolProps.colorFunc} 
					scale={poolProps.scale}/>
            {/* </Viewport> */}
	</Stage>

}
