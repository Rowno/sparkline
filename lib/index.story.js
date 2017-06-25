import React from 'react'
import {storiesOf} from '@storybook/react'

storiesOf('Button', module)
  .add('with text', () => (
    <button>Hello Button</button>
  ))
  .add('with some emoji', () => (
    <button>😀 😎 👍 💯</button>
  ))
