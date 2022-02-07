import { ChangeEvent, useState } from 'react';
import './App.css';
import { MyForm } from './components/forms/treeParams.form';
import { TreeCanvas, CanvasProps, DrawParams, RenderParams } from './components/canvas.component'
import Store from "store"

const defaultSettings: CanvasProps = { 
	treeParams: {
		x: window.innerWidth / 2,
		y: window.innerHeight * 2 / 3,
		angle: Math.PI / 4, 
		depth: 3, 
		rootSize: 100,
		colorFunction: 1,
		branchLong: 1
	},
	renderProps: {
		viewport: 1,
		drawSquares: 1,
		drawTriangles: 1,
	}
}

function App() {
	const settings = Store.get('treeSettings', defaultSettings)
	const [drawProps, setTreeProps] = useState<DrawParams>(settings.treeParams)
	const [renderProps, setRenderProps] = useState<RenderParams>(settings.renderProps)

	const changeTreeHandler = (event: ChangeEvent<{}>, value: number, key: keyof DrawParams) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, drawProps)
		propsCopy[key] = value	
		setTreeProps(propsCopy)
		Store.set('treeSettings', {treeParams: drawProps, renderProps: renderProps})
	}

	const changeRenderHandler = (event: ChangeEvent<{}>, value: number, key: keyof RenderParams) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, renderProps)
		propsCopy[key] = value
		setRenderProps(propsCopy)
		Store.set('treeSettings', {treeParams: drawProps, renderProps: renderProps})
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
