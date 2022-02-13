import { ChangeEvent } from "react"
import { DragonCanvas, DragonCanvasProps, DragonDrawParams } from "./dragonCanvas.component"
import { DragonParams } from "./forms/dragonParams.form"
import { Settings } from "./settings.component"

export interface DragonPageProps {
    dragonCanvasProps: DragonDrawParams
    changeDragonHandler: (event: ChangeEvent<{}>, value: number, key: keyof DragonDrawParams) => void
}

export const DragonPage: React.FC<DragonPageProps> = (props: DragonPageProps) => {
    document.title = "ClickName's dragon"
    return <>
        <Settings> <DragonParams drawProps={props.dragonCanvasProps} drawChangeHandler={props.changeDragonHandler}/> </Settings>
        <DragonCanvas dragonParams={props.dragonCanvasProps}/>
    </>
}