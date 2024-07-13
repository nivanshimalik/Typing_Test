import { RefObject } from "react"; // Import RefObject type from React for typing references
import { AnyAction, combineReducers } from "redux"; // Import AnyAction type and combineReducers function from redux
import {
    SET_CHAR,
    SET_WORD,
    TIMER_DECREMENT,
    TIMERID_SET,
    TIMER_SET,
    APPEND_TYPED_HISTORY,
    PREV_WORD,
    SET_WORDLIST,
    SET_THEME,
    SET_TIME,
    SET_REF,
    SET_CARET_REF,
    SET_TYPE,
} from "./actions"; // Import action type constants from the actions module

// Define the structure of the application state
export interface State {
    preferences: {
        theme: string; // User-selected theme
        timeLimit: number; // Time limit for the test
        type: string; // Type of words used in the test
    };
    word: {
        currWord: string; // Current word being typed
        typedWord: string; // Word typed by the user
        typedHistory: string[]; // History of typed words
        wordList: string[]; // List of words to type
        activeWordRef: RefObject<HTMLDivElement> | null; // Reference to the active word element
        caretRef: RefObject<HTMLSpanElement> | null; // Reference to the caret element
    };
    time: {
        timer: number; // Timer value
        timerId: NodeJS.Timeout | null; // ID of the timer interval
    };
}

// Define the initial state of the application
export const initialState: State = {
    preferences: {
        theme: "",
        timeLimit: 0,
        type: "",
    },
    word: {
        currWord: "",
        typedWord: "",
        typedHistory: [],
        wordList: [],
        activeWordRef: null,
        caretRef: null,
    },
    time: {
        timer: 1,
        timerId: null,
    },
};

// Reducer to handle time-related actions
const timerReducer = (
    state = initialState.time,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case TIMER_DECREMENT:
            return { ...state, timer: state.timer - 1 }; // Decrement the timer
        case TIMER_SET:
            return { ...state, timer: payload }; // Set the timer value
        case TIMERID_SET:
            return { ...state, timerId: payload }; // Set the timer ID
        default:
            return state; // Return current state if action type doesn't match
    }
};

// Reducer to handle word-related actions
const wordReducer = (
    state = initialState.word,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case SET_CHAR:
            return { ...state, typedWord: payload }; // Set the typed word
        case SET_WORD:
            return { ...state, typedHistory: [...state.typedHistory, payload] }; // Append a word to typed history
        case APPEND_TYPED_HISTORY:
            const nextIdx = state.typedHistory.length + 1; // Calculate the next index
            return {
                ...state,
                typedWord: "",
                currWord: state.wordList[nextIdx], // Set the current word to the next word in the list
                typedHistory: [...state.typedHistory, state.typedWord], // Append the current typed word to history
            };
        case PREV_WORD:
            const prevIdx = state.typedHistory.length - 1; // Calculate the previous index
            return {
                ...state,
                currWord: state.wordList[prevIdx], // Set the current word to the previous word in the list
                typedWord: !payload ? state.typedHistory[prevIdx] : "", // Set the typed word based on the payload
                typedHistory: state.typedHistory.splice(0, prevIdx), // Update the typed history
            };
        case SET_REF:
            return {
                ...state,
                activeWordRef: payload, // Set the active word reference
            };
        case SET_CARET_REF:
            return {
                ...state,
                caretRef: payload, // Set the caret reference
            };
        case SET_WORDLIST:
            const areNotWords = payload.some((word: string) =>
                word.includes(" ")
            ); // Check if the payload contains non-word elements
            var shuffledWordList: string[] = payload.sort(
                () => Math.random() - 0.5
            ); // Shuffle the word list
            if (areNotWords)
                shuffledWordList = payload.flatMap((token: string) =>
                    token.split(" ")
                ); // Flatten the word list if it contains non-word elements
            return {
                ...state,
                typedWord: "",
                typedHistory: [],
                currWord: shuffledWordList[0], // Set the current word to the first word in the shuffled list
                wordList: shuffledWordList, // Update the word list
            };
        default:
            return state; // Return current state if action type doesn't match
    }
};

// Reducer to handle preference-related actions
const preferenceReducer = (
    state = initialState.preferences,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case SET_THEME:
            return { ...state, theme: payload }; // Set the theme
        case SET_TIME:
            return {
                ...state,
                timeLimit: payload, // Set the time limit
            };
        case SET_TYPE:
            return {
                ...state,
                type: payload, // Set the type of words
            };
        default:
            return state; // Return current state if action type doesn't match
    }
};

// Combine the reducers into a single root reducer
export default combineReducers({
    time: timerReducer,
    word: wordReducer,
    preferences: preferenceReducer,
});
