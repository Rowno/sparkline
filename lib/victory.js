import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {VictoryArea} from 'victory'

export default class SparklineVictory extends Component {
  static displayName = 'SparklineVictory'
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  render() {
    const {data, width, height} = this.props
    return (
      <div style={{width, height}}>
        <VictoryArea
          data={data}
          width={width}
          height={height}
          interpolation="natural"
          style={{ // eslint-disable-line react/forbid-component-props
            data: {fill: '#EAF3FB'}
          }}
          padding={0}
          />
      </div>
    )
  }
}
