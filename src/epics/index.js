import { combineEpics } from 'redux-observable';

import { fetchHeroes, changePage, search } from './fetchHeroes';

export const rootEpic = combineEpics(
  changePage,
  fetchHeroes,
  search
);
