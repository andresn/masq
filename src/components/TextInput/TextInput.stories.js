import React from 'react'
import { storiesOf } from '@storybook/react'
import TextInput from './TextInput'

storiesOf('TextInput', module)
  .add('with one label', () => (
    <TextInput label='some input' />
  ))
  .add('with one label and a default value', () => (
    <TextInput label='some button' defaultValue='default text' />
  ))
  .add('with error', () => (
    <TextInput label='some button' error />
  ))
