import React from 'react'

const Qrcode = props => (
  <svg height={24} viewBox='0 0 24 24' width={24} {...props}>
    <path fill='currentColor' d='M0 0v7h7V0zm5 5H2V2h3zM0 17h7v7H0zm5 5v-3H2v3zM17 0h7v7h-7zm5 5V2h-3v3zm0 4h2v8h-7v-2h5zm-5 10h7v5h-2v-3h-3v3h-2zM9 0h6v7h-2V2H9zm4 9h6v4h-2v-2h-2v4h-4v2h4v7h-2v-5H9v-6h4zM9 21h2v3H9zm-5-8h3v2H4zm5-9h2v7H2v4H0V9h9z' />
  </svg>
)

export default Qrcode
