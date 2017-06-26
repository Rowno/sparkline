import {configure} from '@storybook/react'

function loadStories() {
  require('../src/index.story.js') // eslint-disable-line import/no-unassigned-import
}

configure(loadStories, module)
