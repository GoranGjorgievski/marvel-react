import {
  FETCH_HEROES,
  FETCH_HEROES_FULLFILLED,
  TOGGLE_BOOKMARK,
  NEXT_PAGE,
  PREV_PAGE,
  SEARCH
 } from './../constants';

export const fetchHeroes = () => {
  return {
    type: FETCH_HEROES,
  }
}


export const fetchHeroesFullfilled = (data) => {
  return {
    type: FETCH_HEROES_FULLFILLED,
    payload: data
  }
}

export const toggleBookmark = (id) => {
  return {
    type: TOGGLE_BOOKMARK,
    payload: {
      id
    },
  }
};

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  }
};


export const prevPage = () => {
  return {
    type: PREV_PAGE,
  }
};

export const search = (input) => {
  return {
    type: SEARCH,
    payload: {
      search: input,
    }
  }
}