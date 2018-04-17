import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import 'typeface-asap'
import 'App.css'

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator((story, context) => withInfo('common info')(story)(context));

configure(loadStories, module);
