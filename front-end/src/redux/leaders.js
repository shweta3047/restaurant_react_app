import * as ActionTypes from './ActionTypes';

export const Leaders=(state={isLoading:true,errMess:null,leaders:[]},action)=>{
    switch(action.type){

        case ActionTypes.LEADERS_LOADING:
            return {isLoading:true,errMess:null,leaders:[]};

        case ActionTypes.LEADERS_FAILED:
            return {isLoading:false,errMess:action.payload,leaders:[]};

        case ActionTypes.ADD_LEADERS:
            return {isLoading:false,errMess:null,leaders:action.payload};

        default:
            return state;
    }
}