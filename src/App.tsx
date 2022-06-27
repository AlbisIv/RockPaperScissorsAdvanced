/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import './App.scss';
import './styles/reset.scss';
import rock from './images/rock.png';
import paper from './images/paper.png';
import scissors from './images/scissors.png';
import lizard from './images/lizard.png';
import spock from './images/spock.png';

const initialGameScore = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};
interface winTableType {
  [key: string]: string[];
}
const winTable: winTableType = {
  rock: ['lizard', 'scissors'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};

const App = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [gameScore, setGameScore] = useState(initialGameScore);
  const [result, setResult] = useState('');
  const [computerChoice, setComputerChoice] = useState('');

  const getComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 5);
    switch (randomNumber) {
      case 0:
        return 'rock';
      case 1:
        return 'paper';
      case 2:
        return 'scissors';
      case 3:
        return 'lizard';
      case 4:
        return 'spock';
      default:
        return 'rock';
    }
  };
  const getResult = (playerChoice:string, computerChoice:string) => {
    if (playerChoice === computerChoice) {
      return 'draw';
    }
    if (winTable[playerChoice].includes(computerChoice)) {
      return 'win';
    }
    return 'loss';
  };
  const getGameScore = (result:string) => {
    switch (result) {
      case 'win':
        return {
          totalGames: gameScore.totalGames + 1,
          wins: gameScore.wins + 1,
          losses: gameScore.losses,
          draws: gameScore.draws,
        };
      case 'loss':
        return {
          totalGames: gameScore.totalGames + 1,
          wins: gameScore.wins,
          losses: gameScore.losses + 1,
          draws: gameScore.draws,
        };
      case 'draw':
        return {
          totalGames: gameScore.totalGames + 1,
          wins: gameScore.wins,
          losses: gameScore.losses,
          draws: gameScore.draws + 1,
        };
      default:
        return gameScore;
    }
  };

  const handleClick = () => {
    setComputerChoice(getComputerChoice());
    setResult(getResult(playerChoice, computerChoice));
    setGameScore(getGameScore(result));
  };

  return (
    <div className="container">
      <div className="row center-xs">
        <div className="col-xs-12 title">
          <h1>Rock Paper Scissors Lizard Spock</h1>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="game-options">
              <div
                className={`card ${playerChoice === 'rock' ? 'selected' : ''}`}
                onClick={() => {
                  setPlayerChoice('rock');
                }}
              >
                <img src={rock} alt="Rock" height="200px" />
              </div>
              <div
                onClick={() => {
                  setPlayerChoice('paper');
                }}
                className={`card ${playerChoice === 'paper' ? 'selected' : ''}`}
              >
                <img src={paper} alt="Paper" height="200px" />
              </div>
              <div
                onClick={() => {
                  setPlayerChoice('scissors');
                }}
                className={`card ${playerChoice === 'scissors' ? 'selected' : ''}`}
              >
                <img src={scissors} alt="Scissors" height="200px" />
              </div>
              <div
                onClick={() => {
                  setPlayerChoice('lizard');
                }}
                className={`card ${playerChoice === 'lizard' ? 'selected' : ''}`}
              >
                <img src={lizard} alt="Lizard" height="200px" />
              </div>
              <div
                onClick={() => {
                  setPlayerChoice('spock');
                }}
                className={`card ${playerChoice === 'spock' ? 'selected' : ''}`}
              >
                <img src={spock} alt="Nerd" height="200px" />
              </div>
            </div>

            <div className="row between-xs">
              <div className="col-xs-4">
                {playerChoice && (
                <h2 className="left">
                  Your Choice:
                  <br />
                  {playerChoice}
                </h2>
                )}

              </div>

              <div className="col-xs-4">
                <button
                  className={`btn ${result === 'win' ? 'win' : ''} 
                  ${result === 'loss' ? 'loss' : ''} 
                  ${result === 'draw' ? 'draw' : ''}`}
                  onClick={() => {
                    handleClick();
                  }}
                  disabled={!playerChoice}
                >
                  Lets Go!
                </button>
              </div>

              <div className="col-xs-4">
                {computerChoice && (
                  <div>
                    <h2 className="right">
                      Computer Choice:
                      <br />
                      {computerChoice}
                    </h2>
                  </div>
                )}
              </div>
            </div>
            <div className="row center-xs">
              <h2>
                Total games:
                {' '}
                {gameScore.totalGames}
              </h2>
            </div>
            <div className="row center-xs">
              <h2>
                Wins:
                {' '}
                {gameScore.wins}
              </h2>
            </div>
            <div className="row center-xs">
              <h2>
                Losses:
                {' '}
                {gameScore.losses}
              </h2>
            </div>
            <div className="row center-xs">
              <h2>
                Draws:
                {' '}
                {gameScore.draws}
              </h2>
            </div>
            {gameScore.totalGames > 0 && (
            <div className="row center-xs">
              <h2>
                Your Winrate:
                {' '}
                {((gameScore.wins / gameScore.totalGames) * 100).toFixed(2)}
                %
              </h2>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
