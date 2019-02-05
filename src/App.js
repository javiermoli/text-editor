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
      text: "",
    };
  }

  getText = async () => {
    const text = await getMockText();
    this.setState({
      text,
    });
  };

  componentDidMount = () => this.getText();

  textSelection = () => {
    if (window.getSelection().toString() !== "") {
      this.setState({
        isModalOpen: true,
      });
    }
  };

  hiddenModal = e => {
    if (!e.target.className.includes("format-action")) {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  updateTextDocument = selectedSyn => {
    const range = window.getSelection().getRangeAt(0);

    const startSelectedWord = range.startOffset;
    const endSelectedWord = range.endOffset;
    var textFirstPart = this.state.text.substr(0, startSelectedWord);
    var textSecondPart = this.state.text.substr(endSelectedWord);

    this.setState({
      text: textFirstPart + selectedSyn + textSecondPart,
      isModalOpen: false,
    });
  };

  render() {
    return (
      <div onClick={this.hiddenModal} className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          {this.state.isModalOpen && (
            <ControlPanel updateTextDocument={this.updateTextDocument} />
          )}
          <FileZone text={this.state.text} onClick={this.textSelection} />
        </main>
      </div>
    );
  }
}

export default App;
