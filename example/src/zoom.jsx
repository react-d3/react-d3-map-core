"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Chart = require('../../lib/index').Chart;
var Point = require('../../lib/index').Point;
var Marker = require('../../lib/index').Marker;
var Popup = require('../../lib/index').Popup;
var Tile = require('../../lib/index').Tile;
var Polygon = require('../../lib/index').Polygon;

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
        contentPopup: null,
        zoomTranslate: null,
        zoomScale: null
      }
    },

    onZoom: function(zoomScale, zoomTranslate) {
      var xPopup = this.state.xPopup;
      var yPopup = this.state.yPopup;

      this.setState({
        xPopup: newX,
        yPopup: newY,
        zoomScale: zoomScale,
        zoomTranslate: zoomTranslate
      })
    },

    onClick: function(dom, d, x, y) {
      this.setState({
        xPopup: x,
        yPopup: y,
        contentPopup: d.properties.name
      })
    },

    render: function() {
      var zoomScale = this.state.zoomScale;
      var zoomTranslate = this.state.zoomTranslate;

      var width = 960;
      var height = 1160;
      var scale = 1200 * 5;
      var center = [-5, 55.4]
      var translate = [width / 2, height / 2];
      var projection = 'mercator';
      var pointRadius = 2;

      var proj = projectionFunc({
        projection: projection,
        scale: zoomScale? (zoomScale / 2 / Math.PI): scale,
        translate: zoomTranslate || translate,
        center: center
      });

      var tiles = tileFunc({
        scale: proj.scale() * 2 * Math.PI,
        translate: proj([0, 0]),
        size: ([width, height])
      });

      var uk = require('json!../data/uk.json');
      var uk_points = topojson.feature(uk, uk.objects.places).features;

      // data should be a MultiLineString
      var onZoom = this.onZoom;
      var onClick = this.onClick;

      var popup = (<Popup
        {...this.state}
      />);

      return (
        <div>
          <Chart
            width= {width}
            height= {height}
            projection = {proj}
            center= {center}
            onZoom= {onZoom}
          >
            <Tile
              tiles= {tiles}
            />
            <ZoomShape
              zoomTranslate= {zoomTranslate}
              zoomScale= {zoomScale}
              onClick= {onClick}
            />
          </Chart>
          {popup}
        </div>
      )
    }
  })

  var ZoomShape = React.createClass({


    render() {
      var zoomScale = this.props.zoomScale;
      var zoomTranslate = this.props.zoomTranslate;
      var onClick = this.props.onClick;

      var width = 960,
        height = 1160;

      var scale = 1200 * 5;
      var center = [-5, 55.4]
      var translate = [width / 2, height / 2];
      var projection = 'mercator';
      var pointRadius = 2;

      var proj = projectionFunc({
        projection: projection,
        scale: zoomScale? (zoomScale / 2 / Math.PI): scale,
        translate: zoomTranslate || translate,
        center: center
      });

      var geo = geoPath(proj, {
        pointRadius: pointRadius
      });

      var uk = require('json!../data/uk.json');
      var data = topojson.feature(uk, uk.objects.places);
      var land = topojson.feature(uk, uk.objects.subunits);

      var x = function(d) { return +proj(d.geometry.coordinates)[0]; }
      var y = function(d) { return +proj(d.geometry.coordinates)[1]; }


      var points = data.features.map(function(d, i) {
        return (
          <g key={i}>
            <Point
              key= {i}
              data= {d}
              geoPath= {geo}
              {...this.props}
            />

            <Marker
              key= {i.i}
              data= {d}
              x= {+proj(d.geometry.coordinates)[0]}
              y= {+proj(d.geometry.coordinates)[1]}
              onClick= {onClick}
              {...this.props}
            />
          </g>
        )
      }.bind(this))

      return (
        <g>
          <Polygon
            data={land}
            geoPath= {geo}
            {...this.props}
          />
          {points}
        </g>
      )
    }
  })

  ReactDOM.render(
    <ChartPopup />
    , document.getElementById('blank-zoom')
  )

})()
