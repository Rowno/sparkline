import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import * as d3Shape from 'd3-shape'
import * as d3Scale from 'd3-scale'
import {max} from 'd3-array'

const defaultColors = {
  area: 'rgba(199, 228, 255, 0.5)',
  line: '#004585'
}

export default class SparklineD3 extends PureComponent {
  static displayName = 'SparklineD3'
  static propTypes = {
    sparks: PropTypes.arrayOf(
      PropTypes.shape({
        values: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        colors: PropTypes.shape({
          area: PropTypes.string.isRequired,
          line: PropTypes.string.isRequired
        }),
        title: PropTypes.string,
        key: PropTypes.any
      })
    ).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  render() {
    const {sparks, width, height} = this.props
    const maxX = max(sparks, s => s.values.length - 1)
    const maxY = max(sparks, s => max(s.values))
    const x = d3Scale.scaleLinear().domain([0, maxX]).range([0, width])
    // Set range 1 to make room for the line stroke
    const y = d3Scale.scaleLinear().domain([0, maxY]).range([height, 1])

    const areaFunction =
      d3Shape.area()
      .x((d, i) => x(i))
      .y0(height)
      .y1(d => y(d))
      .curve(d3Shape.curveNatural)

    const lineFunction =
      d3Shape.line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3Shape.curveNatural)

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {sparks.map((spark, index) => {
          const colors = {
            ...defaultColors,
            ...spark.colors
          }
          return (
            <g key={spark.key || index}>
              <path d={areaFunction(spark.values)} fill={colors.area}>
                {spark.title && <title>{spark.title}</title>}
              </path>
              <path d={lineFunction(spark.values)} stroke={colors.line} fill="none"/>
            </g>
          )
        })}
      </svg>
    )
  }
}
