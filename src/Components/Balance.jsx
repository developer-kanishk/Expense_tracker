import { useContext } from 'react'
import MyContext from '../Context/MyContext'
import './Balance.css'

const Balance = ()=>{
    const {balance} = useContext(MyContext)
    console.log(balance)
    return (
        <div className='outer-div'>
            <h4>Your Balance:</h4>
            <h1>${balance}</h1>
        </div>
    )
}

export default Balance   