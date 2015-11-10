"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Chart = require('../../lib/index').Chart;
var Point = require('../../lib/index').Point;
var Voronoi = require('../../lib/index').Voronoi;
var Tooltip = require('../../lib/index').Tooltip;

var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;


// Example
(function() {
  var ChartTooltip = React.createClass({
    getInitialState: function() {
      return {
        xTooltip: null,
        yTooltip: null,
        contentTooltip: null
      }
    },

    _onMouseOver: function(dom, d, i) {
      console.log(dom)
      this.setState({
        xTooltip: d3.event.clientX,
        yTooltip: d3.event.clientY,
        contentTooltip: d.properties
      })
    },

    _onMouseOut: function(dom, d, i) {
      this.setState({
        xTooltip: null,
        yTooltip: null,
        contentTooltip: null
      })
    },

    _click: function() {
      this.setState({
        test: 'hi'
      })
    },

    render: function() {

      var width = 960,
      height = 1160;

      var uk = require('json!../data/uk.json');
      var uk_points = topojson.feature(uk, uk.objects.places).features;

      // data should be a MultiLineString
      var data = topojson.feature(uk, uk.objects.places);
      var scale = 1200 * 5;
      var parallels = [50, 60]
      var rotate = [4.4, 0]
      var center = [0, 55.4]
      var translate = [width / 2, height / 2];
      var projection = 'albers';
      var pointRadius = 2;

      var proj = projectionFunc({
        projection: projection,
        scale: scale,
        translate: translate,
        parallels: parallels,
        rotate: rotate,
        center: center
      });
      var geo = geoPath(proj, {
        pointRadius: pointRadius
      });

      var x = function(d) { return +proj(d.geometry.coordinates)[0]; }
      var y = function(d) { return +proj(d.geometry.coordinates)[1]; }
      var onMouseOut = this._onMouseOut;
      var onMouseOver = this._onMouseOver;
      var content = function(d) { return d.properties };


      var points = data.features.map(function(d, i) {
        return (
          <Point
            key= {i}
            data= {d}
            geoPath= {geo}
            {...this.state}
          />
        )
      }.bind(this))

      var tooltip = (<Tooltip
        {...this.state}
        content= {content}
      />);

      return (
        <div>
          {tooltip}
          <Chart
            width= {width}
            height= {height}
            {...this.state}
          >
            <Voronoi
              data= {data.features}
              geoPath= {geo}
              x= {x}
              y= {y}
              width= {width}
              height= {height}
              onMouseOut= {onMouseOut}
              onMouseOver= {onMouseOver}
              {...this.state}
            />
            {points}
          </Chart>

          <button onClick={this._click}>Click me</button>
        </div>
      )
    }
  })

  ReactDOM.render(
    <ChartTooltip />
    , document.getElementById('blank-tooltip')
  )

})()
