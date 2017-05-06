require('normalize.css/normalize.css');
require('styles/Controller.css');

import React from 'react';

// 控制条
class Controller extends React.Component {
  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
  }

  render() {
    let controllerClassName = 'controller-unit';
    if (this.props.arrange.isCenter) {
      controllerClassName += ' center';
      if (this.props.arrange.isInverse) {
        controllerClassName += ' inverse';
      }
    }

    return (
        <span className={controllerClassName} onClick={this.handleClick.bind(this)}></span>
    );
  }
}

export default Controller;
