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
    dist: 10
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
      xPopup,
      yPopup,
      contentPopup,
      dist
    } = this.props;

    var style = {
      left: xPopup? xPopup: -100,
      top: yPopup? yPopup: -100,
      position: 'absolute'
    }

    if(contentPopup) {
      var cvContent = this._mkContent();
    }

    var popupStyle = {
      boxShadow: '0 3px 14px rgba(0,0,0,0.4)',
      padding: '1px',
      textAlign: 'left',
      borderRadius: '12px',
      backgroundColor: '#FFF'
    };

    var tipContainerStyle= {
      margin: '0 auto',
      width: '40px',
      height: '20px',
      position: 'relative',
      overflow: 'hidden'
    }

    var tipStyle= {
      boxShadow: '0 3px 14px rgba(0,0,0,0.4)',
      width: '17px',
    	height: '17px',
    	padding: '1px',
    	marginTop: '-10',
      marginLeft: '20px',
    	WebkitTransform: 'rotate(45deg)',
      MozTransform: 'rotate(45deg)',
      MsTransform: 'rotate(45deg)',
    	OTransform: 'rotate(45deg)',
      backgroundColor: '#FFF'
    }

    return (
      <div
        style= {style}
        className= "react-d3-map-core__popup_utils"
        ref= "popup"
        >
        <div className= "popup_content_wrapper" style={popupStyle}>
          {cvContent}
        </div>
        <div className="popup_tip_container" style= {tipContainerStyle}>
          <div className="popup_tip" style= {tipStyle}>
          </div>
        </div>
      </div>
    )
  }
}
