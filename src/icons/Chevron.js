import React from 'react'

const Chevron = props => (
  <svg
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={14}
    height={10}
    viewBox='0 0 14 10'
    {...props}
  >
    <defs>
      <path
        id='chevron-svg'
        d='M13.7 1.7l-6 6c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3l-6-6C-.1 1.3-.1.7.3.3c.4-.4 1-.4 1.4 0L7 5.6 12.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4z'
      />
    </defs>
    <use fill='currentColor' fillRule='nonzero' xlinkHref='#chevron-svg' />
  </svg>
)

export default Chevron
