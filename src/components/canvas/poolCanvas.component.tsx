import { Stage } from "@inlet/react-pixi"
import { useState, MouseEvent, TouchEvent, WheelEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { poolActions } from "../../store/poolReducer";
import { Pool } from "../geometric/pool.component";

export interface PoolProps {
	n: number,
	iters: number,
	angle: number,
	colorFunc: number,
	scale: number,
	x: number,
	y: number,
}

type Point = {x: number, y: number}
type DeviceEvent = MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>

function getEventPoint(event: DeviceEvent) {
	if (['mousemove', 'mousedown', 'mouseup'].includes(event.type)) // @ts-ignore
		return {x : event.clientX / window.innerWidth, y: event.clientY / window.innerHeight}
	else { // @ts-ignore 
		const {clientX, clientY} = (event as TouchEvent).touches[0] 
		return {x: clientX / window.innerWidth, y: clientY / window.innerHeight}
	}
}

function pointSum(a: Point, b: Point): Point {
	return {x: a.x + b.x, y: a.y + b.y}
}

export const PoolCanvas: React.FC = () => {
	const dispatch =useDispatch()
	// dispatch(poolActions.setPoint({x: 0, y: 0}))
	const poolProps = useSelector((state: RootState) => state.pool)
	const [isDrag, setIsDrag] = useState(false)
	let [pointStart, setPointStart] = useState<Point>({x: 0, y: 0})
	let pointEnd = {x: 0, y: 0}
	let curPoint: Point = {x: poolProps.x, y: poolProps.y}

	function onDrugStart(event: DeviceEvent) {
		setIsDrag(true)
		setPointStart(getEventPoint(event))
	}
	function onDrugEnd(event: DeviceEvent) {
		setIsDrag(false)
		dispatch(poolActions.setPoint(curPoint))
	}
	function onDrag(event: DeviceEvent) {
		const scale = Math.exp(poolProps.scale)
		if (isDrag) {
			pointEnd = getEventPoint(event)
			const delta = {x: (pointEnd.x - pointStart.x) * scale * 2, y: (pointEnd.y - pointStart.y) * scale * 2}
			curPoint = pointSum(curPoint, delta);
			// if (Math.abs(delta.x) > (scale) || Math.abs(delta.y) > (scale)) {
				dispatch(poolActions.setPoint(curPoint))
				setPointStart(pointEnd)
			// }
		}
		
	}

	function onScroll(event: WheelEvent) {
		const scale =event.deltaY / window.innerHeight
		dispatch(poolActions.setScale(poolProps.scale + scale))
	}

	return <Stage options={{ backgroundAlpha: 0 }}
		onMouseDown={onDrugStart}
		onTouchStart={onDrugStart}
		onMouseMove={onDrag}
		onTouchMove={onDrag}
		onMouseUp={onDrugEnd}
		onTouchEnd={onDrugEnd}
		onWheel={onScroll}
		width={window.innerWidth}
		height={window.innerHeight}>
            {/* <Viewport width={window.innerWidth} height={window.innerHeight}> */}
                <Pool 
					angle={poolProps.angle} 
					iters={poolProps.iters} 
					n={poolProps.n} 
					colorFunc={poolProps.colorFunc} 
					scale={poolProps.scale}
					x={curPoint.x}
					y={curPoint.y}
					/>
            {/* </Viewport> */}
	</Stage>

}
