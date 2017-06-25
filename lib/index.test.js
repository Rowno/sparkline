import test from 'ava'
import {add} from './index'

test('adds domain to url', t => {
  t.is(add(2, 3), 5)
})
