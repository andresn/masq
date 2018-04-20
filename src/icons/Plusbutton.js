import React from 'react'

const PlusButton = props => (
  <svg height={120} viewBox='0 0 120 120' width={120} {...props}>
    <g fill='none' fillRule='evenodd'>
      <g opacity={0.5}>
        <rect fill='#1f2330' height={120} rx={10} width={120} />
        <rect
          height={118}
          rx={10}
          stroke='#fff'
          strokeWidth={2}
          width={118}
          x={1}
          y={1}
        />
      </g>
      <path
        d='M78.667 60c0 1.4-.934 2.333-2.334 2.333h-14v14c0 1.4-.933 2.334-2.333 2.334s-2.333-.934-2.333-2.334v-14h-14c-1.4 0-2.334-.933-2.334-2.333s.934-2.333 2.334-2.333h14v-14c0-1.4.933-2.334 2.333-2.334s2.333.934 2.333 2.334v14h14c1.4 0 2.334.933 2.334 2.333z'
        fill='#fff'
        fillRule='nonzero'
        opacity={0.5}
      />
    </g>
  </svg>
)

export default PlusButton
