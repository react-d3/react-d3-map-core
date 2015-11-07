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
      chartSeries
    } = this.props;

    var divStyle = {
      width: width
    };

    return (
      <div style={divStyle}>
        <ChartTitle {...this.props}/>
        <ChartSvg {...this.props}/>
      </div>
    )
  }
}
