/* NOTE : Since it is only one simple app I am not using combineReducers */

import {
  FETCH_HEROES_FULLFILLED,
  TOGGLE_BOOKMARK,
  NEXT_PAGE,
  PREV_PAGE,
  SEARCH,
} from '../constants';


export const INITIAL_STATE = {
  heroes: [],
  bookmarks: [],
  currentPage: 0,
  total: 0,
  isFetching: true,
  search: '',
};

const todo = {

  //initial fetch heroes
  [FETCH_HEROES_FULLFILLED]: (state, action) => {
    
    let withBookmark = action.payload.data.results.map(item => {
      const isBookmarked = state.bookmarks.includes(item.id);
      return {
        ...item,
      bookmarked: isBookmarked,
      }
    });

    return {
      ...state,
      heroes: withBookmark,
      isFetching: false,
      total: action.payload.data.total,
    }
  },

  //change bookmarked status
  [TOGGLE_BOOKMARK]: (state, action) => {

    let newBookmarks = [];
    if(state.bookmarks.includes(action.payload.id)){
     newBookmarks = state.bookmarks.filter(item => item !== action.payload.id);
    }else{
      newBookmarks = [...state.bookmarks, action.payload.id];
    }

    let withToggledBookmark = state.heroes.map(item => {
      if(item.id === action.payload.id){
        return {
          ...item,
          bookmarked: 1-item.bookmarked,
        }
      }

      return item;
    });
    
    return {
      ...state,
      heroes: withToggledBookmark,
      bookmarks: newBookmarks,
    }
  },

  //PAGE CHANGE
  [NEXT_PAGE]: (state, action) => {
    return {
      ...state,
      isFetching: true,
      currentPage: state.currentPage+1, // need to check whether their api handles the last page, or it must be handled on FE
    }
  },
  [PREV_PAGE]: (state, action) => {
    if(state.currentPage !== 0){
      return {
        ...state,
        isFetching: true,
        currentPage: state.currentPage -1,
      }
    }

    return state;
  },

  [SEARCH]: (state, action) => {
    return {
      ...state,
      search: action.payload.search
    }
  }
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  const fn = todo[action.type];
  return fn ? fn(state, action) : state;
}
