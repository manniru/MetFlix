import {
    CAN_PERFORM_SEARCH,
    CANCEL_SEARCH, SEARCH_CANCELED,
    SEARCH_ERROR, SEARCH_PENDING, SEARCH_SUCCESS, SET_QUERY,
} from '~/actions/search-action/types';
import {SearchreducerType} from "~/types/SearchreducerType";

const INITIAL_STATE: SearchreducerType = {
    query: '',
    searching: false,
    has_results: false,
    search_results: [],
    search_canceled: false
};

export default (state = INITIAL_STATE, {type, payload}: { type: any; payload: any }) => {
    switch (type) {

        // When search in progress
        case SEARCH_PENDING:
            return {...state, searching: true};

        // When search return success
        case SEARCH_SUCCESS:
            return {
                ...state,
                searching: false,
                search_results: payload,
                has_results: payload.length != 0
            };

        // On search error
        case SEARCH_ERROR:
            return {...state, searching: false, search_results: [], has_results: false};

        // When user cancel search
        case CANCEL_SEARCH:
            return {...state, searching: false, has_results: false, search_results: []};

        // On search canceled
        case SEARCH_CANCELED:
            return {...state, searching: false, has_results: false, search_results: [], search_canceled: true};

        // Indicate wether search can be done
        case CAN_PERFORM_SEARCH:
            return {...state, searching: true, search_canceled: false};

        // For debugging purpose. set this value to show the request url
        case SET_QUERY:
            return {...state, query: payload};

        // on defqult cqse, return the stqte
        default:
            return state;
    }
};
