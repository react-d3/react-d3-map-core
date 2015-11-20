
var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Chart = require('../../lib/index').Chart;
var Point = require('../../lib/index').Point;
var Marker = require('../../lib/index').Marker;
var Popup = require('../../lib/index').Popup;
var Tile = require('../../lib/index').Tile;
var Polygon = require('../../lib/index').Polygon;
var ZoomControl = require('../../lib/index').ZoomControl;

var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;
var tileFunc = require('../../lib/index').tileFunc;

// Example
(function() {
  var ChartPopup = React.createClass({
    getInitialState: function() {
      var height= this.props.height;
      var width = this.props.width;
      var projeciton= this.props.projection;
      var translate= this.props.translate;
      var center = this.props.center;
      var scale = this.props.scale;

      var proj = projectionFunc({
        projection: projection,
        scale: scale,
        translate: translate,
        center: center
      });

      var tiles = tileFunc({
        scale: proj.scale() * 2 * Math.PI,
        translate: proj([0, 0]),
        size: ([width, height])
      });

      return {
        zoomTranslate: null,
        scale: scale,
        times: 1,
        tiles: tiles,
        proj: proj,
        tileScale: tiles.scale,
        tileTranslate: tiles.translate
      }
    },

    onZoom: function(zoomScale, zoomTranslate) {
      var times = this.state.times;
      // tiles only translate and scale
      // don't change tiles

      var height= this.props.height;
      var width = this.props.width;
      var projeciton= this.props.projection;
      var translate= this.props.translate;
      var center = this.props.center;

      var proj = projectionFunc({
        projection: projection,
        scale: (zoomScale / 2 / Math.PI) * times,
        translate: zoomTranslate,
        center: center
      });

      var tiles = tileFunc({
        scale: proj.scale() * 2 * Math.PI,
        translate: proj([0, 0]),
        size: ([width, height])
      });

      this.setState({
        scale: zoomScale * times,
        zoomTranslate: zoomTranslate,
        proj: proj,
        tiles: tiles,
        tileScale: tiles.scale,
        tileTranslate: tiles.translate
      })
    },

    zoomIn: function() {
      var times = this.state.times;

      this.setState({
        times: times * 2,
        scale: this.state.scale * 2
      })
    },

    zoomOut: function() {
      var times = this.state.times;

      this.setState({
        times: times / 2,
        scale: this.state.scale / 2
      })
    },

    render: function() {
      var zoomTranslate = this.state.zoomTranslate;

      var tiles = this.state.tiles;
      var tileScale= this.state.tileScale;
      var tileTranslate = this.state.tileTranslate;
      var scale = this.state.scale;
      var proj = this.state.proj;

      var width = this.props.width;
      var height= this.props.height;
      var center = this.props.center;
      var translate = this.props.translate;
      var projection = this.props.projection;
      var pointRadius= this.props.pointRadius

      // var zoomDelta = 0;
      // var z, z0;
      //
      // z = Math.max(Math.log(projection.scale() * 2 * Math.PI) / Math.LN2 - 8, 0);
      // // zoom level
      // z0 = Math.round(z + zoomDelta);

      // Math.round(scale / tiles.scale)

      var uk = require('json!../data/uk.json');
      var uk_points = topojson.feature(uk, uk.objects.places).features;

      // data should be a MultiLineString
      var onZoom = this.onZoom;
      var zoomIn = this.zoomIn;
      var zoomOut = this.zoomOut;
      var style = {position: 'relative'}

      return (
        <div style={style}>
          <Chart
            width= {width}
            height= {height}
            projection = {proj}
            center= {center}
            onZoom= {onZoom}
          >
            <Tile
              tiles= {tiles}
              scale= {tileScale}
              translate= {tileTranslate}
            />
            <ZoomShape
              width= {width}
              height= {height}
              scale= {scale}
              center= {center}
              translate= {translate}
              projection= {projection}
              pointRadius= {pointRadius}
              zoomTranslate= {zoomTranslate}
              proj= {proj}
            />
          </Chart>
          <ZoomControl
            zoomInClick= {zoomIn}
            zoomOutClick= {zoomOut}
          />
        </div>
      )
    }
  })

  var ZoomShape = React.createClass({
    render() {
      var pointRadius= this.props.pointRadius;
      var proj = this.props.proj;

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

            <MarkerGroup
              key= {i.i}
              data= {d}
              x= {+proj(d.geometry.coordinates)[0]}
              y= {+proj(d.geometry.coordinates)[1]}
              {...this.props}
            />
          </g>
        )
      }.bind(this))

      return (
        <g>
          {points}
        </g>
      )
    }
  })


  var MarkerGroup = React.createClass({
    getInitialState: function() {
      return {
        showPopup: false
      }
    },

    onClick: function() {
      this.setState({
        showPopup: !this.state.showPopup
      })
    },

    render: function() {
      var data = this.props.data;
      var x = this.props.x;
      var y = this.props.y;
      var showPopup= this.state.showPopup;
      var popup;

      var onClick = this.onClick;
      var content = "Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. Weighing just about 33 KB of JS, it has all the mapping features most developers ever need.";

      if(showPopup) {
        popup = (
          <Popup
            x= {x}
            y= {y - 50}
            contentPopup={content}
            closeClick= {onClick}
          />
        )
      }

      return (
        <g>
          <Marker
            data= {data}
            x= {x}
            y= {y}
            onClick= {onClick}
          />
          {popup}
        </g>
      )
    }
  })

  var width = 960;
  var height = 1160;
  var center = [-5, 55.4]
  var translate = [width / 2, height / 2];
  var projection = 'mercator';
  var pointRadius = 2;
  var scale = 1200 * 5;

  ReactDOM.render(
    <ChartPopup
      width= {width}
      height= {height}
      center= {center}
      translate= {translate}
      projection= {projection}
      pointRadius= {pointRadius}
      scale= {scale}
      />
    , document.getElementById('blank-zoom')
  )

})()
