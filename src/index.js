import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {area, line, curveMonotoneX} from 'd3-shape'
import {scaleLinear} from 'd3-scale'
import {max} from 'd3-array'

const curveFunction = curveMonotoneX
export const defaultColors = {
  area: 'rgba(199, 228, 255, 0.5)',
  line: '#004585'
}
export const defaultStrokeWidth = 1

export default class Sparkline extends PureComponent {
  static displayName = 'Sparkline'

  static propTypes = {
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        values: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        showLine: PropTypes.boolean,
        stroke: PropTypes.string,
        strokeWidth: PropTypes.number,
        showArea: PropTypes.boolean,
        fill: PropTypes.string,
        title: PropTypes.string,
        key: PropTypes.any
      })
    ).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  render() {
    const {lines, width, height} = this.props
    const maxX = max(lines, s => s.values.length - 1)
    const maxY = max(lines, s => max(s.values))
    const x = scaleLinear().domain([0, maxX]).range([0, width])
    // Set range to 1 to make room for the line stroke
    const y = scaleLinear().domain([0, maxY]).range([height, 1])

    const areaFunction =
      area()
        .x((d, i) => x(i))
        .y0(height)
        .y1(d => y(d))
        .curve(curveFunction)

    const lineFunction =
      line()
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(curveFunction)

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {lines.map((line, index) => (
          <g key={line.key || index}>
            {line.showArea && (
              <path d={areaFunction(line.values)} fill={line.fill || defaultColors.area}>
                {line.title && <title>{line.title}</title>}
              </path>
            )}
            {line.showLine && (
              <path
                d={lineFunction(line.values)}
                stroke={line.stroke || defaultColors.line}
                strokeWidth={line.strokeWidth || defaultStrokeWidth}
                fill="none"/>
            )}
          </g>
        ))}
      </svg>
    )
  }
}
