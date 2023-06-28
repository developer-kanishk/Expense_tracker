import BalanceContext from './Context/BalanceContext'
import Balance from './Components/Balance'
import History from './Components/History'
import './App.css'

const App = ()=>{

  return (
    <BalanceContext>
      <div className='container'>
        <h1 className='header'>Expense Tracker</h1>
        <div className='inner-container'>
          <Balance/>
          <History/>
        </div>

      </div>
    </BalanceContext>
  )
}
export default App