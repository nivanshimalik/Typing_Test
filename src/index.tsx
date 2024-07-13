import React from "react"; 
import ReactDOM from "react-dom"; 
import { Provider } from "react-redux"; 
import App from "App"; 
import { store } from "./store/store"; // Importing Redux store configuration from store directory
import "index.scss"; // Importing global styles for the application

ReactDOM.render( // Rendering the application to the DOM
    <React.StrictMode> 
        <Provider store={store}> 
            <App /> 
        </Provider> 
    </React.StrictMode>, // Closing StrictMode
    document.getElementById("root") // Mounting the application to the DOM element with id "root"
);
