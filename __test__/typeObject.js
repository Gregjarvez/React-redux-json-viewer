import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line
import TypeObject from '../app/components/isTypeObject';

describe('<TypeObject />', () => {
  it('renders correctly', () => {
    const component = shallow(<TypeObject
      Qey="String"
      appendNodesToTree={f => f}
      removeNodesFromTree={f => f}
    />);
    expect(component).toMatchSnapshot();
  });
});
