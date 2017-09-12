import React from 'react';
import TypeNumber from '../components/isNumber';
import TypeString from '../components/isString';
import TypeBoolean from '../components/isBoolean';
import TypeArray from '../components/isArray';
import TypeObject from '../components/isObject';

const Modeler = () => {
  return (
    <div className="layout">
      <div className="layout--setting" />
      <table className="layout--embedded">
        <tbody>
          <TypeString />
          <TypeNumber />
          <TypeBoolean />
          <TypeArray />
          <TypeObject />
        </tbody>
      </table>
    </div>
  );
};

export default Modeler;
