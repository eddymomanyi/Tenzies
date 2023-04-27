import React from 'react'
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import  useWindowSize  from 'react-use-window-size'


function App() {
  const[dice, setDice] = useState(allNewDice())

  const[tenzies, setTenzies] = useState(false)
  
  const {width, height} = useWindowSize()

  useEffect(()=> {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value===firstValue)

    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You won")
    }
  
  }, [dice])
  
  function generateNewDie(){
    return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice=[]
    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  
  
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id===id ? 
      {...die, isHeld: !die.isHeld} : 
      die
    }))
  }

  const diceElements = dice.map(die => (
    <Die 
    hold={() => holdDice(die.id)} 
    key={die.id}  
    held={die.isHeld} 
    value={die.value}
    />
  ))

  function rollDice(){
    if(tenzies){
      setTenzies(false)
      setDice(allNewDice())
    } 
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()}
    ))
  }


  return (
    <>
    <main>
      {tenzies && <Confetti width={width} height={height} />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. 
    Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}> {tenzies ? "New Game" : "Roll"} </button>
    </main>
    </>
  )
}

export default App
