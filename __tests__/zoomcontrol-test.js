import {
  default as React
} from 'react';

import {
  default as TestUtils
} from 'react-addons-test-utils';

const expect = require('expect');
const ZoomControl = require('../lib/zoomControl');

describe('ZoomControl', () => {

  it('create a zoomControl panel', () => {
    var newControl = TestUtils.renderIntoDocument(
      <ZoomControl
        />
    );

    var control = TestUtils.findRenderedDOMComponentWithClass(
      newControl,
      "react-d3-map-core__zoom-control"
    );

    expect(control.style.left).toEqual('0px');
    expect(control.style.top).toEqual('0px');
    expect(control.children[0].tagName).toEqual('A')
    expect(control.children[1].tagName).toEqual('A')
    expect(control.children.length).toEqual(2);
  })

  it('should test zoomInClick function is working', () => {
    var zoomInChk = false;

    var zoomIn = function() {
      zoomInChk = true
    }

    var newControl = TestUtils.renderIntoDocument(
      <ZoomControl
        zoomInClick= {zoomIn}
      />
    );

    var control = TestUtils.findRenderedDOMComponentWithClass(
      newControl,
      "react-d3-map-core__zoom-control"
    );

    TestUtils.Simulate.click(control.children[0]);
    expect(zoomInChk).toEqual(true)
  })

  it('should test zoomInClick function is working', () => {
    var zoomOutChk = false;

    var zoomOut = function() {
      zoomOutChk = true
    }

    var newControl = TestUtils.renderIntoDocument(
      <ZoomControl
        zoomOutClick= {zoomOut}
      />
    );

    var control = TestUtils.findRenderedDOMComponentWithClass(
      newControl,
      "react-d3-map-core__zoom-control"
    );

    TestUtils.Simulate.click(control.children[1]);
    expect(zoomOutChk).toEqual(true)
  })

  it('should move panel position', () => {

    var newControl = TestUtils.renderIntoDocument(
      <ZoomControl
        left= {10}
        top= {30}
      />
    );

    var control = TestUtils.findRenderedDOMComponentWithClass(
      newControl,
      "react-d3-map-core__zoom-control"
    );

    expect(control.style.left).toEqual('10px')
    expect(control.style.top).toEqual('30px')
  })
})
