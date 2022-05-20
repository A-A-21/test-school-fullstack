import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers/rootReducer';
// import thunk from "redux-thunk";
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from "./saga/rootSaga";


// const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

// sagaMiddleware.run(rootSaga);
export default store;
