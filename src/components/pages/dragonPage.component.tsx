import { DragonCanvas } from "../canvas/dragonCanvas.component"
import { DragonParams } from "../forms/dragonParams.form"
import { Settings } from "../settings.component"

export const DragonPage: React.FC = () => {
    document.title = "ClickName's dragon"
    return <>
        <Settings> <DragonParams/> </Settings>
        <DragonCanvas/>
    </>
}