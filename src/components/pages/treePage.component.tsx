import { TreeCanvas} from '../canvas/treeCanvas.component';
import { TreeParams } from '../forms/treeParams.form';
import { Settings } from '../settings.component';


export const TreePage: React.FC = () => {
    document.title = "ClickName's garden"
    return <>
        <Settings>
                <TreeParams />
        </Settings>
        <TreeCanvas/>    
    </>
}
