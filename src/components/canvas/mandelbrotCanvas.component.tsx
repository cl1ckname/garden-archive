import { useDispatch, useSelector } from "react-redux"
import { Point, pointMul, pointSum } from "../../services/pointOperations"
import { RootState } from "../../store"
import { mandelbrotActions } from "../../store/mandelbrotReducer"
import { Mandelbrot } from "../geometric/mandelbrot.component"
import { ShaderViewport } from "../shaderViewport"


export const MandelbrotCanvas: React.FC = () => {
	const dispatch = useDispatch()
	const mandelbrotProps = useSelector((state: RootState) => state.mandelbrot)
	let curPoint: Point = { x: mandelbrotProps.x, y: mandelbrotProps.y }

	function onDrag(delta: Point) {
        const scale = Math.exp(mandelbrotProps.scale)
        const scaledDelta = pointMul(delta, scale * 2)
        dispatch(mandelbrotActions.setPoint(pointSum(curPoint, scaledDelta)))
    }

    function onScroll(value: number) {
        dispatch(mandelbrotActions.setScale(mandelbrotProps.scale + value))
    }

	return (
		<ShaderViewport
			onDrag={onDrag}
			onScroll={onScroll}
			onPan={onScroll}
		>
			<Mandelbrot
				x={mandelbrotProps.x}
				y={mandelbrotProps.y}
				scale={mandelbrotProps.scale}
			/>
		</ShaderViewport>
	)
}