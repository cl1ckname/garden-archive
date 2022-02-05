import { ChangeEvent, useState } from 'react';
import './App.css';
import { MyForm } from './components/forms/treeParams.form';
import {TreeCanvas} from './components/canvas.component'

function App() {
  const [depth, setDepthValue] = useState<number>(1)
  const [rootSize, setRootSizeValue] = useState<number>(100)

  const changeDepthHandler = (event: ChangeEvent<{}>, value: number) => {
      event.preventDefault()
      setDepthValue(value)
  }

  const changeRootSizeHandler = (event: ChangeEvent<{}>, value: number) => {
    event.preventDefault()
    setRootSizeValue(value)
}
  return (
    <div className="App">
        <MyForm 
          depth={depth}
          rootSize={rootSize}
          onDepthChange={(event, value) => changeDepthHandler(event, value as number)}
          onRootSizeChange={(event, value) => changeRootSizeHandler(event, value as number)}
          />
        <TreeCanvas canvasSize={900} depth={depth} rootSize={rootSize} angle={Math.PI / 4}/>
    </div>
  );
}

export default App;
