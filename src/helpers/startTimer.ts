import { setTimerId, timerDecrement } from "store/actions"; 
import { store } from "store/store"; 

export const startTimer = () => {
    const { dispatch } = store; 
    
    const timerId = setInterval(() => { // Set up a timer to run every second
        dispatch(timerDecrement()); 
    }, 1000); 
    
    dispatch(setTimerId(timerId)); 
};
