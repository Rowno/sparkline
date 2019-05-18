import React from 'react'
import {storiesOf} from '@storybook/react'
import Sparkline from '.'

const width = 56
const height = 12
const values1 = [354, 456, 200, 566, 344, 467, 545]
const values2 = [789, 880, 676, 200, 890, 677, 900]

storiesOf('Sparkline', module)
  .add('basic', () => {
    const lines = [
      {
        values: values1,
        title: 'Allowed events'
      }
    ]
    return <Sparkline width={width} height={height} lines={lines}/>
  })
  .add('lots of data', () => {
    const lines = [
      {
        values: values1
          .concat(values1)
          .concat(values1)
          .concat(values1)
      }
    ]
    return <Sparkline width={width} height={height} lines={lines}/>
  })
  .add('custom colors', () => {
    const lines = [
      {
        values: values1,
        colors: {area: '#e4f7ed', line: '#2B6B4C'}
      }
    ]
    return <Sparkline width={width} height={height} lines={lines}/>
  })
  .add('square', () => {
    return (
      <Sparkline width={width} height={width} lines={[{values: values1}]}/>
    )
  })
  .add('multiple sparklines', () => {
    const lines = [
      {
        values: values2,
        colors: {
          area: 'rgba(217, 227, 237, 0.5)',
          line: '#193652'
        },
        title: 'Denied events'
      },
      {
        values: values1,
        colors: {
          area: 'rgba(199, 228, 255, 0.5)',
          line: '#004585'
        },
        title: 'Allowed events'
      }
    ]
    return <Sparkline width={width} height={height} lines={lines}/>
  })
  .add('many sparks, so fast', () => {
    const sparklines = []
    for (let i = 0; i < 200; i++) {
      sparklines.push(
        <Sparkline
          key={i}
          width={width}
          height={height}
          lines={[{values: values1}]}
        />
      )
    }

    return <div>{sparklines}</div>
  })
