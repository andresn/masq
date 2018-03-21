import React from 'react'

const Plusbutton = props => (
  <svg
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={120}
    height={120}
    viewBox='0 0 120 120'
    {...props}
  >
    <defs>
      <circle id='a' cx={60} cy={60} r={60} />
      <path
        id='b'
        d='M78.667 60c0 1.4-.934 2.333-2.334 2.333h-14v14c0 1.4-.933 2.334-2.333 2.334-1.4 0-2.333-.934-2.333-2.334v-14h-14c-1.4 0-2.334-.933-2.334-2.333 0-1.4.934-2.333 2.334-2.333h14v-14c0-1.4.933-2.334 2.333-2.334 1.4 0 2.333.934 2.333 2.334v14h14c1.4 0 2.334.933 2.334 2.333z'
      />
    </defs>
    <g fill='none' fillRule='evenodd'>
      <use fill='#FFF' xlinkHref='#a' />
      <circle cx={60} cy={60} r={59} stroke='#CCC' strokeWidth={2} />
      <use fill='#CCC' fillRule='nonzero' xlinkHref='#b' />
    </g>
  </svg>
)

export default Plusbutton
