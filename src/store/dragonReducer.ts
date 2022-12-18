import { DragonCanvasProps } from "../components/canvas/dragonCanvas.component";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Store from "store"

const defaultDragonCanvasProps: DragonCanvasProps = {
	dragonParams: {
		depth: 3,
		angle: Math.PI / 4,
		width: 1,
		colorFunction: 1
	}
}

export const dragonSlice = createSlice({
	name: 'dragonSlice',
	initialState: Store.get('dragonSettings', defaultDragonCanvasProps) as DragonCanvasProps,
	reducers: {
		dragonSettings: (state, payload: PayloadAction<DragonCanvasProps>) => {
			Object.assign(state.dragonParams, payload.payload)
		},
		set: (state, payload: PayloadAction<DragonCanvasProps>) => {
			Object.assign(state, payload.payload)
		},
		setDepth: (state, payload: PayloadAction<number>) => {
			state.dragonParams.depth = payload.payload
		},
		setAngle: (state, payload: PayloadAction<number>) => {
			state.dragonParams.angle = payload.payload
		},
		setWidth: (state, payload: PayloadAction<number>) => {
			state.dragonParams.width = payload.payload
		},
		setColorFunction: (state, payload: PayloadAction<number>) => {
			state.dragonParams.colorFunction = payload.payload
		},
	}
})

export const dragonActions = dragonSlice.actions
export const dragonReducer =  dragonSlice.reducer
