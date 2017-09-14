import React from 'react';
import PropTypes from 'prop-types';
import Format from 'react-icons/lib/md/format-line-spacing';

class Modeler extends React.Component {


  render() {
    const layout = this.props.tree.map(this.props.modelBuilder);

    return (
      <div className="layout">
        <div className="layout--setting">
          <span><Format /></span>
        </div>
        <table className="layout--embedded">
          <tbody>
            { layout }
          </tbody>
        </table>
      </div>
    );
  }
}

Modeler.propTypes = {
  tree: PropTypes.array,
  modelBuilder: PropTypes.func,

};

export default Modeler;
