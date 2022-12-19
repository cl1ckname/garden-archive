import { PoolCanvas } from "../canvas/poolCanvas.component"
import { PoolParams } from "../forms/poolParams.form"
import { Settings } from "../settings.component"

export const PoolPage: React.FC = () => {
	document.title = 'New page'
	return <>
		<PoolCanvas/>
		<Settings> <PoolParams /> </Settings>
	</>
}