const data = {
    inputValue: '',
    list: [],
    index: 40,
    icon: []
}

export const bookReducer = (state=data, action) => {
    switch(action.type){
        case 'INPUT_CHANGE':
            return {...state, inputValue: action.value}
        case 'DISPLAY_LIST':
            return {...state, list: action.value};
        case 'SET_INDEX':
            return {...state, index: state.index + 40 }
        case 'SET_ICON':
            return {...state, icon: action.value};
        case 'FILTER_ITEMS':
          return{...state, list: state.list.filter(item => action.value.indexOf(item.etag) > -1)}
        default:
        return state;
    }
}