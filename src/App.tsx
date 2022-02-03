import './App.css';
import { MyForm } from './components/buildParams.form';
import {TreeCanvas} from './components/canvas.component'

function App() {
  return (
    <div className="App">
        <MyForm onSubmit={() => {}}/>
        <TreeCanvas></TreeCanvas>
    </div>
  );
}

export default App;
