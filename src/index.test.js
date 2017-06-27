import test from 'ava'
import React from 'react'
import render from 'react-test-renderer'
import Sparkline from './index'

const values = [
  354,
  456,
  200,
  566,
  344,
  467,
  545
]
const width = 56
const height = 12

test('basic usage', t => {
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values}]}
      />
  )
  t.snapshot(render.create(component).toJSON())
})

test('width/height', t => {
  const component = (
    <Sparkline
      width={100}
      height={100}
      lines={[{values}]}
      />
  )
  t.snapshot(render.create(component).toJSON())
})

test('colors', t => {
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values, colors: {area: '#e4f7ed', line: '#2B6B4C'}}]}
      />
  )
  t.snapshot(render.create(component).toJSON())
})

test('title', t => {
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values, title: 'Line title'}]}
      />
  )
  t.snapshot(render.create(component).toJSON())
})

test('multiple lines', t => {
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values}, {values}]}
      />
  )
  t.snapshot(render.create(component).toJSON())
})
