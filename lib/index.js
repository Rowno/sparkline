import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import * as d3Shape from 'd3-shape'
import * as d3Scale from 'd3-scale'
import {max} from 'd3-array'

export default class SparklineD3 extends PureComponent {
  static displayName = 'SparklineD3'
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    title: PropTypes.string,
    colors: PropTypes.shape({
      area: PropTypes.string.isRequired,
      line: PropTypes.string.isRequired
    }).isRequired
  }
  static defaultProps = {
    title: null,
    colors: {
      area: '#EAF3FB',
      line: '#004585'
    }
  }

  render() {
    const {data, width, height, title, colors} = this.props
    const x = d3Scale.scaleLinear().domain([0, data.length - 1]).range([0, width])
    // Range 1 to make room for the stroke
    const y = d3Scale.scaleLinear().domain([0, max(data)]).range([height, 1])

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
        <path d={areaFunction(data)} fill={colors.area}>
          {title && <title>{title}</title>}
        </path>
        <path d={lineFunction(data)} stroke={colors.line} fill="none"/>
      </svg>
    )
  }
}
