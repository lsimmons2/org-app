import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <h1>STUDY</h1>
    <IndexLink to='/points' activeClassName='page-layout__nav-item--active'>Points</IndexLink>
    {' · '}
    <IndexLink to='/economics' activeClassName='page-layout__nav-item--active'>Economics</IndexLink>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout

    //{' · '}
    //<Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
