import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/debounceTime';

import {
  API_KEY,
  FETCH_HEROES,
  NEXT_PAGE,
  PREV_PAGE,
  SEARCH
 } from './../constants';

 import {
   fetchHeroesFullfilled,
 } from '../actions';


export const fetchHeroes = (action$, store) =>
  action$.ofType(FETCH_HEROES)
      .mergeMap(action => {
        let offset = store.getState().currentPage * 20; //would be best to add the '20' in a constant, but since its a small app and used only once i won't
        let search = store.getState().search;
        let url = (search !== '' ? 
        `https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}&offset=${offset}&nameStartsWith=${search}` :
        `https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}&offset=${offset}`);

        return ajax.getJSON(url)
          .map(response => fetchHeroesFullfilled(response))
      }
        
  );
//NOTE: Prev shouldnt actually send a request to load again, because we already have the items
// but tahts an optimization and will require me a bit more time. Also if you go Next on a page you've already loaded,
// there is no point in sending a request again. Can show an code example how I modified react-table and achieved this if needed.
export const changePage = action$ =>
  action$.filter(action => {
    return action.type === PREV_PAGE ||
           action.type === NEXT_PAGE;
  }).mapTo({type: FETCH_HEROES});

export const search = action$ =>
  action$.ofType(SEARCH)
  .debounceTime(250)
  .mapTo({type: FETCH_HEROES});