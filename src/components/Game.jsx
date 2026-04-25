import React, {Component} from "react";


class Game extends Component{
    constructor(props) {
        super(props)
        this.state = {
            playerVal : null,
            computerVal : null,
            playerScore: 0,
            compScore: 0,
        };
    }
    logic = (playerVal, computerVal)=>{
        if(playerVal == computerVal){
            return 0;
        } else if ((playerVal == "ROCK" && computerVal == "SCISSORS") ||
            (playerVal == "SCISSORS" && computerVal == "PAPER") ||
            (playerVal == "PAPER" && computerVal == "ROCK")
        ) {
            return 1;
        } else {
            return -1;
        }
    }

    decision = (playerChoice)=> {
        const choices = ["KŐ", "PAPÍR", "OLLÓ"];
        const compChoice =  choices[Math.floor(Math.random() * choices.length)];
        const val = this.logic(playerChoice, compChoice)
        if(val == 1) {
            console.log("Hello")
            this.setState({
                playerVal: playerChoice,
                computerVal : compChoice, 
                playerScore : this.state.playerScore +1
            })
        } else if(val == -1) {
            console.log("Hello")
            this.setState({
                playerVal: playerChoice,
                computerVal : compChoice,
                compScore : this.state.compScore +1
            })
        } else {
            console.log("Hello")
            this.setState({
                computerVal : compChoice,
                playerVal : playerChoice
            })
        }
    }
    render(){
        const {playerVal, computerVal, playerScore, compScore} = this.state;
        return(
            <div className="container">
                <h1>Kő papír olló játék</h1>
                <div >
                    <button onClick={()=>this.decision("KŐ")}>
                        <i className={`fas fa-hand-rock`} /> KŐ
                    </button>
                    <button onClick={()=>this.decision("PAPÍR")}>
                        <i className={`fas fa-hand-paper`} /> PAPÍR
                    </button>
                    <button onClick={()=>this.decision("OLLÓ")}>
                        <i className={`fas fa-hand-scissors`} />  OLLÓ 
                    </button>
                </div>
                <div className="content">
                    <p>Te válaszod: {playerVal}</p>
                    <p>Ellenfél válasza: {computerVal}</p>
                    <h2>Te pontod:{playerScore}</h2>
                    <h2>Ellenfél pontja: {compScore}</h2>
                </div>
            </div>
        )
    }
}

export default Game;