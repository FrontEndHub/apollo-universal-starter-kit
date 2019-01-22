import React from 'react';
import { compose, graphql } from 'react-apollo';
import { pick } from 'lodash';
import { translate } from '@module/i18n-client-react';
import { FormErrors } from '@module/forms-client-react';
import UserAddView from '../components/UserAddView';
import ADD_USER from '../graphql/AddUser.graphql';
import settings from '../../../../settings';
import UserFormatter from '../helpers/UserFormatter';

class UserAdd extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = async values => {
    const { addUser, t, history, navigation } = this.props;

    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'password']);

    userValues['profile'] = pick(values.profile, ['firstName', 'lastName']);

    userValues = UserFormatter.trimExtraSpaces(userValues);

    if (settings.user.auth.certificate.enabled) {
      userValues['auth'] = { certificate: pick(values.auth.certificate, 'serial') };
    }

    try {
      await addUser(userValues);
    } catch (e) {
      throw new FormErrors(t('userAdd.errorMsg'), e);
    }

    if (history) {
      return history.push('/users/');
    }
    if (navigation) {
      return navigation.goBack();
    }
  };

  render() {
    return <UserAddView onSubmit={this.onSubmit} {...this.props} />;
  }
}

export default compose(
  translate('user'),
  graphql(ADD_USER, {
    props: ({ mutate }) => ({
      addUser: async input => {
        const { data: addUser } = await mutate({
          variables: { input }
        });
        return addUser;
      }
    })
  })
)(UserAdd);
