import { List, ListItemText, ListItem, Slider } from "@material-ui/core"
import { ChangeEvent } from "react"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { DragonDrawParams } from "../dragonCanvas.component"
import { TreeDrawParams, TreeRenderParams } from "../treeCanvas.component"
import { ListPicker } from "./listPicker.form"



export interface DragonFormProps {
    drawProps: DragonDrawParams
    drawChangeHandler: (event: ChangeEvent<{}>, value: number, type: keyof DragonDrawParams) => void
}
export const DragonParams: React.FC<DragonFormProps> = (props: DragonFormProps) => {
    return <div>
            <List>
                <ListItem>
                    <ListItemText> Iteration number </ListItemText>
                    <Slider
                        step={1}
                        min={1}
                        max={20}
                        marks
                        valueLabelDisplay="auto"
                        value={props.drawProps.depth}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'depth')} />
                </ListItem>
                <ListItem>
                    <ListItemText> Angle </ListItemText>
                    <Slider step={0.001}
                        min={-Math.PI / 2}
                        max={Math.PI / 2}
                        marks={[{value: 0, label: '0'}]}
                        value={props.drawProps.angle}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'angle')} />
                </ListItem>
                <ListItem>
                    <ListItemText> Line width </ListItemText>
                    <Slider step={0.001}
                        min={1}
                        max={10}
                        marks
                        value={props.drawProps.width}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'width')} />
                </ListItem>
                <ListItem>
                    <ListPicker classes={{ listItemClicked: 'ActiveColor', listItemNotClicked: 'UnActiveColor' }}
                        colorList={ColorCollection}
                        onChangeHandle={(event, value) => props.drawChangeHandler(event, Number.parseInt(value), 'colorFunction')}
                        colorFunction={props.drawProps.colorFunction}>
                    </ListPicker>
                </ListItem>
            </List>
    </div>
}