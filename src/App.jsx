import React, { Component } from "react";
import CardGame from './components/Game';
import QrGenerator from './components/QrGenerator';



class App extends Component {
  state = {
    activeTab: "qr"
  };

  render() {
    return (
      <div className="container">
        {}
        <div className="text-center m-4">
          <button onClick={() => this.setState({activeTab: "qr"})} className="spa-btn">QR Generátor</button>
          <button onClick={() => this.setState({activeTab: "game"})} className="spa-btn">Kő-papír-olló játék</button>
        </div>

        <hr />

        {this.state.activeTab === "qr" ? (
          <QrGenerator /> 
        ) : (
          <CardGame />
        )}
      </div>

      
    );
  }
}

export default App;