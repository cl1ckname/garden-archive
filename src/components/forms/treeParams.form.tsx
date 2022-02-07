import { Card, List, ListItemText, ListItem, Slider, Grid, Checkbox, FormControlLabel } from "@material-ui/core"
import { ChangeEvent, SetStateAction } from "react"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { cardStyle } from "../../styles/buildParams.style"
import { DrawParams, RenderParams } from "../canvas.component"
import { ListPicker } from "./listPicker.form"



export interface FormProps {
    drawProps: DrawParams
    renderParams: RenderParams
    drawChangeHandler: (event: ChangeEvent<{}>, value: number, type: keyof DrawParams) => void
    renderChangeHandler: (event: ChangeEvent<{}>, value: number, type: keyof RenderParams) => void
}
export const MyForm: React.FC<FormProps> = (props: FormProps) => {
    return <div>
        <Card style={cardStyle}>
            <Grid container>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="ViewPort"
                                      value={true}
                                      onChange={(event,value) => props.renderChangeHandler(event, value ? 1 : 0, 'viewport')}/>
                </Grid>
            </Grid>
            <List>
                <ListItem>
                    <ListItemText> Iteration number </ListItemText>
                    <Slider
                        step={1}
                        min={1}
                        max={!!props.renderParams.viewport ? 18 : 20}
                        marks
                        valueLabelDisplay="auto"
                        value={props.drawProps.depth}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'depth')} />
                </ListItem>
                <ListItem>
                    <ListItemText> Angle </ListItemText>
                    <Slider step={0.001}
                        min={0.0001}
                        max={Math.PI / 2 - 0.0001}
                        value={props.drawProps.angle}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'angle')} />
                </ListItem>
                <ListItem>
                    <ListItemText> Root size </ListItemText>
                    <Slider step={1}
                        min={1}
                        max={600}
                        value={props.drawProps.rootSize}
                        disabled={!!props.renderParams.viewport}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'rootSize')} />
                </ListItem>
                <ListItem>
                    <ListItemText> X </ListItemText>
                    <Slider step={1}
                        min={0}
                        max={window.innerWidth}
                        value={props.drawProps.x}
                        disabled={!!props.renderParams.viewport}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'x')} />
                </ListItem>
                <ListItem>
                    <ListItemText> Y </ListItemText>
                    <Slider step={1}
                        min={0}
                        max={window.innerHeight * 1.5}
                        value={props.drawProps.y}
                        disabled={!!props.renderParams.viewport}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'y')} />
                </ListItem>
                <ListItem>
                    <ListPicker classes={{ listItemClicked: 'ActiveColor', listItemNotClicked: 'UnActiveColor' }}
                        colorList={ColorCollection}
                        onChangeHandle={(event, value) => props.drawChangeHandler(event, Number.parseInt(value), 'colorFunction')}
                        colorFunction={props.drawProps.colorFunction}>
                    </ListPicker>
                </ListItem>
            </List>
        </Card>
    </div>
}