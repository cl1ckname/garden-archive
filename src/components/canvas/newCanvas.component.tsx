import { Stage } from "@inlet/react-pixi"
import { New } from "../geometric/new.component";
import Viewport from "../viewport.component";

export const NewCanvas: React.FC<{}> = (props: {}) => {
	return <Stage options={{ backgroundAlpha: 0 }}
		width={window.innerWidth}
		height={window.innerHeight}>
            <Viewport width={window.innerWidth} height={window.innerHeight}>
                <New />
            </Viewport>
	</Stage>

}
