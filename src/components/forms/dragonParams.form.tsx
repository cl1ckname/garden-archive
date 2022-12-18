import { List, ListItemText, ListItem, Slider } from "@material-ui/core"
import { useEffect } from "react"
import { ColorCollection } from "../../services/colorFunctionCollection"
import { ListPicker } from "./listPicker.form"
import Store from "store"
import { useSelector, useDispatch } from 'react-redux'
import { dragonActions } from "../../store/dragonReducer"
import { RootState } from "../../store"

export const DragonParams: React.FC = () => {
    const dispatch = useDispatch()
    const props = useSelector((state: RootState) => state.dragon)
    useEffect(() => {
		Store.set('dragonSettings', props )
	}, [props])
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
                        value={props.dragonParams.depth}
                        onChange={(event, value) => dispatch(dragonActions.setDepth(value as number))} />
                </ListItem>
                <ListItem>
                    <ListItemText> Angle </ListItemText>
                    <Slider step={0.001}
                        min={-Math.PI / 2}
                        max={Math.PI / 2}
                        marks={[{value: 0, label: '0'}]}
                        value={props.dragonParams.angle}
                        onChange={(event, value) => dispatch(dragonActions.setAngle(value as number))} />
                </ListItem>
                <ListItem>
                    <ListItemText> Line width </ListItemText>
                    <Slider step={0.001}
                        min={1}
                        max={10}
                        marks
                        value={props.dragonParams.width}
                        onChange={(event, value) => dispatch(dragonActions.setWidth(value as number))} />
                </ListItem>
                <ListItem>
                    <ListPicker classes={{ listItemClicked: 'ActiveColor', listItemNotClicked: 'UnActiveColor' }}
                        colorList={ColorCollection}
                        onChangeHandle={(event, value) => dispatch(dragonActions.setColorFunction(Number.parseInt(value)))}
                        colorFunction={props.dragonParams.colorFunction}>
                    </ListPicker>
                </ListItem>
            </List>
    </div>
}