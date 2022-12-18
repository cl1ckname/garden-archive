import { NewCanvas } from "../canvas/newCanvas.component"

export const NewPage: React.FC = () => {
	document.title = 'New page'
	return <>
		<NewCanvas/>
	</>
}