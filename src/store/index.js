import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./ducks";
import rootSaga from "./sagas";

const middleware = [];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middleware.push(sagaMiddleware);

const composer = __DEV__
  ? compose(applyMiddleware(...middleware), console.tron.createEnhancer())
  : applyMiddleware(...middleware);

const store = createStore(rootReducer, composer);

sagaMiddleware.run(rootSaga);

export default store;
