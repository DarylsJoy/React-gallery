require('normalize.css/normalize.css');
require('styles/Img.css');

import React from 'react';

class Img extends React.Component {
  // 点击
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
    let styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    if (this.props.arrange.rotate) {
      styleObj.transform = `rotate(${this.props.arrange.rotate}deg)`;
    }

    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    let imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' img-inverse' : '';

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.imgURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick.bind(this)}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

export default Img;
