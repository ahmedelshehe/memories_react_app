import {FETCH_ALL ,CREATE ,DELETE ,UPDATE, LIKE ,SEARCH} from '../constants/actionTypes'
export default (state = [], action) =>{
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case CREATE:
            return [...state ,action.payload];
        case SEARCH:
            return {...state ,
                posts:action.payload
        };
        case UPDATE:
        case LIKE:
            return state.map((post) => post._id === action.payload._id ?action.payload :post); 
        case DELETE:
            return state.filter((post) => post._id !== action.payload);
        default:
            return state;
    }
}