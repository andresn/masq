import React from 'react'

const Apps = props => (
  <svg
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={20}
    height={20}
    viewBox='0 0 20 20'
    {...props}
  >
    <defs>
      <path
        id='apps-svg'
        d='M17 0H3C1.3 0 0 1.3 0 3v14c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zM3 2h14c.6 0 1 .4 1 1v3H2V3c0-.6.4-1 1-1zM2 17V8h4v10H3c-.6 0-1-.4-1-1zm15 1H8V8h10v9c0 .6-.4 1-1 1z'
      />
    </defs>
    <use fill='currentColor' fillRule='nonzero' xlinkHref='#apps-svg' />
  </svg>
)

export default Apps
