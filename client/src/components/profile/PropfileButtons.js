import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const PropfileButtons = ({ setActiveButton, activeButton }) => {
  const handleClick = e => {
    setActiveButton(e.target.name)
  }
  return (
    <Fragment>
      <input type="button" name='checks' className={`btn ${activeButton === 'checks' ? 'btn-primary' : 'btn-dark'}`} value="Csekkolások" onClick={(e) => handleClick(e)} />
      <input type="button" name='holidays' className={`btn ${activeButton ==='holidays' ? 'btn-primary' : 'btn-dark'}`} value="Szabadságok" onClick={(e) => handleClick(e)} />
      <input type="button" name='holiday-requests' className={`btn ${activeButton ==='holiday-requests' ? 'btn-primary' : 'btn-dark'}`} value="Szabadság kérelmek" onClick={(e) => handleClick(e)} />
    </Fragment>
  )
}

PropfileButtons.propTypes = {

}

export default PropfileButtons;
