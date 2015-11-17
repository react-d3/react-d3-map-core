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
      closeClick,
      id
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
            <img className="react-d3-map-core__popup__tip" style= {tipStyle} src="data:image/png;base64,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"/>
          </foreignObject>
        </g>
    )
  }
}
