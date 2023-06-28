import { useReducer } from "react";
import MyContext from "./MyContext";

function reducer(state,action){
    if(action.type==='on_increment'){
        return {
            balance:state.balance+action.payload
        }
    }
    if(action.type==='on_decrement'){
        return {
            balance:state.balance-action.payload
        }
    }
}

const BalanceContext = ({children})=>{

    const [state,dispatch] = useReducer(reducer,{balance:0})

    return (
        <MyContext.Provider value={{balance:state.balance,BalanceDispatch:dispatch}}>
            {children}
        </MyContext.Provider>
    )
}

export default BalanceContext