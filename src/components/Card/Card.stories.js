import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Card from './Card'

storiesOf('Card', module)
  .add('enabled', () => (
    <Card enabled color='blue' title='sometitle' />
  ))
  .add('disabled', () => (
    <Card color='blue' title='sometitle' />
  ))
  .add('enabled with a description', () => (
    <Card enabled color='blue' title='sometitle'
      description='some description'
    />
  ))
  .add('enabled with an image', () => (
    <Card enabled color='blue' title='sometitle'
      image='https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
    />
  ))
  .add('enabled with a logo', () => (
    <Card enabled color='blue' title='sometitle'
      logo='https://upload.wikimedia.org/wikipedia/commons/f/fd/Qwant-v3.png'
    />
  ))
  .add('with trash icon', () => (
    <Card
      enabled
      color='blue'
      onTrash={action('onTrash')}
      title='sometitle'
      description='some description'
    />
  ))
