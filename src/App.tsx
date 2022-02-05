import { ChangeEvent, useState } from 'react';
import './App.css';
import { MyForm } from './components/forms/treeParams.form';
import { TreeCanvas, CanvasProps } from './components/canvas.component'

const defaultSettings = { 
	canvasSize: 900, 
	angle: Math.PI / 4, 
	depth: 1, 
	rootSize: 100 
}

function App() {
	const [canvasProps, setCanvasProps] = useState<CanvasProps>(defaultSettings)

	const changeHandler = (event: ChangeEvent<{}>, value: number, key: keyof CanvasProps) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, canvasProps)
		propsCopy[key] = value
		setCanvasProps(propsCopy)
	}

	return (
		<div className="App">
			<MyForm
				canvasProps={canvasProps}
				onChangeHandler={(event, value, type) => changeHandler(event, value as number, type)}
			/>
			<TreeCanvas canvasSize={900} depth={canvasProps.depth} rootSize={canvasProps.rootSize} angle={canvasProps.angle} />
		</div>
	);
}

export default App;
