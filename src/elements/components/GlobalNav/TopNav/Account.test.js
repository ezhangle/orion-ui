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
import { mount } from 'enzyme';
import * as HIG from 'hig.web';
import React from 'react';

import GlobalNav from '../../../../adapters/GlobalNav/GlobalNavAdapter';
import TopNav from './TopNav';
import ProjectAccountSwitcher
  from '../../../../adapters/ProjectAccountSwitcherAdapter';
import Account from '../../../../adapters/AccountAdapter';
import SharedExamples from './../SharedExamples';

const onItemClick = function() {
  return 'onItemClick';
};

const onClickOutside = function() {
  return 'onClickOutside';
};

const Context = props => {
  return (
    <GlobalNav>
      <TopNav>
        <ProjectAccountSwitcher
          activeLabel={props.accounts[0].label}
          activeImage={props.accounts[0].image}
          activeType={'account'}
          showCaret={props.accounts.length > 1 ? true : false}
        >
          {props.accounts.map(account => {
            return (
              <Account
                image={account.image}
                label={account.label}
                key={account.key}
                active={account.active}
              />
            );
          })}
        </ProjectAccountSwitcher>
      </TopNav>
    </GlobalNav>
  );
};

function setupAccounts() {
  const props = {
    accounts: [
      {
        image: 'something.jpg',
        label: 'Oakland Medical Center',
        key: 1,
        id: 1,
        active: true
      },
      {
        image: 'foo.jpg',
        label: 'Berkeley Medical Center',
        key: 2,
        id: 2,
        active: false
      },
      {
        image: 'bar.jpg',
        label: 'UCSF Medical Center',
        key: 3,
        id: 3,
        active: false
      }
    ]
  };
  const reactContainer = document.createElement('div');
  mount(<Context {...props} />, { attachTo: reactContainer });
  return { reactContainer };
}

describe('<Account>', () => {
  describe('constructor', () => {
    it('has a good snapshot', () => {
      const { reactContainer } = setupAccounts();
      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();
      var elems = reactContainer
        .getElementsByClassName('hig__flyout__panel')[0]
        .getElementsByClassName(
          'hig__global-nav__top-nav__project-account-switcher__item'
        );
      expect(elems.length).toEqual(3);
    });
  });
});
