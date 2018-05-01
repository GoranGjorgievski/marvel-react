import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import { rootEpic } from '../epics';

export function configureStore(preloadedState) {
    const epicMiddleware = createEpicMiddleware(rootEpic);

    return createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(
                createLogger(),
                epicMiddleware
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}
