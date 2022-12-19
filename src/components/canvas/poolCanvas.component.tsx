import { Stage } from "@inlet/react-pixi";
import { useState, MouseEvent, TouchEvent, WheelEvent, Touch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { poolActions } from "../../store/poolReducer";
import { Pool } from "../geometric/pool.component";

export interface PoolProps {
    n: number;
    iters: number;
    angle: number;
    colorFunc: number;
    scale: number;
    x: number;
    y: number;
}

type Point = { x: number; y: number };

function getMouseEventPoint(event: MouseEvent<HTMLCanvasElement>): Point {
	return {
		x: event.clientX / window.innerWidth,
		y: event.clientY / window.innerHeight,
	}
}

function getTouchPoint(t: Touch): Point {
	const { clientX: x, clientY: y } = t
	return { x: x  / window.innerWidth, y: y / window.innerHeight }
}

function getTouchEventPoint(event: TouchEvent<HTMLCanvasElement>): Point {
	return getTouchPoint(event.touches[0]);
}

function pointSum(a: Point, b: Point): Point {
    return { x: a.x + b.x, y: a.y + b.y };
}

function pointSub(a: Point, b: Point): Point {
	return { x: (a.x - b.x), y: (a.y - b.y) }
}

function pointMul(a: Point, b: number): Point {
	return { x: a.x * b, y: a.y * b }
}

function pointDist(a: Point, b: Point): number {
	return (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y) 
}

function getScaledDelta(a: Point, b: Point, scale: number): Point {
	return pointMul(pointSub(a, b), scale * 2)
}


export const PoolCanvas: React.FC = () => {
    const dispatch = useDispatch();
    const poolProps = useSelector((state: RootState) => state.pool);
    const [isDrag, setIsDrag] = useState(false);
    let [pointStart, setPointStart] = useState<Point>({ x: 0, y: 0 });

	const [isPan, setIsPan] = useState(false);
	let [panStart1, setPanStart1] = useState<Point>({ x: 0, y: 0 });
	let [panStart2, setPanStart2] = useState<Point>({ x: 0, y: 0 });

    let curPoint: Point = { x: poolProps.x, y: poolProps.y };

	console.log(isDrag, isPan, poolProps)

    function onMouseDragStart(event: MouseEvent<HTMLCanvasElement>) {
        setIsDrag(true);
        setPointStart(getMouseEventPoint(event));
    }

	function onTouchDragStart(event: TouchEvent<HTMLCanvasElement>) {
		if (event.touches.length === 1) {
			setIsDrag(true);
			setPointStart(getTouchEventPoint(event));
		}
		else if (event.touches.length === 2) {
			setIsDrag(false)
			const t1 = event.touches[0]
			const t2 = event.touches[1]
			setPanStart1(getTouchPoint(t1))
			setPanStart2(getTouchPoint(t2))
			setIsPan(true)
		}
    }

    function onDragEnd() {
        setIsDrag(false);
        dispatch(poolActions.setPoint(curPoint));
    }

	function onTouchEnd() {
        setIsDrag(false);
		setIsPan(false)
    }

    function onMouseDrag(event: MouseEvent<HTMLCanvasElement>) {
        onDrug(getMouseEventPoint(event))
    }

	function onTouchDrag(event: TouchEvent<HTMLCanvasElement>) {
		if (event.touches.length === 1)
        	onDrug(getTouchEventPoint(event))
		if (event.touches.length === 2) {
			const t1 = event.touches[0]
			const t2 = event.touches[1]
			onPan(getTouchPoint(t1), getTouchPoint(t2))
		}
    }

	function onDrug(pointEnd: Point) {
		if (isDrag) {
			const scale = Math.exp(poolProps.scale);
            const delta = getScaledDelta(pointStart, pointEnd, scale)
            curPoint = pointSum(curPoint, delta);
            dispatch(poolActions.setPoint(curPoint));
            setPointStart(pointEnd);
        }
	}

	function onPan(pointEnd1: Point, pointEnd2: Point) {
		if (isPan) {
			const delta1  = pointDist(panStart1, panStart2)
			const delta2  = pointDist(pointEnd1, pointEnd2)
			const delta = delta1 - delta2
			dispatch(poolActions.setScale(poolProps.scale + delta))
		}
	}

    function onScroll(event: WheelEvent) {
        const scale = event.deltaY / window.innerHeight;
        dispatch(poolActions.setScale(poolProps.scale + scale));
    }

    return (
            <Stage
                options={{ backgroundAlpha: 0 }}

                onMouseDown={onMouseDragStart}
                onTouchStart={onTouchDragStart}

                onMouseMove={onMouseDrag}
                onTouchMove={onTouchDrag}

                onMouseUp={onDragEnd}
                onTouchEnd={onTouchEnd}

                onWheel={onScroll}
                width={window.innerWidth}
                height={window.innerHeight}
            >
                <Pool
                    angle={poolProps.angle}
                    iters={poolProps.iters}
                    n={poolProps.n}
                    colorFunc={poolProps.colorFunc}
                    scale={poolProps.scale}
                    x={curPoint.x}
                    y={curPoint.y}
                />
            </Stage>
    );
};
