import React, { Component } from 'react'
import './App.css'
import Square from './components/Square'
import abides from './img/abides.jpeg'
import the_jesus from './img/the_jesus.jpeg'
import zero from './img/zero.jpeg'
import pins from './img/pins.jpeg'

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      board: ["?", "?", "?", "?", "?", "?", "?", "?", "?"],
      treasureLocation: null,
      bombLocation: null,
      guesses: 5,
      gameStatus: null,
      gameDone: false,
      quotes: ["There's a beverage here man.",          
                "That's just like, your opinion man",
                "The dude abides",
                "I don't roll on Shabbos!"]
    }
  }

  // React lifecycle method. Called when component is mounted
  componentDidMount() {
    this.setUpBoard()
  }

  // Sets up the board. Called when component mounts or with play again button
  setUpBoard = () => {
    let treasure = Math.floor(Math.random() * this.state.board.length)
    let bomb;
    
    // Set the bomb location to a position that's not the treasure
    do {
      bomb = Math.floor(Math.random() * this.state.board.length)
    } while (treasure === bomb);

    //maps over array of squares with images
    this.setState({
      board: [ pins, pins, pins, pins, pins, pins, pins, pins, pins],
      treasureLocation: treasure,
      bombLocation: bomb,
      guesses: 5,
      gameStatus: "",
      gameDone: false
    })
  }

  // Handles gameplay and updates the board.
  handleGamePlay = (index) => {
    const {board} = this.state
    let currentStatus = this.state.gameStatus
    let currentGuesses = this.state.guesses
    let endGame = false

    // Return if the game is over
    if (this.state.gameDone) {
      return "That rug really tied the room together"
    }

    // Display a palm tree, treasure, or bomb at the square
    // Updates the game status
    if(index === this.state.treasureLocation) {
      board[index] = abides
      currentStatus = "The Dude Abides."
      endGame = true
    } else if (index === this.state.bombLocation) {
      board[index] = zero
      currentStatus = "Mark it ZERO!"
      endGame = true
    } else {
      board[index] = the_jesus
      currentStatus = ""
      --currentGuesses
      // Check guesses and update status if no more guesses
      if (currentGuesses === 0){
        currentStatus = "That rug really tied the room together"
        endGame = true
      }
    }
    
    this.setState({
      board: board,
      guesses: currentGuesses,
      gameStatus: currentStatus,
      gameDone: endGame
    })
  }

  // Displays the play again button if game is done
  isGameDone = () => {
    if (this.state.gameDone) {
      return (
        <h2>Shut the fuck up Donny.</h2>
      )
    }
  }

  render(){
    return(
      <>
      <br></br><br></br><br></br>
      <div class="wrapper">
        <div class="box1" id="gameboard">
          {this.state.board.map((val, idx) => {
            return (
              <Square
                key={idx}
                img_url={val}
                value={val}
                index={idx}
                handleGamePlay={this.handleGamePlay}
              />
            )
          })}
          
        </div>
           <div class="box2">
             <div class="scorebox">
              <h1>The Dude Abides</h1>
              <br></br>
              <button type="button" onClick={this.setUpBoard}>Let's Roll</button>
              <h4>Guesses Left: {this.state.guesses}</h4>
              <h3>{this.state.gameStatus}</h3>
             </div>
              <div>
                <br></br>
                <h1>{this.state.quotes[this.state.guesses-1]}</h1>
              </div>
            </div>
      </div>
    </>
            )
          }
        }
        
export default App
