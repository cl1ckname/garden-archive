import { ChangeEvent, useState } from 'react';
import './App.css';
import { TreeCanvas, TreeCanvasProps, TreeDrawParams, TreeRenderParams } from './components/treeCanvas.component'
import Store from "store"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TreePage } from './components/treePage.component';
import { DragonPage, DragonPageProps } from './components/dragonPage.component';
import { DragonCanvasProps, DragonDrawParams } from './components/dragonCanvas.component';


const defaultTreeSettings: TreeCanvasProps = {
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

const defaultDragonSettings: DragonCanvasProps = {
	dragonParams: {
		depth: 3,
		angle: Math.PI / 4,
		width: 1,
		colorFunction: 1
	}
}

function App() {
	const treeSettings = Store.get('treeSettings', defaultTreeSettings)
	const dragonSettings = Store.get('dragonSettings', defaultDragonSettings)

	const [treeDrawProps, setTreeProps] = useState<TreeDrawParams>(treeSettings.treeParams)
	const [renderTreeProps, setTreeRenderProps] = useState<TreeRenderParams>(treeSettings.renderProps)
	const [dragonDrawProps, setDragonDrawProps] = useState<DragonDrawParams>(dragonSettings.dragonParams)

	const changeTreeHandler = (event: ChangeEvent<{}>, value: number, key: keyof TreeDrawParams) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, treeDrawProps)
		propsCopy[key] = value
		setTreeProps(propsCopy)
		Store.set('treeSettings', { treeParams: treeDrawProps, renderProps: renderTreeProps })
	}

	const changeRenderHandler = (event: ChangeEvent<{}>, value: number, key: keyof TreeRenderParams) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, renderTreeProps)
		propsCopy[key] = value
		setTreeRenderProps(propsCopy)
		Store.set('treeSettings', { treeParams: treeDrawProps, renderProps: renderTreeProps })
	}

	const changeDragonHandler = (event: ChangeEvent<{}>, value: number, key: keyof DragonDrawParams) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, dragonDrawProps)
		propsCopy[key] = value
		setDragonDrawProps(propsCopy)
		Store.set('dragonSettings', { dragonParams: dragonDrawProps })
	}



	return <div className="App">
		<BrowserRouter>
			<Routes>
				<Route path='/' element={
					<TreePage drawProps={treeDrawProps} renderParams={renderTreeProps} 
								changeRenderHandler={changeRenderHandler}
								changeTreeHandler={changeTreeHandler}/>} />
				
				<Route path='/dragon' element={
					<DragonPage dragonCanvasProps={dragonDrawProps} changeDragonHandler={changeDragonHandler}/>
				} />
			</Routes>
		</BrowserRouter>
	</div>
}
export default App;
