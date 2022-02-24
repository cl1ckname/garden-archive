import { List, ListItemText, ListItem, Slider, Grid, Checkbox, FormControlLabel } from "@material-ui/core"
import { ChangeEvent } from "react"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { TreeDrawParams, TreeRenderParams } from "../canvas/treeCanvas.component"
import { ListPicker } from "./listPicker.form"



export interface TreeFormProps {
    drawProps: TreeDrawParams
    renderParams: TreeRenderParams
    drawChangeHandler: (event: ChangeEvent<{}>, value: number, type: keyof TreeDrawParams) => void
    renderChangeHandler: (event: ChangeEvent<{}>, value: number, type: keyof TreeRenderParams) => void
}
export const TreeParams: React.FC<TreeFormProps> = (props: TreeFormProps) => {
    return <div>
            <Grid container>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="ViewPort"
                                      value={props.renderParams.viewport}
                                      onChange={(event,value) => props.renderChangeHandler(event, value ? 1 : 0, 'viewport')}/>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="Draw squares"
                                      value={props.renderParams.drawSquares}
                                      onChange={(event,value) => props.renderChangeHandler(event, value ? 1 : 0, 'drawSquares')}/>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="Draw triangles"
                                      value={props.renderParams.drawTriangles}
                                      onChange={(event,value) => props.renderChangeHandler(event, value ? 1 : 0, 'drawTriangles')}/>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="Fill figures"
                                      value={props.renderParams.fill}
                                      onChange={(event,value) => props.renderChangeHandler(event, value ? 1 : 0, 'fill')}/>
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
                    <ListItemText> Branch long </ListItemText>
                    <Slider step={0.001}
                        min={0}
                        max={4}
                        value={props.drawProps.branchLong}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'branchLong')} />
                </ListItem>
                <ListItem>
                    <ListItemText> Line Width </ListItemText>
                    <Slider step={0.001}
                        min={1}
                        max={10}
                        value={props.drawProps.lineWidth}
                        disabled={!!props.renderParams.fill}
                        onChange={(event, value) => props.drawChangeHandler(event, value as number, 'lineWidth')} />
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

    </div>
}