import test from 'ava'
import React from 'react'
import render from 'react-test-renderer'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Sparkline, {defaultColors} from '.'

Enzyme.configure({adapter: new EnzymeAdapter()})

const values = [354, 456, 200, 566, 344, 467, 545]
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
    <Sparkline width={width} height={height} lines={[{values}]}/>
  )
  const wrapper = shallow(component)
  t.is(wrapper.prop('width'), width)
  t.is(wrapper.prop('viewBox'), `0 0 ${width} ${height}`)
})

test('height', t => {
  const height = 123
  const component = (
    <Sparkline width={width} height={height} lines={[{values}]}/>
  )
  const wrapper = shallow(component)
  t.is(wrapper.prop('height'), height)
  t.is(wrapper.prop('viewBox'), `0 0 ${width} ${height}`)
})

test('showLine', t => {
  const component = (
    <Sparkline width={width} height={height} lines={[{values, showLine: true}]}/>
  )
  const paths = shallow(component).find('path')
  t.is(paths.length, 1)
  t.is(paths.first().prop('stroke'), defaultColors.line)
  t.is(paths.first().prop('strokeWidth'), 1)
  t.is(paths.first().prop('fill'), 'none')
})

test('stroke', t => {
  const component = (
    <Sparkline width={width} height={height} lines={[{values, showLine: true, stroke: '#ee1d4d'}]}/>
  )
  const paths = shallow(component).find('path')
  t.is(paths.length, 1)
  t.is(paths.first().prop('stroke'), '#ee1d4d')
  t.is(paths.first().prop('strokeWidth'), 1)
  t.is(paths.first().prop('fill'), 'none')
})

test('strokeWidth', t => {
  const component = (
    <Sparkline width={width} height={height} lines={[{values, showLine: true, strokeWidth: 1.5}]}/>
  )
  const paths = shallow(component).find('path')
  t.is(paths.length, 1)
  t.is(paths.first().prop('stroke'), defaultColors.line)
  t.is(paths.first().prop('strokeWidth'), 1.5)
  t.is(paths.first().prop('fill'), 'none')
})

test('showArea', t => {
  const component = (
    <Sparkline width={width} height={height} lines={[{values, showArea: true}]}/>
  )
  const paths = shallow(component).find('path')
  t.is(paths.length, 1)
  t.is(paths.first().prop('fill'), defaultColors.area)
})

test('fill', t => {
  const component = (
    <Sparkline width={width} height={height} lines={[{values, showArea: true, fill: '#fff'}]}/>
  )
  const paths = shallow(component).find('path')
  t.is(paths.length, 1)
  t.is(paths.first().prop('fill'), '#fff')
})

test('showLine & showArea', t => {
  const component = (
    <Sparkline width={width} height={height} lines={[{values, showLine: true, showArea: true}]}/>
  )
  const paths = shallow(component).find('path')
  t.is(paths.length, 2)
  t.is(paths.first().prop('fill'), defaultColors.area)
  t.is(paths.last().prop('stroke'), defaultColors.line)
  t.is(paths.last().prop('strokeWidth'), 1)
  t.is(paths.last().prop('fill'), 'none')
})

test('title', t => {
  const title = 'Line title'
  const component = (
    <Sparkline width={width} height={height} lines={[{values, showArea: true, title}]}/>
  )
  const wrapper = shallow(component)
  t.is(wrapper.find('path title').text(), title)
})

test('multiple lines', t => {
  const component = (
    <Sparkline
      width={width}
      height={height}
      lines={[{values, showLine: true, showArea: true}, {values, showLine: true, showArea: true}]}/>
  )
  const wrapper = shallow(component)
  t.is(wrapper.find('g').length, 2)
  t.is(wrapper.find('path').length, 4)
})
