"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

export default class Popup extends Component {
  constructor (props) {
    super(props);
  }

  static defaultProps = {
    dist: 10,
    width: 200
  }

  componentDidMount() {
    this._updateHeight();
  }

  componentDidUpdate() {
    this._updateHeight();
  }

  _updateHeight() {
    const {
      y
    } = this.props;

    var contentDOM = this.refs.popupContentWrapper;
    var contentForeign = this.refs.popupContentForeignObject;
    var closeForeign = this.refs.popupCloseBtnForeignObject;

    contentForeign.setAttribute('y', y - contentDOM.clientHeight);
    closeForeign.setAttribute('y', y - contentDOM.clientHeight + 5);
  }

  _mkContent() {
    const {
      contentPopup
    } = this.props;

    var popupContentStyle= {
      backgroundColor: '#FFF',
      margin: '13px 19px',
      lineHeight: 1.4
    }


    return (
      <div className="popup_content" style= {popupContentStyle}>
        {contentPopup}
      </div>
    )

  }

  render() {
    const {
      x,
      y,
      contentPopup,
      width,
      closeClick
    } = this.props;

    if(contentPopup) {
      var cvContent = this._mkContent();
    }

    var popupGroupStyle = {
      position: 'relative'
    }

    var closeStyle = {
      padding: '4px 4px 0 0',
      textAlign: 'center',
      width: '18px',
      height: '14px',
      font: '16px/14px Tahoma, Verdana, sans-serif',
      color: '#c3c3c3',
      textDecoration: 'none',
      fontWeight: 'bold',
      background: 'transparent'
    }

    var popupStyle = {
      boxShadow: '0 3px 14px rgba(0,0,0,0.4)',
      padding: '1px',
      textAlign: 'center',
      borderRadius: '12px',
      backgroundColor: '#FFF',
      width: 'auto'
    };

    var tipContainerStyle= {
      margin: '0 auto',
      width: '20px',
      height: '20px'
    }

    var tipStyle= {
      width: '17px',
    	padding: '1px'
    }

    return (
      <g
        className= "react-d3-map-core__popup_utils"
        ref= "popup"
        >

          <foreignObject
            ref="popupContentForeignObject"
            x= {x - 23}
            y= {y - 50}
            width= {width}
            height= {"100%"}
          >
            <div className= "react-d3-map-core__popup__content-wrapper" style={popupStyle} ref="popupContentWrapper">
              {cvContent}
            </div>
          </foreignObject>
          <foreignObject
            ref="popupCloseBtnForeignObject"
            x= {x - 20}
            y= {y - 50}
            width= {100}
            height= {100}
          >
            <a className="react-d3-map-core__popup__close-button" href="#close" onClick={closeClick} style={closeStyle} >×</a>
          </foreignObject>
          <foreignObject
            x= {x - 7}
            y= {y - 2}
            width= {100}
            height= {100}
          >
            <img className="react-d3-map-core__popup__tip" style= {tipStyle} src="../img/tip.png"/>
          </foreignObject>
        </g>
    )
  }
}
