import { applyMiddleware, createStore } from 'redux'
import { weatherDataReducer } from './reducers'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

export const store = createStore(weatherDataReducer, composeWithDevTools(applyMiddleware(thunk)))

// get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = typeof store['getState'] // wrong!
/* 
  We need the RootState to get the type of the RETURN VALUE of store['getState'], not the type of the 
  function itself
*/
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
