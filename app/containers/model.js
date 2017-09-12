import React from 'react';
import Format from 'react-icons/lib/md/format-line-spacing';

import Primitive from '../components/Primitives';
import TypeObject from '../components/isTypeObject';


const Modeler = () => {
  return (
    <div className="layout">
      <div className="layout--setting" >
        <span><Format /></span>
      </div>
      <table className="layout--embedded">
        <tbody>
          <Primitive Qey="String" value="Hello World" meta={{ type: 'string' }} />
          <Primitive Qey="Number" value="2387" meta={{ type: 'number' }} />
          <Primitive Qey="String" value="Hello World" meta={{ type: 'string' }} />
          <TypeObject type="Array" contentCount={7} />
          <Primitive Qey="Boolean" value="true" meta={{ type: 'boolean', margin: '40px' }} />
          <Primitive Qey="Boolean" value="true" meta={{ type: 'boolean', margin: '48px' }} />
          <Primitive Qey="Boolean" value="true" meta={{ type: 'boolean', margin: '40px' }} />
          <Primitive Qey="Boolean" value="true" meta={{ type: 'boolean', margin: '40px' }} />
          <Primitive Qey="Number" value="2387" meta={{ type: 'number' }} />
          <Primitive Qey="String" value="Hello World" meta={{ type: 'string' }} />
          <TypeObject type="Object" contentCount={3} />
        </tbody>
      </table>
    </div>
  );
};

export default Modeler;
