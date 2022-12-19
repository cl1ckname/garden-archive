import { configureStore } from '@reduxjs/toolkit'
import { dragonReducer } from './dragonReducer'
import { poolReducer } from './poolReducer'
import { treeReducer } from './treeReducer'

export const store = configureStore({
  reducer: {
	  tree: treeReducer,
    dragon: dragonReducer,
    pool: poolReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch