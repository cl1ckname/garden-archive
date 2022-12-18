import { configureStore } from '@reduxjs/toolkit'
import { dragonReducer } from './dragonReducer'
import { treeReducer } from './treeReducer'

export const store = configureStore({
  reducer: {
	  tree: treeReducer,
    dragon: dragonReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch