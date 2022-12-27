import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MandelbrotProps } from "../components/geometric/mandelbrot.component";
import Store from "store"

const defaultMandelbrotSettings: MandelbrotProps = {
	x: 0,
	y: 0,
	scale: 1,
	n: 2000,
	colorFunc: 1,
}

export const MandelbrotSlice = createSlice({
	name: 'mandelbrotSlice',
	initialState: Store.get('mandelbrotSettings', defaultMandelbrotSettings) as MandelbrotProps,
	reducers: {
		setPoint: (state, payload: PayloadAction<{x: number, y: number}>) => {
			Object.assign(state, payload.payload)
		},
		setScale: (state, payload: PayloadAction<number>) => {
			state.scale = payload.payload
		},
		setN: (state, payload: PayloadAction<number>) => {
			state.n = payload.payload
		},
		setColorFunc: (state, payload: PayloadAction<number>) => {
			state.colorFunc = payload.payload
		},
		reset: (state) => {
			Object.assign(state, defaultMandelbrotSettings)
		}
	}
})

export const mandelbrotReducer = MandelbrotSlice.reducer
export const mandelbrotActions = MandelbrotSlice.actions