import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import Store from "store"
import { List, ListItem, ListItemText, Slider } from "@material-ui/core"
import { mandelbrotActions } from "../../store/mandelbrotReducer"
import { ListPicker } from "./listPicker.form"
import { ColorCollection } from "../../services/colorFunctionCollection"

export const MandelbrotParams: React.FC = () => {
	const dispatch = useDispatch()
	const props = useSelector((state: RootState) => state.mandelbrot)
	useEffect(() => {
		Store.set('mandelbrotSettings', props)
	}, [props])
	return <div>
		<List>
			<ListItem>
				<ListItemText> Iteration number </ListItemText>
				<Slider
					step={10}
					min={100}
					max={2000}
					marks
					valueLabelDisplay="auto"
					value={props.n}
					onChange={(event, value) => dispatch(mandelbrotActions.setN(value as number))} />
			</ListItem>
			<ListItem>
                    <ListPicker classes={{ listItemClicked: 'ActiveColor', listItemNotClicked: 'UnActiveColor' }}
                        colorList={ColorCollection}
                        onChangeHandle={(event, value) => dispatch(mandelbrotActions.setColorFunc(Number.parseInt(value)))}
                        colorFunction={props.colorFunc}>
                    </ListPicker>
                </ListItem>
		</List>
	</div>
}