import {contacts, organizations} from "./fakedata";
import _ from 'lodash';

export function fetchContact(id) {
  return new Promise((resolve) => {
    let contact = _.find(contacts, {id});

    setTimeout(() => {
      resolve(contact);
    }, 300);
  });
}

export function fetchData(organizationId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let organization = _.find(organizations, {id: organizationId});
      resolve(organization);
    }, 800);
  });
}
