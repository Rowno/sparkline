import React from 'react'
import {storiesOf} from '@storybook/react'
import Sparkline from './index'

const width = 56
const height = 12
const values1 = [
  354,
  456,
  200,
  566,
  344,
  467,
  545
]
const values2 = [
  789,
  880,
  676,
  200,
  890,
  677,
  900
]

storiesOf('Sparkline', module)
  .add('basic', () => {
    const sparks = [{
      values: values1,
      title: 'Allowed events'
    }]
    return (
      <Sparkline
        width={width}
        height={height}
        sparks={sparks}
        />
    )
  })
  .add('lots of data', () => {
    const sparks = [{
      values: values1.concat(values1).concat(values1).concat(values1)
    }]
    return (
      <Sparkline
        width={width}
        height={height}
        sparks={sparks}
        />
    )
  })
  .add('custom colors', () => {
    const sparks = [{
      values: values1,
      colors: {area: '#e4f7ed', line: '#2B6B4C'}
    }]
    return (
      <Sparkline
        width={width}
        height={height}
        sparks={sparks}
        />
    )
  })
  .add('large', () => {
    return (
      <Sparkline
        width={width * 2}
        height={height * 2}
        sparks={[{values: values1}]}
        />
    )
  })
  .add('multiple sparklines', () => {
    const sparks = [
      {
        values: values2,
        colors: {
          area: 'rgba(217, 227, 237, 0.5)',
          line: '#193652'
        },
        title: 'Denied events'
      }, {
        values: values1,
        colors: {
          area: 'rgba(199, 228, 255, 0.5)',
          line: '#004585'
        },
        title: 'Allowed events'
      }
    ]
    return (
      <Sparkline
        width={width}
        height={height}
        sparks={sparks}
        />
    )
  })
