// import googleApi from '../api/googleApi';

// const KEY: 'AIzaSyCyZIXzX8n9nIduM6BFbAOR3KaT1Ll1_2w'

// export const fetchBook = () => {
//     return async function(dispatch, getState) {
//         const response = await googleApi.get('./name');

//         dispatch({ type: 'FETCH_BOOK', value: response})
//     };
// };

export const onInputChange = (value) => ({
    type: 'INPUT_CHANGE',
    value
})

export const setDisplayList = (value) => ({
    type: 'DISPLAY_LIST',
    value
})

export const setIndex = () => ({
    type: 'SET_INDEX'
})

export const setBookmarkIcon = (value) => ({
  type: 'SET_ICON',
  value
})

export const filterBooks = (value) => ({
  type: 'FILTER_ITEMS',
  value
})

