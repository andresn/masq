import React from 'react'
import { storiesOf } from '@storybook/react'
import QRCode from './QRCode'

storiesOf('QRCode', module)
  .add('QRCode', () => (
    <QRCode link='QWA.NT/0BJ8ZX' image='http://www.datafakegenerator.com/temp/test409236e0431d1d4dcf66ffba56d9d43c.png' />
  ))
