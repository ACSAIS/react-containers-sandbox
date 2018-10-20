import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Card} from './Card';
import {withContact} from './ContactProvider';
import {withOrganization} from './OrganizationProvider';
import _ from 'lodash';

const CardContainer = _.flowRight(withContact, withOrganization)(Card);

const INITIAL_CONTACT_ID = 5;

const getInitialState = () => {
  return {
    shouldShowReplay: false,
    contactId: INITIAL_CONTACT_ID
  };
};

class App extends Component {

  state = getInitialState();

  handleShowNext = () => {
    this.setState({contactId: this.state.contactId + 1});
  };

  handleContactNotFound = () => {
    this.setState({
      shouldShowReplay: true
    });
  };

  handleReplayButtonClick = () => {
    this.setState(getInitialState());
  };

  renderHeader() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    );
  }

  renderCard() {
    let {contactId} = this.state;

    return (
      <CardContainer
        contactId={contactId}
        onShowNext={this.handleShowNext}
        onContactNotFound={this.handleContactNotFound}/>
    );
  }

  renderReplayBlock() {
    return (
      <div>
        That's all. replay?
        <br/>
        <button onClick={this.handleReplayButtonClick}>Start</button>
      </div>
    );
  }

  render() {
    let {shouldShowReplay} = this.state;

    let card = shouldShowReplay ? null : this.renderCard();
    let replayBlock = shouldShowReplay ? this.renderReplayBlock() : null;

    return (
      <div className="App">
        {this.renderHeader()}
        {card}
        {replayBlock}
      </div>
    );
  }
}

export default App;
