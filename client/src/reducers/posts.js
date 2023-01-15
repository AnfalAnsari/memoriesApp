import {
    FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING,
    END_LOADING,
    FETCH_POST
} from "../constants/actionType";

export default (state = { isLoading: true, posts: [] }, action) => {

    switch (action.type) {

        case START_LOADING:
            return { ...state, isLoading: true }

        case END_LOADING:
            return { ...state, isLoading: false }

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.posts,
                numberOfPages: action.payload.numberOfPages
            };

        case FETCH_POST:
            return {
                ...state, post: action.payload
            }

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.posts };

        case CREATE:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => action.payload._id === post._id ? action.payload : post) };

        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload._id) };

        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id !== action.payload._id ? post : action.payload) }

        default:
            return state;
    }
}