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

import createComponent from '../../../adapters/createComponent';
import HIGElement from '../../HIGElement';
import HIGNodeList from '../../HIGNodeList';
import HIGChildValidator from '../../HIGChildValidator';
import GroupComponent, { Group } from './Group';
import SectionCollapseComponent, { SectionCollapse } from './SectionCollapse';

export class Section extends HIGElement {
  constructor(HIGConstructor, initialProps) {
    super(HIGConstructor, initialProps);
    this.groups = new HIGNodeList({
      type: Group,
      HIGConstructor: this.hig.partials.Group,
      onAdd: (instance, beforeInstance) => {
        this.hig.addGroup(instance, beforeInstance);
      }
    });

    this.state = {
      expanded: false,
      query: initialProps.query
    };

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  componentDidMount() {
    this.groups.componentDidMount();

    this.collapse = new SectionCollapse(this.hig.partials.Collapse, {
      isCollapsed: !this.state.expanded
    });
    this.hig.addCollapse(this.collapse.hig);
    this.collapse.mount();
    this.collapse.hig.onClick(this.toggleCollapsed);
    this._render();
  }

  commitUpdate(updatePayload, oldProps, newProp) {
    const mapping = {
      headerLabel: 'setHeaderLabel',
      headerName: 'setHeaderName'
    };

    const queryIndex = updatePayload.indexOf('query');
    if (queryIndex >= 0) {
      const value = updatePayload.splice(queryIndex, 2)[1];
      this.state.query = value;
    }

    const expandedIndex = updatePayload.indexOf('expanded');
    if (expandedIndex >= 0) {
      const value = updatePayload.splice(expandedIndex, 2)[1];
      this.state.expanded = value;
    }

    if (expandedIndex >= 0 || queryIndex >= 0) {
      this._render();
    }

    this.commitUpdateWithMapping(updatePayload, mapping);
  }

  toggleCollapsed() {
    this.state.expanded = !this.state.expanded;
    this._render();
  }

  createElement(ElementConstructor, props) {
    switch (ElementConstructor) {
      case Group:
        return this.groups.createElement(ElementConstructor, props);
      case SectionCollapse:
        return new SectionCollapse(this.hig.partials.Collapse, props);
      default:
        throw new Error(`Unknown type ${ElementConstructor.name}`);
    }
  }

  insertBefore(instance, insertBeforeIndex) {
    this.appendChild(instance);
  }

  appendChild(instance) {
    if (instance instanceof Group) {
      this.groups.insertBefore(instance); // calls internal _appendChild if no "before" component
    }
  }

  removeChild(instance) {
    this.groups.removeChild(instance);
  }

  _render() {
    this.collapse.commitUpdate(['isCollapsed', !this.state.expanded]);
    const childVisibility = this.groups.map(group => {
      group.commitUpdate([
        'query',
        this.state.query,
        'expanded',
        this.state.expanded
      ]);

      return group.isVisible();
    });

    if (childVisibility.some(v => v) || !this.state.query) {
      this.hig.show();
    } else {
      this.hig.hide();
    }

    this.state.query ? this.collapse.hig.hide() : this.collapse.hig.show();
  }
}

const SectionComponent = createComponent(Section);

SectionComponent.propTypes = {
  headerLabel: PropTypes.string,
  headerName: PropTypes.string,
  query: PropTypes.string,
  children: HIGChildValidator([GroupComponent, SectionCollapseComponent])
};

SectionComponent.__docgenInfo = {
  props: {
    headerLabel: {
      description: 'sets the label'
    },

    headerName: {
      description: 'sets the name'
    },

    query: {
      description: 'query to filter children against'
    },

    children: {
      description: 'support adding Group and Collapse'
    }
  }
};

SectionComponent.Group = GroupComponent;
SectionComponent.SectionCollapse = SectionCollapseComponent;

export default SectionComponent;