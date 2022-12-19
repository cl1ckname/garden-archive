import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import Store from "store"
import { List, ListItem, Slider } from "@material-ui/core"
import { ListItemText } from "@material-ui/core"
import { poolActions } from "../../store/poolReducer"
import { ListPicker } from "./listPicker.form"
import { ColorCollection } from "../../services/colorFunctionCollection"


export const PoolParams: React.FC = () => {
	const dispatch = useDispatch()
	const props = useSelector((state: RootState) => state.pool)
	useEffect(() => {
		Store.set('poolSettings', props)
	}, [props])

	return <div>
		<List>
			<ListItem>
				<ListItemText> Iteration Number </ListItemText>
				<Slider 
					step={10}
					min={10}
					max={300}
					value={props.iters}
					onChange={(event, value) => dispatch(poolActions.setIters(value as number))}>
				</Slider>
			</ListItem>
			<ListItem>
				<ListItemText> Angle </ListItemText>
				<Slider 
					step={Math.PI / 180}
					min={0}
					max={2 * Math.PI}
					value={props.angle}
					onChange={(event, value) => dispatch(poolActions.setAngle(value as number))}>
				</Slider>
			</ListItem>
			<ListItem>
				<ListItemText> N </ListItemText>
				<Slider 
					step={1}
					min={1}
					max={12}
					value={props.n}
					onChange={(event, value) => dispatch(poolActions.setN(value as number))}>
				</Slider>
			</ListItem> 
			<ListItem>
				<ListPicker classes={{ listItemClicked: 'ActiveColor', listItemNotClicked: 'UnActiveColor' }}
					colorList={ColorCollection}
					onChangeHandle={(event, value) => dispatch(poolActions.setColorFunc(Number.parseInt(value)))}
					colorFunction={props.colorFunc}>
				</ListPicker>
			</ListItem>
		</List>
	</div>

}

