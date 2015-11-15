"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Chart = require('../../lib/index').Chart;
var Tile = require('../../lib/index').Tile;
var Popup = require('../../lib/index').Popup;
var Polygon = require('../../lib/index').Polygon;

var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;
var tileFunc = require('../../lib/index').tileFunc;

var css= require('./css/polygon.css');

// Example
(function() {
  var ChartPopup = React.createClass({
    getInitialState: function() {
      return {
        xPopup: null,
        yPopup: null,
        contentPopup: null,
        zoomTranslate: null,
        zoomScale: null
      }
    },

    onClick: function(dom, d, x, y) {
      this.setState({
        xPopup: x,
        yPopup: y,
        contentPopup: d.properties.name
      })
    },

    onZoom: function(zoomScale, zoomTranslate) {
      this.setState({
        zoomScale: zoomScale,
        zoomTranslate: zoomTranslate
      })
    },

    render: function() {
      var zoomScale = this.state.zoomScale;
      var zoomTranslate = this.state.zoomTranslate;

      var width = 500;
      var height = 500;
      var scale = (1 << 18) / 2 / Math.PI;
      var translate = [width / 2, height / 2];
      var projection = 'mercator';
      var center = [-73.95, 40.7];

      var proj = projectionFunc({
        projection: projection,
        scale: zoomScale? (zoomScale / 2 / Math.PI): scale,
        translate: zoomTranslate || translate,
        center: center
      });

      var geo = geoPath(proj);


      var tiles = tileFunc({
        scale: proj.scale() * 2 * Math.PI,
        translate: proj([0, 0]),
        size: ([width, height])
      });

      var data = {geometry: {coordinates: [[[-74.0479, 40.8820], [-73.9067, 40.8820], [-73.9067, 40.6829], [-74.0479, 40.6829], [-74.0479, 40.8820]]], type: "Polygon"}, id: 999999, properties:{}, type: "Feature"};

      var onClick = this.onClick;
      var onZoom = this.onZoom;

      var popup = (<Popup
        {...this.state}
      />);

      return (
        <div>
          <Chart
            width= {width}
            height= {height}
            projection = {proj}
            onZoom= {onZoom}
            center= {center}
            {...this.state}
          >
            <Tile
              tiles= {tiles}
            />
            <Polygon
              data= {data}
              geoPath= {geo}
              onClick= {onClick}
              {...this.state}
            />
          </Chart>
          {popup}
        </div>
      )
    }
  })

  ReactDOM.render(
    <ChartPopup />
    , document.getElementById('blank-zoom2')
  )

})()
