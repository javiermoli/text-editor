import React, { Component } from "react";
import "./ControlPanel.css";
import { formatButtons } from "../FormatTypes";

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      synonyms: [],
      selectedSynonym: "",
      loading: false,
    };
  }

  fetchSynonyms = async selectedText => {
    const response = await fetch(
      `http://api.datamuse.com/words?rel_syn=${selectedText}`
    );
    const synonyms = await response.json();

    this.setState({
      synonyms,
      loading: false,
    });
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
    });
    const selectedText = window.getSelection().toString();
    this.fetchSynonyms(selectedText);
  };

  onClickButton = button => {
    this.fetchSynonyms();
    if (button.type === "copy") {
      alert("COPIED!");
    }

    document.execCommand(button.type, false, button.value || false);
  };

  classNames = button => {
    if (
      document.queryCommandValue(button.type) === button.value ||
      document.queryCommandState(button.type)
    ) {
      return `format-action__button format-action__button--${button.color ||
        ""} format-action__button--active`;
    }
    return `format-action__button format-action__button--${button.color || ""}`;
  };

  renderButtons = () =>
    formatButtons.map((button, i) => (
      <button
        key={i}
        name={button.type}
        onClick={() => this.onClickButton(button)}
        className={this.classNames(button)}
        type="button"
      >
        <div className="format-action__button-text">{button.text}</div>
      </button>
    ));

  handleSynChange = e => {
    this.props.updateTextDocument(e.target.value);
  };

  render() {
    const synonyms = this.state.synonyms.map((syn, i) => (
      <option key={i} value={syn.word}>
        {syn.word}
      </option>
    ));

    return (
      <div id="control-panel">
        <div id="format-actions">{this.renderButtons()}</div>
        {this.state.loading ? (
          <div>...loading</div>
        ) : (
          <select
            onChange={this.handleSynChange}
            className="format-action__select"
          >
            {synonyms}
          </select>
        )}
      </div>
    );
  }
}

export default ControlPanel;
