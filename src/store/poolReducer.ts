import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PoolProps } from "../components/canvas/poolCanvas.component";
import Store from "store";

const defaultPoolSettings: PoolProps = {
	angle: 0,
	iters: 100,
	n: 3,
	colorFunc: 0,
	scale: 1
}

export const PoolSlice = createSlice({
	name: 'poolSlice',
	initialState: Store.get('poolSettings', defaultPoolSettings) as PoolProps,
	reducers: {
		set: (state, payload: PayloadAction<PoolProps>) => {
			Object.assign(state, payload.payload)
		},
		setAngle: (state, payload: PayloadAction<number>) => {
			state.angle = payload.payload
		},
		setIters: (state, payload: PayloadAction<number>) => {
			state.iters = payload.payload
		},
		setN: (state, payload: PayloadAction<number>) => {
			state.n = payload.payload
		},
		setColorFunc: (state, payload: PayloadAction<number>) => {
			state.colorFunc = payload.payload
		},
		setScale: (state, payload: PayloadAction<number>) => {
			state.scale = payload.payload
		},
	}
})

export const poolReducer = PoolSlice.reducer
export const poolActions = PoolSlice.actions