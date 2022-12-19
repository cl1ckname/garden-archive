import { Stage } from "@inlet/react-pixi";
import { useState, MouseEvent, TouchEvent, WheelEvent, Touch } from "react";
import { Point, pointDist, pointSub } from "../services/pointOperations";


export interface PoolProps {
    n: number;
    iters: number;
    angle: number;
    colorFunc: number;
    scale: number;
    x: number;
    y: number;
}

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

export interface ShaderViewportProps {
	children: React.ReactNode
	onPan: (value: number) => void
	onScroll: (value: number) => void
	onDrag: (value: Point) => void
}

export const ShaderViewport: React.FC<ShaderViewportProps> = (props: ShaderViewportProps) => {
    
    const [isDrag, setIsDrag] = useState(false);
    let [pointStart, setPointStart] = useState<Point>({ x: 0, y: 0 });

	const [isPan, setIsPan] = useState(false);
	let [panStart1, setPanStart1] = useState<Point>({ x: 0, y: 0 });
	let [panStart2, setPanStart2] = useState<Point>({ x: 0, y: 0 });


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
            const delta = pointSub(pointStart, pointEnd)
			props.onDrag(delta)
            setPointStart(pointEnd);
        }
	}

	function onPan(pointEnd1: Point, pointEnd2: Point) {
		if (isPan) {
			const delta1  = pointDist(panStart1, panStart2)
			const delta2  = pointDist(pointEnd1, pointEnd2)
			const delta = delta1 - delta2
			props.onPan(delta)
		}
	}

    function onScroll(event: WheelEvent) {
        const scale = event.deltaY / window.innerHeight;
		props.onScroll(scale)
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
                {props.children}
            </Stage>
    );
};
