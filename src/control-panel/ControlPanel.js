import React, { Component } from "react";
import "./ControlPanel.css";
import {formatButtons} from "../buttons"

class ControlPanel extends Component {
  onClick= button => {
    if(button.type === "copy") {
      alert("COPIED!")
    }

    this.forceUpdate()
    document.execCommand(button.type, false, button.value || false)
  }

  classNames = button => {    
    if(document.queryCommandValue(button.type) === button.value || document.queryCommandState(button.type)) {
      return `format-action__button format-action__button--${button.color || ""} format-action__button--active`
    }
    return `format-action__button format-action__button--${button.color || ""}`
  }

  renderButtons = () =>
    formatButtons.map((button, i) => (
          <button
            key={i}
            name={button.type}
            onClick={() =>this.onClick(button) }
            className={this.classNames(button)}
            type="button"
          >
            <div className="format-action__button-text">{button.text}</div> 
          </button>      
    ));

  render() {    
    return (
      <div id="control-panel">
        <div  id="format-actions">
          {this.renderButtons()}          
        </div>
      </div>
    );
  }
}

export default ControlPanel;
