"use strict";

import {
  default as React,
  Component,
} from 'react';

import d3 from 'd3';

import {
  default as ChartSvg
} from './container/svg';

import {
  default as ChartTitle
} from './container/title';

import {
  default as CommonProps,
} from './commonProps';

import {
  isTooltipUpdate
} from './utils/tooltipUpdate';

export default class ChartContainer extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = CommonProps

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  render() {
    const {
      width,
      title
    } = this.props;

    var chartTitle;

    var divStyle = {
      width: width,
      position: 'relative'
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
