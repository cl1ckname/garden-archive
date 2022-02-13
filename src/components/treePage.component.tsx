import { ChangeEvent } from 'react';
import { TreeDrawParams, TreeRenderParams, TreeCanvas } from './treeCanvas.component';
import { TreeParams } from './forms/treeParams.form';
import { DragonCurve } from './geometric/dragon.component';
import { Settings } from './settings.component';


interface TreePageProps{
    drawProps: TreeDrawParams,
    renderParams: TreeRenderParams,
    changeTreeHandler: ((event: ChangeEvent<{}>, value: number, key: keyof TreeDrawParams) => void),
    changeRenderHandler: ((event: ChangeEvent<{}>, value: number, key: keyof TreeRenderParams) => void)
}
export const TreePage: React.FC<TreePageProps> = (props: TreePageProps) => {
    document.title = "ClickName's garden"
    return <>
        <Settings>
                <TreeParams
                    drawProps={props.drawProps}
                    renderParams={props.renderParams}
                    drawChangeHandler={(event, value, type) => props.changeTreeHandler(event, value as number, type)}
                    renderChangeHandler={(event, value, type) => props.changeRenderHandler(event, value as number, type)}
                />
            </Settings>
            <TreeCanvas treeParams={props.drawProps} renderProps={props.renderParams} />    
    </>
}
