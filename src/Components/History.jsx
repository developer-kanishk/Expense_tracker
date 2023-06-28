import Transaction from './Transaction'
import { useReducer } from 'react'
import { useContext } from "react"
import MyContext from "../Context/MyContext"
import './History.css'

const customStyle={
    'debit':'#F96666',
    'credit':'#A2FF86'
}

function reducer(state,action){
    if(action.type==='on_add'){
        const newTrans = [...state.trans]
        const currT = {...action.payload}
        newTrans.push(currT)
        return {trans:newTrans}
    }
    if(action.type==='on_delete'){
        console.log(action.payload)
        const newTrans = state.trans.filter((e,index)=>{
            return (index!==parseInt(action.payload))
        })
        console.log(newTrans)
        return {trans:newTrans}
    }
}





const History = () => {
    const [state,dispatch] = useReducer(reducer,{trans:[]})
    const {BalanceDispatch} = useContext(MyContext)

    const handleDelete = (e)=>{
        const id = parseInt(e.target.id)
        const {amount,type} = state.trans[id]
        if(type==='credit'){
            BalanceDispatch({
                type:'on_decrement',
                payload:parseInt(amount)
            })
        }
        if(type==='debit'){
            BalanceDispatch({
                type:'on_increment',
                payload:parseInt(amount)
            })
        }

        dispatch({
            type:'on_delete',
            payload:e.target.id
        })
    }

    return (
        <div className='history-outer'>
            <h2>History</h2>
            <div className='history-inner'>
                <ul className="list-group">
                    {/* <li className="list-group-item active" aria-current="true">An active item</li> */}
                    {
                        state.trans.map((e,index)=>{
                            return(
                                <li className="list-group-item" key={index} style={{backgroundColor:customStyle[e.type]}}>
                                <div className='inside-label'>
                                    <div>{e.text} | ${e.amount} | {e.type}</div>
                                    <button className='mx-2 btn btn-warning' id={index} onClick={handleDelete}>Delete</button>
                                </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <Transaction BalanceDispatch={BalanceDispatch} HistoryDispatch={dispatch}/>
            </div>
        </div>
    )

}
export default History