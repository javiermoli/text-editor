import React, { Component } from "react";
import "./App.css";
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import { getMockText } from "./text.service";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      text:"",
    };
  }

  getText = async () => {
    const text = await getMockText()
    this.setState({
      text
    })    
  }

  componentDidMount = () => this.getText()
  

  onClick = () => {
    if(window.getSelection().toString() !== "") {
      this.setState({
        isModalOpen: true,
      });
    }
 
  };

  onClick2 = e => {    
    if (!e.target.className.includes("format-action__button" || "format-action__button-text")) {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  render() {
    return (
      <div onClick={this.onClick2} className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          {this.state.isModalOpen && <ControlPanel  />}
          <FileZone text={this.state.text} onClick={this.onClick} />
        </main>
      </div>
    );
  }
}

export default App;
