import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Modal from './Modal'

import { Button } from 'components'

storiesOf('Modal', module)
  .add('empty modal', () => (
    <Modal onClose={action('onClosed')} />
  ))
  .add('with a button as children', () => (
    <Modal onClose={action('onClosed')}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button label='A button inside a modal' />
      </div>
    </Modal>
  ))
