import * as React from 'react'
import { configure, addDecorator } from '@storybook/react'
import injectGlobalStyles from '../components/GlobalStyles'
function loadStories() {
  require('../components/stories/index')
  // You can require as many stories as you need.
}
addDecorator(story => {
  injectGlobalStyles()
  return React.createElement('div', {}, story())
})
configure(loadStories, module)
