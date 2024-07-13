import reducer from "./reducer"; // Import the root reducer from the reducer module

import { createStore } from "redux"; // Import the createStore function from Redux

// Create a Redux store using the root reducer and enable Redux DevTools extension
export const store = createStore(
    reducer, // Pass the root reducer to createStore function
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && // Check if Redux DevTools extension is available
        (window as any).__REDUX_DEVTOOLS_EXTENSION__() // Enable Redux DevTools extension
);
