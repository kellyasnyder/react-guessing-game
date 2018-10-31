import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      tries: 0,
      standardGames: 0,
      expertGames: 0,
      standardHigh: 0,
      expertHigh: 0,
      number: null,
      guess: null,
      message: "",
      title: "",
      difficulty: ""
    }
  }

  resetGame = () => {
    this.setState({
      difficulty: "",
      guess: null,
      number: null,
      message: "",
      tries: 0,
      expertHigh: 0,
      standardHigh: 0
    });
  }

  defaultValues = () => {
    this.setState({
      difficulty: "",
      guess: null,
      number: null,
      message: "",
      tries: 0
    });
  };

  standardGame = () => {
    this.defaultValues();
    let standard = Math.floor(Math.random() * 10) + 1;

    this.setState({
      difficulty: "standard",
      title: "Guess a number between 1 and 10",
      number: standard,
      standardGames: this.state.standardGames + 1,
      message: ""
    })
  }

  expertGame = () => {
    this.defaultValues();
    let expert = Math.floor(Math.random() * 100) + 1;

    this.setState({
      difficulty: "expert",
      title: "Guess a number between 1 and 100",
      number: expert,
      expertGames: this.state.expertGames + 1,
      message: ""
    })
  }

  actualGame = () => {
    if (Number(this.state.guess) === this.state.number) {
      this.setState({
        message: `Congratulations! It took you ${this.state.tries} ${
          this.state.tries === 1 ? "guess" : "guesses"
        }!`
      })
      this.handleHighScore();
    } else if (Number(this.state.guess) > this.state.number) {
      this.setState({
        message: "Guess lower.",
        tries: this.state.tries + 1
      })
    } else if (Number(this.state.guess) < this.state.number) {
      this.setState({
        message: "Guess higher.",
        tries: this.state.tries + 1
      })
    }
  }

  handleHighScore = () => {
    if (this.state.standardGames === 1) {
      this.setState({ standardHigh: this.state.tries })
    } else if (this.state.expertGames === 1) {
      this.setState({ expertHigh: this.state.tries })
    }
    if (
      this.state.standardGames > 1 &&
      this.state.tries <= this.state.standardHigh &&
      this.state.difficulty === "standard"
    ) {
      this.setState({ standardHigh: this.state.tries });
    } else if (
      this.state.expertGames > 1 &&
      this.state.tries <= this.state.expertHigh &&
      this.state.difficulty === "expert"
    ) {
      this.setState({ expertHigh: this.state.tries })
    }``
  };

  handleChange = (e) => {
    e.preventDefault();
  }

  handleSubmit = (e) => {
    let guess = document.getElementById('input').value;
    e.preventDefault();

    this.setState({guess: guess}, () => {this.actualGame()})
  }
    
  render () {
    return(
      <div className="grid">
        <section className="left">
          <button onClick={this.standardGame} className="difficultyButtons">Standard</button>
          <button onClick={this.expertGame} className="difficultyButtons">Expert</button>
          <h1>{this.state.title}</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="input" value={this.state.value} onChange={this.handleChange} placeholder="Enter guess here" />
            <input type="submit" value="Guess" onClick={this.actualGame}/>
          </form>
          <button onClick={this.resetGame} className="resetButton">Reset Game</button>
        </section>
        <section className="right">
          <div className="scores">
            <p>Standard high score: {this.state.standardHigh}</p>
            <p>Expert high score: {this.state.expertHigh}</p>
          </div>
          <h2>Your last guess was:</h2>
          <h3>{this.state.guess}</h3>
          <h4>{this.state.message}</h4>
        </section>
      </div>
    );
  }
}

export default App;