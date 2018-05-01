//note if there were mutiple reducers, naming this like the reducer file name would help
// for exmaple heroes.test.js
import reducer, { INITIAL_STATE } from '../index';
import {
    FETCH_HEROES_FULLFILLED,
} from '../../constants';

describe('index reducers', () => {
    it('should return the initial state', () => {
        const initialReducer = reducer(INITIAL_STATE, {});
        expect(initialReducer).toEqual(INITIAL_STATE);
    });

    it('should handle FETCH_HEROES_FULLFILLED', () => {
        const initialReducer = reducer(INITIAL_STATE, {
            type: FETCH_HEROES_FULLFILLED,
            payload: {
                data: {
                    results: [],
                }
            },
        });

        expect(initialReducer.isFetching).toBe(false);
    });
});
