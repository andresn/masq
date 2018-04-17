import { configure } from '@storybook/react';

import 'typeface-asap'
import 'App.css'

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
