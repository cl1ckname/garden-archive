import { MandelbrotCanvas } from "../canvas/mandelbrotCanvas.component"

export const MandelbrotPage: React.FC = () => {
	document.title = 'Mandelbrot set'
	return <>
		<MandelbrotCanvas />
	</>
}