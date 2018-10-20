import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as api from './fakeAPI';

export const withContact = (WrappedComponent) => class extends Component {

  static propTypes = {
    contactId: PropTypes.number.isRequired,
    onContactNotFound: PropTypes.func.isRequired
  };

  state = {
    contact: null
  };

  componentDidMount() {
    let {contactId} = this.props;

    this.handleContactIdChange(contactId);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactId !== this.props.contactId) {
      this.handleContactIdChange(nextProps.contactId);
    }
  }

  handleContactIdChange(contactId) {
    api.fetchContact(contactId).then(contact => {
      let {onContactNotFound} = this.props;

      if (!contact) {
        onContactNotFound(contactId);
      } else {
        this.setState({contact});
      }
    });
  }

  render() {
    let {contact} = this.state;

    return (
      <WrappedComponent
        {...this.props}
        contact={contact}
      />
    );
  }
};
