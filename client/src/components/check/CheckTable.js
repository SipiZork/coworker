import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDateStringFromDateTime, getWorkTime, getDayName, getYear, getMonth, getDate } from '../../utils/date';
import { updateTime } from '../../actions/check';
import { connect } from 'react-redux';

const CheckTable = ({ checks, userId, adminBtns, updateTime }) => {
  if (!adminBtns) {
    adminBtns = false;
  }

  const [modify, setModify] = useState(false);
  const [times, setTimes] = useState({
    checkIn: '00:00',
    checkOut: '00:00',
  });

  const { checkIn, checkOut } = times;

  const modifyCheck = (id, checkIn, checkOut) => {
    setModify(id);
    setTimes({
      checkIn,
      checkOut
    })
  }


  const deleteCheck = id => {

  }
  
  const modifyApprove = (e, id) => {
    setModify(false);
  }

  const setTimeValue = (e) => {
    setTimes({
      ...times, [e.target.name]: e.target.value
    });
  }

  const saveTime = (e, id, direction, dateTime) => {
    let year = getYear(dateTime);
    let month = getMonth(dateTime);
    let day = getDate(dateTime);
    updateTime(userId, id, year, month, day, direction, e.target.value);
    console.log('saveTime');
    setModify(false);
  }

  return (
    <table className="checks-table">
      <caption className="text-weight text-primary text-medium">Csekkolások</caption>
      <thead>
        <tr>
          <th>
            Dátum
          </th>
          <th>
            Becsekkolás
          </th>
          <th>
            Kicsekkolás
          </th>
          <th>
            Munkaidő
          </th>
          {adminBtns && 
            <th>
              Műveletek  
            </th>
          }
        </tr>
      </thead>
      <tbody>
        {checks && checks.map(check => {
          
          return (
            <tr key={check._id}>
              <td>{check.date} ({getDayName(check.dateTime)})</td>
              <td>{modify && modify === check._id ? <input type="time" name="checkIn" value={checkIn} onChange={(e) => setTimeValue(e)} onChange={(e) => saveTime(e, check._id, 'in', check.dateTime)} /> : check.checkIn ? getDateStringFromDateTime(check.checkIn) : ''}</td>
              <td>{modify && modify === check._id ? <input type="time" name="checkOut" value={checkOut} onChange={(e) => setTimeValue(e)} onChange={(e) => saveTime(e, check._id, 'out', check.dateTime)} /> : check.checkOut ? getDateStringFromDateTime(check.checkOut) : ''}</td>
              <td>{getWorkTime(check.checkIn, check.checkOut)}</td>
              {adminBtns && !modify &&
                <td>
                  <i className="fas fa-pen" onClick={() => modifyCheck(check._id, getDateStringFromDateTime(check.checkIn), getDateStringFromDateTime(check.checkOut))}></i>
                  <i className="fas fa-trash-alt" onClick={() => deleteCheck(check._id)}></i>
                </td>
              }
              {adminBtns && modify === check._id &&
                <td>
                  <i className="fas fa-check" onClick={(e) => modifyApprove(e, check._id)}></i>
                </td>
              }
              {adminBtns && modify !== check._id &&
                <td>
                  
                </td>
              }
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

CheckTable.propTypes = {
  updateTime: PropTypes.func.isRequired,
  checks: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(null, { updateTime })(CheckTable);
