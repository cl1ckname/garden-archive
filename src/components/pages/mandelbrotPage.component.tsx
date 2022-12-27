import { MandelbrotCanvas } from "../canvas/mandelbrotCanvas.component"
import { MandelbrotParams } from "../forms/mandelbrotParams.form"
import { Settings } from "../settings.component"

export const MandelbrotPage: React.FC = () => {
	document.title = 'Mandelbrot set'
	return <>
		<MandelbrotCanvas />
		<Settings><MandelbrotParams/></Settings>
	</>
}