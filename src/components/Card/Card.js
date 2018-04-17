import React from 'react'
import PropTypes from 'prop-types'

import CardHeader from './CardHeader/CardHeader'

import './Card.css'

export default function Card (props) {
  const { logo, image, title, description, color, enabled, children, onChecked } = props
  const styles = {
    title: {
      display: 'flex',
      alignItems: 'center'
    },
    logo: {
      width: '16px',
      height: '16px',
      marginRight: '4px',
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      backgroundImage: 'url(' + logo + ')'
    }
  }

  const style = enabled
    ? { backgroundImage: 'url(' + image + ')' }
    : {
      backgroundImage: 'url(' + image + ')',
      filter: 'grayscale(50%)'
    }

  return (
    <div className='Card'>
      {image && <div className='image' style={style} />}
      <div className='flex'>
        <div className='content'>
          <CardHeader className='CardHeader' color={color} enabled={enabled} onChecked={onChecked} />
          {logo
            ? (
              <div style={styles.title}>
                {logo && <div id='logo' style={styles.logo} />}
                <h1>{title}</h1>
              </div>
            )
            : <h1>{title}</h1>
          }
          {description && <p className='description'>{description}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  logo: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.element,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onChecked: PropTypes.func
}
