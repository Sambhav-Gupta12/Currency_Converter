import { useState } from 'react'
import { InputBox } from './components/Index'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <>
      <div className="w-full h-screen flex flex-wrap -gap-127 
           justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1629172/pexels-photo-1629172.jpeg')`
        }}
      >

        <div className="w-full translate-y-20">
          <div className="w-full max-w-md mx-auto
          border-2 border-white rounded-lg p-5
          backdrop-blur-sm bg-white/30">
            <form onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOption={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type='button'
                  className='absolute left-1/2
                  -translate-x-1/2
                  -translate-y-1/2 border-2
                  border-white rounded-md
                  bg-blue-600 text-white px-2
                  py-0.5 pb-1.5 hover:bg-blue-500
                  cursor-pointer transition-colors duration-300 ease-in-out'
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOption={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button type='submit'
                className='w-full bg-blue-600 
              text-white px-4 py-3 rounded-lg
              hover:bg-blue-500
                cursor-pointer transition-colors duration-300 ease-in-out'>
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>

        <button onClick={() => { setAmount(0), setConvertedAmount(0) }}
          className=" w-40 h-10 rounded-full text-2xl text-black backdrop-blur-sm
        bg-white/30 border-2 border-white pb-1 -translate-y-5
        hover:bg-white/10 hover:text-black/85
          cursor-pointer transition-colors duration-300 ease-in-out">
          Reset
        </button>
      </div>
    </>
  )
}

export default App
