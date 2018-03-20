import React from 'react'

const Home = props => (
  <svg
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={20}
    height={22}
    viewBox='0 0 20 22'
    {...props}
  >
    <defs>
      <path
        id='home-svg'
        d='M19.6 7.217l-9-6.992c-.4-.3-.9-.3-1.2 0l-9 6.992c-.3.2-.4.5-.4.799v10.987C0 20.701 1.3 22 3 22h14c1.7 0 3-1.299 3-2.997V8.016c0-.3-.1-.6-.4-.8zM12 20.002H8v-7.99h4v7.99zm6-.999c0 .6-.4 1-1 1h-3v-8.99c0-.6-.4-1-1-1H7c-.6 0-1 .4-1 1v8.99H3c-.6 0-1-.4-1-1V8.515l8-6.193 8 6.193v10.488z'
      />
    </defs>
    <use fill='currentColor' fillRule='nonzero' xlinkHref='#home-svg' />
  </svg>
)

export default Home
