import { useDispatch, useSelector } from "react-redux";
import { Point, pointMul, pointSum } from "../../services/pointOperations";
import { RootState } from "../../store";
import { poolActions } from "../../store/poolReducer";
import { Pool } from "../geometric/pool.component";
import { ShaderViewport } from "../shaderViewport";

export interface PoolProps {
    n: number;
    iters: number;
    angle: number;
    colorFunc: number;
    scale: number;
    x: number;
    y: number;
}

export const PoolCanvas: React.FC = () => {
    const dispatch = useDispatch()
    const poolProps = useSelector((state: RootState) => state.pool);
    let curPoint: Point = { x: poolProps.x, y: poolProps.y }

    function onDrag(delta: Point) {
        const scale = Math.exp(poolProps.scale)
        const scaledDelta = pointMul(delta, scale * 2)
        dispatch(poolActions.setPoint(pointSum(curPoint, scaledDelta)))
    }

    function onScroll(value: number) {
        dispatch(poolActions.setScale(poolProps.scale + value))
    }

    return (
            <ShaderViewport
                onDrag={onDrag}
                onScroll={onScroll}
                onPan={onScroll}
            >
                <Pool
                    angle={poolProps.angle}
                    iters={poolProps.iters}
                    n={poolProps.n}
                    colorFunc={poolProps.colorFunc}
                    scale={poolProps.scale}
                    x={poolProps.x}
                    y={poolProps.y}
                />
            </ShaderViewport>
    );
};
