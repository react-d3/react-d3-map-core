# react-d3-map

[![Dependency Status](https://gemnasium.com/react-d3/react-d3-map.svg)](https://gemnasium.com/react-d3/react-d3-map)

react d3 map components for reusability.


## Example

- Polygons

```js
<svg width={width} height={height}>
  <MapPolygons
    data={data}
    projection={'meracator'}
    style={
      "item1": {
        fill: "red"
      },
      "item2": {
        fill: "green"
      },
      "item3": {
        fill: "blue"
      },
      "item4": {
        fill: "yellow"
      }
    }
    class={function(d) {
      // d.id will be the extended class for the polygen
      return d.id;
    }}

  />
</svg>
```


## Install

```
npm install react-d3-map
```

## License

Apache 2.0
