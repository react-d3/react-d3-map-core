"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Chart = require('../../lib/index').Chart;
var Point = require('../../lib/index').Point;
var Popup = require('../../lib/index').Popup;
var Marker = require('../../lib/index').Marker;
var Popup = require('../../lib/index').Popup;
var Tile = require('../../lib/index').Tile;

var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;
var tileFunc = require('../../lib/index').tileFunc;

// Example
(function() {
  var ChartPopup = React.createClass({
    getInitialState: function() {
      return {
        xPopup: null,
        yPopup: null,
        contentPopup: null
      }
    },

    onClick: function(dom, d, x, y) {
      this.setState({
        xPopup: x - 60,
        yPopup: y - 100,
        contentPopup: d.properties.name
      })
    },

    _onMouseOut: function(dom, d, i) {
      this.setState({
        xPopup: null,
        yPopup: null,
        contentPopup: null
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
      var rotate = [4.4, 0]
      var center = [0, 55.4]
      var translate = [width / 2, height / 2];
      var projection = 'mercator';
      var pointRadius = 2;

      var proj = projectionFunc({
        projection: projection,
        scale: scale,
        translate: translate,
        rotate: rotate,
        center: center
      });

      var geo = geoPath(proj, {
        pointRadius: pointRadius
      });

      var tiles = tileFunc({
        scale: proj.scale() * 2 * Math.PI,
        translate: proj([0, 0]),
        size: ([width, height])
      })

      var x = function(d) { return +proj(d.geometry.coordinates)[0]; }
      var y = function(d) { return +proj(d.geometry.coordinates)[1]; }

      var onClick = this.onClick;

      var points = data.features.map(function(d, i) {
        return (
          <g>
            <Point
              key= {i}
              data= {d}
              geoPath= {geo}
              {...this.state}
            />

            <Marker
              key= {i.i}
              data= {d}
              x= {+proj(d.geometry.coordinates)[0]}
              y= {+proj(d.geometry.coordinates)[1]}
              onClick= {onClick}
            />
          </g>
        )
      }.bind(this))

      var popup = (<Popup
        {...this.state}
      />);

      return (
        <div>
          <Chart
            width= {width}
            height= {height}
            {...this.state}
          >
            <Tile
              tiles= {tiles}
            />
            {points}
          </Chart>
          {popup}
        </div>
      )
    }
  })

  ReactDOM.render(
    <ChartPopup />
    , document.getElementById('blank-popup')
  )

})()
