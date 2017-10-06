import test from 'ava'
import React from 'react'
import render from 'react-test-renderer'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Sparkline from '../index'

Enzyme.configure({adapter: new EnzymeAdapter()})

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

test('snapshot', t => {
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values, title: 'Title 1'}, {values, title: 'Title 2'}]}
      />
  )
  t.snapshot(render.create(component).toJSON())
})

test('width', t => {
  const width = 123
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values}]}
      />
  )
  const wrapper = shallow(component)
  t.is(wrapper.prop('width'), width)
  t.is(wrapper.prop('viewBox'), `0 0 ${width} ${height}`)
})

test('height', t => {
  const height = 123
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values}]}
      />
  )
  const wrapper = shallow(component)
  t.is(wrapper.prop('height'), height)
  t.is(wrapper.prop('viewBox'), `0 0 ${width} ${height}`)
})

test('colors', t => {
  const colors = {area: '#e4f7ed', line: '#2B6B4C'}
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values, colors}]}
      />
  )
  const paths = shallow(component).find('path')
  t.is(paths.first().prop('fill'), colors.area)
  t.is(paths.last().prop('stroke'), colors.line)
})

test('title', t => {
  const title = 'Line title'
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values, title}]}
      />
  )
  const wrapper = shallow(component)
  t.is(wrapper.find('path title').text(), title)
})

test('multiple lines', t => {
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values}, {values}]}
      />
  )
  const wrapper = shallow(component)
  t.is(wrapper.find('g').length, 2)
  t.is(wrapper.find('path').length, 4)
})
