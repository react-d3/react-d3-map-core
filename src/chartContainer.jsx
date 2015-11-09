"use strict";

import {
  default as React,
  Component,
} from 'react';

import {
  default as ChartSvg
} from './container/svg';

import {
  default as ChartTitle
} from './container/title';

import {
  default as CommonProps,
} from './commonProps';

export default class ChartContainer extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = CommonProps

  render() {
    const {
      width,
      title
    } = this.props;

    var chartTitle;

    var divStyle = {
      width: width
    };

    if(title)
      chartTitle = <ChartTitle {...this.props}/>;

    return (
      <div style={divStyle}>
        {chartTitle}
        <ChartSvg {...this.props}/>
      </div>
    )
  }
}
