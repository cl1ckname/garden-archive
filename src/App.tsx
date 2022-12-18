import { ChangeEvent, useState } from 'react';
import './App.css';
import Store from "store"
import { HashRouter, Route, Routes } from 'react-router-dom';
import { DragonPage } from './components/pages/dragonPage.component';
import { DragonCanvasProps, DragonDrawParams } from './components/canvas/dragonCanvas.component';
import { TreePage } from './components/pages/treePage.component';
import { BurgerMenu } from './components/menus/burgerMenu.component';
import { AttractPage } from './components/pages/attractPage.component';
import { FractalMenu } from './components/menus/fractalMenu.component';

const defaultDragonSettings: DragonCanvasProps = {
	dragonParams: {
		depth: 3,
		angle: Math.PI / 4,
		width: 1,
		colorFunction: 1
	}
}

function App() {
	const dragonSettings = Store.get('dragonSettings', defaultDragonSettings)

	const [dragonDrawProps, setDragonDrawProps] = useState<DragonDrawParams>(dragonSettings.dragonParams)

	const changeDragonHandler = (event: ChangeEvent<{}>, value: number, key: keyof DragonDrawParams) => {
		event.preventDefault()
		const propsCopy = Object.assign({}, dragonDrawProps)
		propsCopy[key] = value
		setDragonDrawProps(propsCopy)
		Store.set('dragonSettings', { dragonParams: dragonDrawProps })
	}



	return <div className="App">
		<HashRouter>
			<Routes>
				<Route path='/' element={
					<TreePage  />
				} />
				
				<Route path='/dragon' element={
					<DragonPage dragonCanvasProps={dragonDrawProps} changeDragonHandler={changeDragonHandler}/>
				} />
				<Route path='/attract' element={
					<AttractPage/>
				} />
			</Routes>
			<BurgerMenu>
				<FractalMenu/>
			</BurgerMenu>
		</HashRouter>
	</div>
}
export default App;
