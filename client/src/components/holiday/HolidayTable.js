import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { getDateString, countDays } from '../../utils/date';
import { addHolidayFromAdmin, deleteHoliday, modifyHolidayStatus } from '../../actions/profile';
import { connect } from 'react-redux';

const HolidayTable = ({ holidays, userId, adminBtns, addHolidayFromAdmin, deleteHoliday, modifyHolidayStatus }) => {
  holidays = holidays[0];

  const [formData, setFormData] = useState({
    newFrom: '2020-12-17',
    newTo: '2020-12-18',
    newType: 'Fizetett'
  });

  const [modify, setModify] = useState(false);

  const [times, setTimes] = useState({
    from: '',
    to: ''
  });

  const { from, to } = times;
  const { newFrom, newTo, days, newType } = formData;

  const modifyHoliday = (id, from, to) => {
    setModify(id);
    setTimes({
      from,
      to
    })
  }

  const modifyApprove = id => {

  }

  const setTimeValue = e => {
    setTimes({
      ...times, [e.target.name]: e.target.value
    })
  }

  const changeHandle = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const deleteHolidayBtn = id => {
    deleteHoliday(userId, id);
  }

  const addNewHoliday = () => {
    addHolidayFromAdmin(userId, newFrom, newTo, newType);
  }

  const holidayStatus = (id, first = false, value = false) => {
    if (!first) {
      modifyHolidayStatus(userId, id);
    } else {
      modifyHolidayStatus(userId, id, value);
    }
  }

  return (
    <table className="checks-table">
      <caption className="text-weight text-primary text-medium">{ holidays ? 'Szabadásgok' : adminBtns ? 'Szabadság hozzáadása' : 'Nincsenek szabadságok'}</caption>
      <thead>
        <tr>
          <th>
            Mikortól
          </th>
          <th>
            Meddig
          </th>
          <th>
            Napok száma
          </th>
          <th>
            Típus
          </th>
          <th>
           Állapot  
          </th>
          {adminBtns &&
            <th>
              Műveletek  
            </th>
          }
        </tr>
      </thead>
      <tbody>
        {holidays && holidays.frees.map(free => {
          return (
            <tr key={free._id}>
              <td>{modify && modify === free._id ? <input type="date" name="from" value={from} onChange={(e) => setTimeValue(e)} /> : free.date.from ? getDateString(free.date.from) : ''}</td>
              <td>{modify && modify === free._id ? <input type="date" name="to" value={to} onChange={(e) => setTimeValue(e)} /> : free.date.to ? getDateString(free.date.to) : ''}</td>
              <td>{countDays(free.date.from, free.date.to)}</td>
              <td>{free.type}</td>
              <td>{free.accepted ? 'Elfogadva' : free.decision ? 'Elutasítva' : 'Elbírálás alatt'}</td>
              {adminBtns && !modify &&
                <td>
                {!free.decision ? 
                  <Fragment>
                    <i className='fas fa-check' onClick={() => holidayStatus(free._id, true, true)}></i>
                    <i className='fas fa-times' onClick={() => holidayStatus(free._id, true, false)}></i>
                  </Fragment> : 
                  <i className={`fas fa-${free.accepted ? 'times' : 'check'}`} onClick={() => holidayStatus(free._id)}></i>
                }
                  <i className="fas fa-pen" onClick={() => modifyHoliday(free._id, getDateString(free.date.from), getDateString(free.date.to))}></i>
                  <i className="fas fa-trash-alt" onClick={() => deleteHolidayBtn(free._id)}></i>
                </td>
              }
              {adminBtns && modify === free._id &&
                <td>
                  <i className="fas fa-check" onClick={() => modifyApprove(free._id)}></i>
                </td>
              }
              {adminBtns && modify !== free._id &&
                <td>
                
                </td>
              }
            </tr>
          );
        })}
        {adminBtns && !holidays && (
          <tr>
            <td>
              <input type="date" name="newFrom" value={newFrom} onChange={(e) => changeHandle(e)}/>
            </td>
            <td>
              <input type="date" name="newTo" step="1" value={newTo} onChange={(e) => changeHandle(e)}/>
            </td>
            <td>
                
            </td>
            <td>
              <select name="newType" value={newType} onChange={(e) => changeHandle(e)}>
                <option>Fizetett</option>
                <option>Nem Fizetett</option>
                <option>Táppénz</option>
              </select>
            </td>
            <td>
                
            </td>
            <td>
              <i className="fas fa-plus-circle" onClick={() => addNewHoliday()} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

HolidayTable.propTypes = {
  addHolidayFromAdmin: PropTypes.func.isRequired,
  deleteHoliday: PropTypes.func.isRequired,
  modifyHolidayStatus: PropTypes.func.isRequired
}

export default connect(null, { addHolidayFromAdmin, deleteHoliday, modifyHolidayStatus })(HolidayTable);
