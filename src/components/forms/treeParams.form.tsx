import { List, ListItemText, ListItem, Slider, Grid, Checkbox, FormControlLabel } from "@material-ui/core"
import { ChangeEvent, useEffect } from "react"
import Store from "store"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { TreeDrawParams, TreeRenderParams } from "../canvas/treeCanvas.component"
import { ListPicker } from "./listPicker.form"
import { useSelector, useDispatch } from 'react-redux'
import { treeActions } from "../../store/treeReducer"
import { RootState } from "../../store"



export interface TreeFormProps {
    drawProps: TreeDrawParams
    renderParams: TreeRenderParams
    drawChangeHandler: (event: ChangeEvent<{}>, value: number, type: keyof TreeDrawParams) => void
    renderChangeHandler: (event: ChangeEvent<{}>, value: number, type: keyof TreeRenderParams) => void
}
export const TreeParams: React.FC = () => {
    const dispatch = useDispatch()
    const props = useSelector((state: RootState) => state.tree)
    useEffect(() => {
        console.log('pupipupipupipupi')
		Store.set('treeSettings', props )
	}, [props])

    return <div>
            <Grid container>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="ViewPort"
                                      value={props.renderProps.viewport}
                                      onChange={(event,value) => dispatch(treeActions.useVieport(value))}/>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="Draw squares"
                                      value={props.renderProps.drawSquares}
                                      onChange={(event,value) => dispatch(treeActions.drawSquares(value))}/>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="Draw triangles"
                                      value={props.renderProps.drawTriangles}
                                      onChange={(event,value) => dispatch(treeActions.drawTriangles(value))}/>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel control={<Checkbox defaultChecked  color="default"/>} 
                                      label="Fill figures"
                                      value={props.renderProps.fill}
                                      onChange={(event,value) => dispatch(treeActions.fill(value))}/>
                </Grid>
            </Grid>
            <List>
                <ListItem>
                    <ListItemText> Iteration number </ListItemText>
                    <Slider
                        step={1}
                        min={1}
                        max={!!props.renderProps.viewport ? 18 : 20}
                        marks
                        valueLabelDisplay="auto"
                        value={props.drawProps.depth}
                        onChange={(event, value) => dispatch(treeActions.setDepth(value as number))} />
                </ListItem>
                <ListItem>
                    <ListItemText> Angle </ListItemText>
                    <Slider step={0.001}
                        min={0.0001}
                        max={Math.PI / 2 - 0.0001}
                        value={props.drawProps.angle}
                        onChange={(event, value) => dispatch(treeActions.setAngle(value as number))} />
                </ListItem>
                <ListItem>
                    <ListItemText> Branch long </ListItemText>
                    <Slider step={0.001}
                        min={0}
                        max={4}
                        value={props.drawProps.branchLong}
                        onChange={(event, value) => dispatch(treeActions.setLong(value as number))} />
                </ListItem>
                <ListItem>
                    <ListItemText> Line Width </ListItemText>
                    <Slider step={0.001}
                        min={1}
                        max={10}
                        value={props.drawProps.lineWidth}
                        disabled={!!props.renderProps.fill}
                        onChange={(event, value) => dispatch(treeActions.setLineWidth(value as number))} />
                </ListItem>
                <ListItem>
                    <ListItemText> Root size </ListItemText>
                    <Slider step={1}
                        min={1}
                        max={600}
                        value={props.drawProps.rootSize}
                        disabled={!!props.renderProps.viewport}
                        onChange={(event, value) => dispatch(treeActions.setRootSize(value as number))} />
                </ListItem>
                <ListItem>
                    <ListItemText> X </ListItemText>
                    <Slider step={1}
                        min={0}
                        max={window.innerWidth}
                        value={props.drawProps.x}
                        disabled={!!props.renderProps.viewport}
                        onChange={(event, value) => dispatch(treeActions.setX(value as number))} />
                </ListItem>
                <ListItem>
                    <ListItemText> Y </ListItemText>
                    <Slider step={1}
                        min={0}
                        max={window.innerHeight * 1.5}
                        value={props.drawProps.y}
                        disabled={!!props.renderProps.viewport}
                        onChange={(event, value) => dispatch(treeActions.setY(value as number))} />
                </ListItem>
                <ListItem>
                    <ListPicker classes={{ listItemClicked: 'ActiveColor', listItemNotClicked: 'UnActiveColor' }}
                        colorList={ColorCollection}
                        onChangeHandle={(event, value) => dispatch(treeActions.setColorFunc(Number.parseInt(value)))}
                        colorFunction={props.drawProps.colorFunction}>
                    </ListPicker>
                </ListItem>
            </List>

    </div>
}