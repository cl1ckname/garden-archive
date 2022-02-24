import { List, ListItemText, ListItem, Slider } from "@material-ui/core"
import { ChangeEvent } from "react"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { AttractDrawProps } from "../canvas/attractCanvas.component"
import { ListPicker } from "./listPicker.form"



export interface AttractFormProps {
    drawProps: AttractDrawProps
    drawChangeHandler: (event: ChangeEvent<{}>, value: number, type: Exclude<keyof AttractDrawProps, 'points'>) => void
}
export const AttractParams: React.FC<AttractFormProps> = (props: AttractFormProps) => {
    return <div>
            <List>
                <ListItem>
                    <ListItemText> Iteration number </ListItemText>
                    <Slider
                        step={100}
                        min={1}
                        max={100000}
                        marks
                        valueLabelDisplay="auto"
                        value={props.drawProps.iters}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'iters')} />
                </ListItem>
                <ListItem>
                    <ListItemText> Points number </ListItemText>
                    <Slider step={1}
                        min={2}
                        max={10}
                        marks
                        value={props.drawProps.points_number}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'points_number')} />
                </ListItem>
                <ListItem>
                    <ListItemText> Ratio </ListItemText>
                    <Slider step={0.001}
                        min={0}
                        max={1}
                        marks
                        value={props.drawProps.ratio}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'ratio')} />
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