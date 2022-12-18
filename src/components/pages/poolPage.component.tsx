import { PoolCanvas } from "../canvas/poolCanvas.component"

export const PoolPage: React.FC = () => {
	document.title = 'New page'
	return <>
		<PoolCanvas/>
	</>
}