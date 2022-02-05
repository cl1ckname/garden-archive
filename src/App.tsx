import { ChangeEvent, useState } from 'react';
import './App.css';
import { MyForm } from './components/buildParams.form';
import {TreeCanvas} from './components/canvas.component'

function App() {
  const [value, setValue] = useState<number>(1)
  const cnv = new TreeCanvas({angle: Math.PI / 4, canvasSize: 900, depth: value})
  const changeHandler = (event: ChangeEvent<{}>, value: number) => {
      event.preventDefault()
      setValue(value)
      cnv.updateDepth(value)
      console.log(value)
  }
  return (
    <div className="App">
        <MyForm value={value} onChange={(event, value) => changeHandler(event, value as number)}/>
        {/* <TreeCanvas angle={Math.PI / 4} canvasSize={900} depth={4}/> */}
        {cnv.render()}
    </div>
  );
}

export default App;
