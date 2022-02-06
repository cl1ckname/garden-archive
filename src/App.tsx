import { ChangeEvent, useState } from 'react';
import './App.css';
import { MyForm } from './components/forms/treeParams.form';
import { TreeCanvas, CanvasProps, DrawParams, RenderParams } from './components/canvas.component'

const defaultSettings: CanvasProps = { 
	treeParams: {
		x: window.innerWidth / 2,
		y: window.innerHeight * 2 / 3,
		angle: Math.PI / 4, 
		depth: 3, 
		rootSize: 100,
		colorFunction: 1
	},
	renderProps: {
		viewport: 1
	}
}

function App() {
	const [drawProps, setTreeProps] = useState<DrawParams>(defaultSettings.treeParams)
	const [renderProps, setRenderProps] = useState<RenderParams>(defaultSettings.renderProps)

	const changeTreeHandler = (event: ChangeEvent<{}>, value: number, key: keyof DrawParams) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, drawProps)
		propsCopy[key] = value	
		setTreeProps(propsCopy)
	}

	const changeRenderHandler = (event: ChangeEvent<{}>, value: number, key: keyof RenderParams) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, renderProps)
		propsCopy[key] = value
		setRenderProps(propsCopy)
	}

	return (
		<div className="App">
			<MyForm
				drawProps={drawProps}
				renderParams={renderProps}
				drawChangeHandler={(event, value, type) => changeTreeHandler(event, value as number, type)}
				renderChangeHandler={(event, value, type) => changeRenderHandler(event, value as number, type)}
			/>
			<TreeCanvas treeParams={drawProps} renderProps={renderProps}/>
		</div>
	);
}

export default App;
