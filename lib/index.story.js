import React from 'react'
import {storiesOf} from '@storybook/react'
import SparklineVictory from './victory'

storiesOf('Sparkline', module)
  .add('Victory', () => (
    <SparklineVictory
      width={40}
      height={20}
      data={[
        354,
        456,
        100,
        566,
        344,
        467,
        754
      ]}
      />
  ))
