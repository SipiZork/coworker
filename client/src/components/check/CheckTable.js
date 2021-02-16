import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDateStringFromDateTime, getWorkTime, getDayName, getYear, getMonth, getDate } from '../../utils/date';
import { createCheckFromAdmin, deleteCheckFromAdmin, updateTime } from '../../actions/check';
import { connect } from 'react-redux';

const CheckTable = ({ checks, userId, adminBtns, table, updateTime, createCheckFromAdmin, deleteCheckFromAdmin }) => {
  if (!adminBtns) {
    adminBtns = false;
  }
  const [formData, setFormData] = useState({
    newDate: '2020-12-06',
    newCheckIn: '00:00:00',
    newCheckOut: '00:00:00'
  });

  

  const [modify, setModify] = useState(false);
  const [times, setTimes] = useState({
    checkIn: '00:00:00',
    checkOut: '00:00:00',
  });

  const { checkIn, checkOut } = times;
  const { newDate, newCheckIn, newCheckOut } = formData;

  const modifyCheck = (id, checkIn, checkOut) => {
    setModify(id);
    setTimes({
      checkIn,
      checkOut
    })
  }

  const modifyApprove = (e, id, dateTime) => {
    setModify(false);
    let year = getYear(dateTime);
    let month = getMonth(dateTime);
    let day = getDate(dateTime);
    console.log('saveTime');
    // HA NINCSEN CHECKIN VAGY CHECKOUT AKKOR IS EL KELL KÜLDENÜNK EGY SZÁMOT
    // LE KELL ELLENŐRIZNI, HOGY VAN E, ÉS HA NINCS AKKOR EL KELL KÜLDENI EGY NULLÁT
    updateTime(userId, id, year, month, day, checkIn, checkOut);
  }

  const setTimeValue = e => {
    setTimes({
      ...times, [e.target.name]: e.target.value
    });
  }

  const changeHandle = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const addNewCheck = () => {
    let year = getYear(newDate);
    let month = getMonth(newDate);
    let day = getDate(newDate);
    let checkInTime = new Date(`${year}-${month}-${day} ${newCheckIn}`).getTime();
    let checkOutTime = new Date(`${year}-${month}-${day} ${newCheckOut}`).getTime();
    createCheckFromAdmin(userId, year, month, day, checkInTime, checkOutTime);
  }

  const deleteCheck = (id, dateTime) => {
    let year = getYear(dateTime);
    let month = getMonth(dateTime);
    deleteCheckFromAdmin(userId, id, year, month);
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
              <td>{modify && modify === check._id ? <input type="time" step="1" name="checkIn" value={checkIn} onChange={(e) => setTimeValue(e)} /> : check.checkIn ? getDateStringFromDateTime(check.checkIn) : ''}</td>
              <td>{modify && modify === check._id ? <input type="time" step="1" name="checkOut" value={checkOut} onChange={(e) => setTimeValue(e)} /> : check.checkOut ? getDateStringFromDateTime(check.checkOut) : ''}</td>
              <td>{getWorkTime(check.checkIn, check.checkOut)}</td>
              {adminBtns && !modify &&
                <td>
                  <i className="fas fa-pen" onClick={() => modifyCheck(check._id, getDateStringFromDateTime(check.checkIn), getDateStringFromDateTime(check.checkOut))}></i>
                  <i className="fas fa-trash-alt" onClick={() => deleteCheck(check._id, check.dateTime)}></i>
                </td>
              }
              {adminBtns && modify === check._id &&
                <td>
                  <i className="fas fa-check" onClick={(e) => modifyApprove(e, check._id, check.dateTime)}></i>
                </td>
              }
              {adminBtns && modify !== check._id &&
                <td>
                  
                </td>
              }
            </tr>
          );
        })}
        {adminBtns && (
          <tr>
              <td>
                <input type="date" name="newDate" value={newDate} onChange={(e) => changeHandle(e)}/>
              </td>
              <td>
                <input type="time" name="newCheckIn" step="1" value={newCheckIn} onChange={(e) => changeHandle(e)}/>
              </td>
              <td>
                <input type="time" name="newCheckOut" step="1" value={newCheckOut} onChange={(e) => changeHandle(e)}/>
              </td>
              <td>
              </td>
              <td>
                <i className="fas fa-plus-circle" onClick={addNewCheck}/>
              </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

CheckTable.propTypes = {
  updateTime: PropTypes.func.isRequired,
  createCheckFromAdmin: PropTypes.func.isRequired,
  deleteCheckFromAdmin: PropTypes.func.isRequired,
  checks: PropTypes.array.isRequired,
  userId: PropTypes.string
}

export default connect(null, { updateTime, createCheckFromAdmin, deleteCheckFromAdmin })(CheckTable);
