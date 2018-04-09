import React from 'react'
import renderer from 'react-test-renderer'
import QRCode from './QRCode'

it('renders A QRCode', () => {
  const component = renderer.create(
    <QRCode image='http://www.datafakegenerator.com/temp/test409236e0431d1d4dcf66ffba56d9d43c.png' />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
