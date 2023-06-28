import { useReducer,useEffect } from "react"
import './Transaction.css'


function Reducer(state,action){


    if(action.type.includes('on_change')){
        
        const name = action.type.split('_').pop()
        if(name==='button'){
            return {
                ...state,
                status:action.payload
            }
        }
        else{
            return {
                ...state,
                [name]:action.payload
            }
        }
    }
    if(action.type==='on_submit'){
        // console.log(state)
        return {text:'',amount:'',type:'none',status:false}
    }
}



const Transaction = ({BalanceDispatch,HistoryDispatch})=>{


    const [state,dispatch] = useReducer(Reducer,{text:'',amount:'',type:'none',status:true})

    

    useEffect(()=>{
        const {text,amount,type} = state
        if(text.length>0 && parseInt(amount)>0 && type!=='none'){
            dispatch({type:'on_change_button',payload:false})
        }
        else dispatch({type:'on_change_button',payload:true})
    },[state.text,state.amount,state.type])


    const handleChange = (e)=>{
        const type = 'on_change_' + e.target.name
        console.log(type)
        dispatch({
            payload:e.target.value,
            type:type
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        //dispatching to balance reducer
        if(state.type==='debit'){
            BalanceDispatch({
                type:'on_decrement',
                payload:parseInt(state.amount)
            })
        }
        if(state.type==='credit'){
            BalanceDispatch({
                type:'on_increment',
                payload:parseInt(state.amount)
            })
        }
        HistoryDispatch({
            type:'on_add',
            payload:{
                text:state.text,
                amount:parseInt(state.amount),
                type:state.type
            }
        })
        //transaction reducer
        dispatch({
            type:'on_submit'
        })
    }


    return (
        <div className='trans-div'>
            <h2>Add new transaction</h2>
            <div className='trans-div-inner'>    
                <form onSubmit={handleSubmit}>
                    <input type='text' name='text' value={state.text} onChange={handleChange} autoComplete='off'/>
                    <input type='number' name='amount' value={state.amount} onChange={handleChange} min="0"/>
                    <select value={state.type} onChange={handleChange} name='type'>
                        <option value='none'>Select type</option>
                        <option value='debit'>Debit | -</option>
                        <option value='credit'>Credit | +</option>
                    </select>
                    <button type='submit' className="btn btn-primary" disabled={state.status}>Add Transaction</button>
                </form>
            </div>
        </div>
    )
}

export default Transaction