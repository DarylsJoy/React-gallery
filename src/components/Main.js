require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import Img from './Img'
import Controller from './Controller'

// 获取图片数据
let imgDatas = (function getImgUrl(imgDatasArr) {
  imgDatasArr.forEach(function(value, index) {
    let singleImgData = value;
    singleImgData.imgURL = require(`../images/${singleImgData.fileName}`);
    this[index] = singleImgData;
  }.bind(imgDatasArr));
  return imgDatasArr;
})(require('../data/imageDatas.json'));

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: []
    }
  }

  Constant = {    // 图片分布的位置范围
    centerPos: {    // 中心图片位置
      left: 0,
      right: 0
    },
    hPosRange: {    // 水平方向范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {    // 垂直方向范围
      x: [0, 0],
      topY: [0, 0]
    }
  };

  componentDidMount() {
    // 舞台大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    // img大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    // 中心图片位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    this.Constant.hPosRange = {
      leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
      rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
      y: [-halfImgH, stageH - halfImgH]
    };

    this.Constant.vPosRange = {
      x: [halfStageW - imgW, halfStageW],
      topY: [-halfImgH, halfStageH - halfImgH * 3]
    };
    this.reArrange(0)
  }

  // 翻转图片
  inverse(index) {
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }
  }

  // 居中图片
  center(index) {
    return () => {
      this.reArrange(index);
    }
  }

  // 指定居中图片
  reArrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        vPosRangeX = vPosRange.x,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,

        // 上边部分图片数量，0或1
        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),
        topImgSpliceIndex = 0,
        // 中心图片信息
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    // 居中
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    };
    // 布局上侧的图片信息
    topImgSpliceIndex = Math.floor(Math.random() * imgsArrangeArr.length - topImgNum);
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    // 布局上侧图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: this.getDegRandom(30),
        isCenter: false
      }
    });

    // 布局两侧图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;
      // 前部分循环布局左侧，后部分布局右侧
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i] = {
        pos: {
          top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: this.getDegRandom(30),
        isCenter: false
      }
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }

  // 获取区间内随机值
  getRangeRandom(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }

  // 随机生成旋转角度
  getDegRandom(deg) {
    return (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * deg);
  }

  render() {
    return (
      <setion className="stage" >
        <section className="img-sec" ref="stage">
          {
            imgDatas.map((value, index) => {
              if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                  pos: {
                    left: '0',
                    top: '0'
                  },
                  rotate: '0',
                  isInverse: false,  // 是否翻面
                  isCenter: false  // 是否居中
                }
              }
              return (
                  <Img key={index} data={value} ref={`imgFigure${index}`} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>
              )
            })
          }
        </section>
        <nav className="controller-nav">
          {
            imgDatas.map((value, index) => {
              return (
                <Controller key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>
              )
            })
          }
        </nav>
      </setion>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
