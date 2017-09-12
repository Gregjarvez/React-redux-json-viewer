import React from 'react';
import { shallow } from 'enzyme';
import Primitives from '../app/components/Primitives';


describe('<Primitives />', () => {
  it('renders correctly', () => {
    const component = shallow(<Primitives
      Qey="String"
      value="Hello"
      meta={{}}
    />);
    expect(component).toMatchSnapshot();
  });


  it('contains 5 table cell in all', () => {
    const component = shallow(<Primitives
      Qey="String"
      value="Hello"
      meta={{}}
    />);
    expect(component.find('td').length).toEqual(5);
  });
});
