import * as ActionTypes from './ActionTypes';
import {initialFeedback} from './forms';

export const Feedback=(state=initialFeedback,action)=>{
    switch(action.type){
        case ActionTypes.ADD_FEEDBACK:
            var feedback=action.payload;
            console.log("feedback: ",feedback);
            return {...state,state:state.concat(feedback)};

        default:
            return state;
    }
}