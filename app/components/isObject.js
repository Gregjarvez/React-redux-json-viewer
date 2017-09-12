import React from 'react';

const TypeObject = () => {
  return (
    <tr className="layout--row">
      <td>
        <button>⇟</button>
      </td>
      <td>Object</td>
      <td>:</td>
      <td>{ '{props-length}' }</td>
    </tr>
  );
};

export default TypeObject;
