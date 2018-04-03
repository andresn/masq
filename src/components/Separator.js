import React from 'react'

export default function Separator (props) {
  const style = { marginTop: props.height || '16px' }
  return (<div id='separator' style={style} />)
}
