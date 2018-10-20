import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

export class Card extends Component {

  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      organizationId: PropTypes.number
    }),
    organization: PropTypes.shape({
      id: PropTypes.number.isRequired,
      numberOfEmployees: PropTypes.number.isRequired,
      headquarter: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    contact: null,
    organization: null
  };

  renderItemInfo(record) {
    let markup = Object.keys(record).map(fieldId => {
      return (
        <Fragment key={fieldId}>
          <dt>{fieldId}</dt>
          <dd>{record[fieldId]}</dd>
        </Fragment>
      );
    });

    return (
      <dl>
        {markup}
      </dl>
    );
  }

  renderContact() {
    let {contact} = this.props;

    if (!contact) {
      return null;
    }
    return (
      <div>
        <h4>contact</h4>
        {this.renderItemInfo(contact)}
      </div>
    );
  }

  renderOrganization() {
    let {organization} = this.props;

    if (!organization) {
      return null;
    }
    return (
      <div>
        <h4>organization</h4>
        {this.renderItemInfo(organization)}
      </div>
    );
  }

  render() {
    let {contact, organization, onShowNext} = this.props;

    if (contact === null && organization === null) {
      return <div>pending</div>;
    } else {
      return (
        <div>
          <h3>Details</h3>
          <button onClick={onShowNext}>show me next</button>
          {this.renderContact()}
          {this.renderOrganization()}

        </div>
      );
    }
  }
}
