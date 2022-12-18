import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { DragonPage } from './components/pages/dragonPage.component';
import { TreePage } from './components/pages/treePage.component';
import { BurgerMenu } from './components/menus/burgerMenu.component';
import { AttractPage } from './components/pages/attractPage.component';
import { FractalMenu } from './components/menus/fractalMenu.component';
import { PoolPage } from './components/pages/poolPage.component';

function App() {
	return <div className="App">
		<HashRouter>
			<Routes>
				<Route path='/' element={
					<TreePage  />
				} />
				
				<Route path='/dragon' element={
					<DragonPage/>
				} />
				<Route path='/attract' element={
					<AttractPage/>
				} />
				<Route path='/new' element={
					<PoolPage/>
				} />
			</Routes>
			<BurgerMenu>
				<FractalMenu/>
			</BurgerMenu>
		</HashRouter>
	</div>
}
export default App;
