import React from 'react'
import {storiesOf} from '@storybook/react'
import Sparkline from './index'

const width = 56
const height = 12
const data = [
  354,
  456,
  200,
  566,
  344,
  467,
  545
]

storiesOf('Sparkline', module)
  .add('basic', () => (
    <Sparkline
      width={width}
      height={height}
      title="Allowed events"
      data={data}
      />
  ))
  .add('lots of data', () => (
    <Sparkline
      width={width}
      height={height}
      data={data.concat(data).concat(data).concat(data)}
      />
  ))
  .add('custom colors', () => (
    <Sparkline
      width={width}
      height={height}
      colors={{
        area: '#e4f7ed',
        line: '#2B6B4C'
      }}
      data={data}
      />
  ))
  .add('large', () => (
    <Sparkline
      width={width * 2}
      height={height * 2}
      data={data}
      />
  ))
