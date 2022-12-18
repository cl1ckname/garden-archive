import { Stage } from "@inlet/react-pixi"
import { Pool } from "../geometric/pool.component";


export const PoolCanvas: React.FC<{}> = (props: {}) => {
	return <Stage options={{ backgroundAlpha: 0 }}
		width={window.innerWidth}
		height={window.innerHeight}>
            {/* <Viewport width={window.innerWidth} height={window.innerHeight}> */}
                <Pool />
            {/* </Viewport> */}
	</Stage>

}
