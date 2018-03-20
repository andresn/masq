import React from 'react'

const Infos = props => (
  <svg
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={22}
    height={22}
    viewBox='0 0 22 22'
    {...props}
  >
    <defs>
      <path
        id='infos-svg'
        d='M11 0C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11S17.1 0 11 0zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm1-9v4c0 .6-.4 1-1 1s-1-.4-1-1v-4c0-.6.4-1 1-1s1 .4 1 1zm-.3-4.7c.2.2.3.4.3.7 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3h-.2c-.1 0-.1 0-.2-.1-.1 0-.1-.1-.2-.1s-.1-.1-.1-.1c-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7l.1-.1c.1 0 .1-.1.2-.1s.1 0 .2-.1c.3 0 .7.1.9.3z'
      />
    </defs>
    <use fill='currentColor' fillRule='nonzero' xlinkHref='#infos-svg' />
  </svg>
)

export default Infos
