import React from 'react'

const Plus = props => (
  <svg
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    {...props}
  >
    <defs>
      <path
        id='plus-svg'
        d='M16 8c0 .6-.4 1-1 1H9v6c0 .6-.4 1-1 1s-1-.4-1-1V9H1c-.6 0-1-.4-1-1s.4-1 1-1h6V1c0-.6.4-1 1-1s1 .4 1 1v6h6c.6 0 1 .4 1 1z'
      />
    </defs>
    <use fill='currentColor' fillRule='nonzero' xlinkHref='#plus-svg' />
  </svg>
)

export default Plus
