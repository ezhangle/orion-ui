/**
Copyright 2016 Autodesk,Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as PropTypes from 'prop-types';
import HIGElement from '../../HIGElement';
import createComponent from '../../../adapters/createComponent';

export class Profile extends HIGElement {

  commitUpdate(updatePayload, oldProps, newProp) {
    const mapping =       {
      image: 'setImage',
      name: 'setName',
      email: 'setEmail',
      profileSettingsLabel: 'setProfileSettingsLabel',
      signOutLabel: 'setSignOutLabel',
      profileSettingsLink: 'setProfileSettingsLink'
    };

    this.commitUpdateWithMapping(updatePayload, mapping);
  }
}

const ProfileComponent = createComponent(Profile);

Profile.propTypes = {
  open: PropTypes.bool,
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  signOutLabel: PropTypes.string,
  profileSettingsLabel: PropTypes.string,
  profileSettingsLink: PropTypes.string,
  onSignOutClick: PropTypes.func,
  onProfileImageClick: PropTypes.func
};

ProfileComponent.__docgenInfo = {
  props: {
    open: {
      description: '{bool} sets whether flyout is open by default (?)'
    },
    name: {
      description: 'sets {String} display name'
    },
    email: {
      description: 'sets {String} email'
    },
    image: {
      description: 'sets {String} image - url to svg or other image object'
    },
    signOutLabel: {
      description: 'sets {String} label for sign out button'
    },
    profileSettingsLabel: {
      description: 'sets {String} label for settings button'
    },
    profileSettingsLink: {
      description: 'sets {String} url to settings page'
    },
    onSignOutClick: {
      description: '{function} Triggered when user clicks sign out button'
    },
    onProfileImageClick: {
      description: '{function} triggers when you click the profile'
    }
  }
};

export default ProfileComponent;
