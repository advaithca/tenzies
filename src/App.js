import './App.css';
import Die from './components/Die';
import React from 'react';
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dieNums, setDieNums] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(()=>{
    let x = dieNums[0].value
    let i = 0
    for(i = 0; i < 10; i++) {
      if(x===dieNums[i].value && dieNums[i].isHeld){
        continue
      }else{
        break
      }
    }
    if(i===10) {
      setTenzies(true)
    }
  },[dieNums])
  const dice = dieNums.map((num)=>(
        <Die 
            value={num.value} 
            isHeld={num.isHeld} 
            key={num.id}
            id={num.id}
            style={ num.isHeld ? {"backgroundColor": "#59e391"} : {} }
            holdDice = {holdDice}
          />
  ))

  function allNewDice(){
    return [...Array(10)].map(()=>(
        {
          value: Math.ceil(Math.random()*6),
          isHeld: false,
          id: nanoid()
        }
      ))
  }

  function holdDice(id, event) {
    setDieNums((prevDieNums)=>(
      prevDieNums.map((nums) => (nums.id === id ? {isHeld:!nums.isHeld,value:nums.value,id:nums.id} : nums))
    ))
  }

  function clickDie() {
    setDieNums(((prevDieNums)=>{
      const newDieNums = allNewDice()
      for(let i=0; i < 10; ++i){
        if(prevDieNums[i].isHeld === true){
          newDieNums[i] = prevDieNums[i]
        }
      }
      return newDieNums
    }))
  }

  function newGame() {
    setDieNums(allNewDice())
    setTenzies(false)
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <div className='text'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='Dice'>
        {dice}
      </div>
      <button className='roll-dice' onClick={tenzies? newGame : clickDie}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
