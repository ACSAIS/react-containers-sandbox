import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as api from './fakeAPI';

export const withOrganization = (WrappedComponent) => class extends Component {

  static propTypes = {
    contact: PropTypes.object
  };

  static defaultProps = {
    contact: null
  };

  state = {
    organization: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.contact !== this.props.contact) {
      this.handleContactChange(nextProps.contact);
    }
  }

  handleContactChange(contact) {
    if (contact === null) {
      this.setState({organization: null})
    } else {
      api.fetchData(contact.organizationId).then(organization => {
        this.setState({organization});
      });
    }
  }

  render() {
    let {organization} = this.state;

    return (
      <WrappedComponent
        {...this.props}
        organization={organization}
      />
    );
  }
};
