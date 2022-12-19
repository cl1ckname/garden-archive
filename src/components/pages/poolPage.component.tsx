import { PoolCanvas } from "../canvas/poolCanvas.component"
import { PoolParams } from "../forms/poolParams.form"
import { Settings } from "../settings.component"

export const PoolPage: React.FC = () => {
	document.title = 'Newton pool'
	return <>
		<PoolCanvas/>
		<Settings> <PoolParams /> </Settings>
	</>
}