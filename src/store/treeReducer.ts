import { TreeCanvasProps } from "../components/canvas/treeCanvas.component"
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TreeDrawParams } from "../components/canvas/treeCanvas.component"
import Store from "store"

const defaultTreeSettings: TreeCanvasProps = {
	drawProps: {
		x: window.innerWidth / 2,
		y: window.innerHeight * 2 / 3,
		angle: Math.PI / 4,
		depth: 3,
		rootSize: 100,
		colorFunction: 1,
		branchLong: 1,
		lineWidth: 3
	},
	renderProps: {
		viewport: true,
		drawSquares: true,
		drawTriangles: true,
		fill: true,
	}
}


export const treeSlice = createSlice({
	name: 'treeSlice',
	initialState: Store.get('treeSettings', defaultTreeSettings) as TreeCanvasProps,
	reducers: {
		treeSettings: (state, payload: PayloadAction<TreeDrawParams>) => {
			Object.assign(state.drawProps, payload.payload)
		},
		set: (state, payload: PayloadAction<TreeCanvasProps>) => {
			Object.assign(state, payload.payload.drawProps)
		},
		setDepth: (state, payload: PayloadAction<number>) => {
			state.drawProps.depth = payload.payload
		},
		setAngle: (state, payload: PayloadAction<number>) => {
			state.drawProps.angle = payload.payload
		},
		setLong: (state, payload: PayloadAction<number>) => {
			state.drawProps.branchLong = payload.payload
		},
		setLineWidth: (state, payload: PayloadAction<number>) => {
			state.drawProps.lineWidth = payload.payload
		},
		setColorFunc: (state, payload: PayloadAction<number>) => {
			state.drawProps.colorFunction = payload.payload
		},
		setRootSize: (state, payload: PayloadAction<number>) => {
			state.drawProps.rootSize = payload.payload
		},
		setX: (state, payload: PayloadAction<number>) => {
			state.drawProps.x = payload.payload
		},
		setY: (state, payload: PayloadAction<number>) => {
			state.drawProps.y = payload.payload
		},
		useVieport: (state, payload: PayloadAction<boolean>) => {
			state.renderProps.viewport = payload.payload
		},
		drawSquares: (state, payload: PayloadAction<boolean>) => {
			state.renderProps.drawSquares = payload.payload
		},
		drawTriangles: (state, payload: PayloadAction<boolean>) => {
			state.renderProps.drawTriangles = payload.payload
		},
		fill: (state, payload: PayloadAction<boolean>) => {
			state.renderProps.fill = payload.payload
		},
	}
})

export const treeActions = treeSlice.actions
export const treeReducer =  treeSlice.reducer
