import React from 'react'

const CameraSquare = props => (
  <svg height={120} viewBox='0 0 120 120' width={120} {...props}>
    <g fill='none' fillRule='evenodd'>
      <rect
        height={118}
        opacity={0.5}
        rx={10}
        stroke='#999'
        strokeWidth={2}
        width={118}
        x={1}
        y={1}
      />
      <path
        d='M77.2 46.6h-6.533l-3.174-4.853C67.12 41.373 66.56 41 66 41H54.8c-.56 0-1.12.373-1.493.747L50.133 46.6H43.6c-3.173 0-5.6 2.427-5.6 5.6v20.533c0 3.174 2.427 5.6 5.6 5.6h33.6c3.173 0 5.6-2.426 5.6-5.6V52.2c0-3.173-2.427-5.6-5.6-5.6zm1.867 26.133c0 1.12-.747 1.867-1.867 1.867H43.6c-1.12 0-1.867-.747-1.867-1.867V52.2c0-1.12.747-1.867 1.867-1.867h7.467c.56 0 1.12-.373 1.493-.746l3.173-4.854h9.147l3.173 4.854c.56.373 1.12.746 1.68.746H77.2c1.12 0 1.867.747 1.867 1.867zM60.4 52.2c-5.227 0-9.333 4.107-9.333 9.333 0 5.227 4.106 9.334 9.333 9.334s9.333-4.107 9.333-9.334c0-5.226-4.106-9.333-9.333-9.333zm0 14.933c-3.173 0-5.6-2.426-5.6-5.6 0-3.173 2.427-5.6 5.6-5.6s5.6 2.427 5.6 5.6c0 3.174-2.427 5.6-5.6 5.6z'
        fill='#ccc'
        fillRule='nonzero'
      />
    </g>
  </svg>
)

export default CameraSquare
