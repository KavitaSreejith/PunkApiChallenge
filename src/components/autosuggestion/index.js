import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

class AutoSuggestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSuggestion: 0,
      selectedSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  

  onClick(e){
    this.setState({
      currentSuggestion: 0,
      selectedSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown(e){
    const { currentSuggestion, selectedSuggestions } = this.state;

    switch(e.charCode){
      case 13:
        this.setState({
          currentSuggestion: 0,
          showSuggestions: false,
          userInput: selectedSuggestions[currentSuggestion]
        });
        break;
      case 38:
        if (currentSuggestion === 0) { return; }
        this.setState({ currentSuggestion: currentSuggestion - 1 });
        break;
      case 40:
        if (currentSuggestion - 1 === selectedSuggestions.length) { return; }
        this.setState({ currentSuggestion: currentSuggestion + 1 });
        break;
      default:
        break;  
    }
  };

  onChange(e){
      const { suggestions } = this.props;
      const userInput = e.currentTarget.value;
      const selectedSuggestions = suggestions.filter( suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      this.setState({
        currentSuggestion: 0,
        selectedSuggestions,
        showSuggestions: true,
        userInput: e.currentTarget.value
      });
  };

// Check for characters otehr than alphanumeric | hyphen | space..
  handleKeyPress(e){
    e.currentTarget.style.outline = 'none';
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    let isValid = (e.charCode >= 48 && e.charCode <= 57) || (e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <=122) || (e.charCode == 32) || (e.charCode == 45);
    isValid ? e.currentTarget.style.border = '1px solid #000' : e.currentTarget.style.border = '1px solid red';
  }

  render() {
    const {
      onChange, onClick, onKeyDown, handleKeyPress,
      state: { currentSuggestion, selectedSuggestions, showSuggestions, userInput } } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (selectedSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions" id="suggestions">
            {selectedSuggestions.map((suggestion, index) => {
              let className;

              // To Show active suggestion..
              if (index === currentSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <span className="no-suggestions">
            <em>No Auto suggestion for your input..</em>
          </span>
        );
      }
    }

    return (
      <Fragment>
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          pattern="[0-9]*"
          onKeyPress={(e) => handleKeyPress(e)}
          id = "autocomplete-text"
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

AutoSuggestion.propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

AutoSuggestion.defaultProps = {
    suggestions: []
};

export default AutoSuggestion;
