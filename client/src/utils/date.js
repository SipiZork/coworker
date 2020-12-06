export const getDateStringFromDateTime = dateTime => {
  const datetimeDate = new Date(dateTime);
  let string = datetimeDate.getHours() < 10 ? `0${datetimeDate.getHours()}` : datetimeDate.getHours();
  string += datetimeDate.getMinutes() < 10 ? `:0${datetimeDate.getMinutes()}` : `:${datetimeDate.getMinutes()}`;
  string += datetimeDate.getSeconds() < 10 ? `:0${datetimeDate.getSeconds()}` : `:${datetimeDate.getSeconds()}`;
  return string;
};

const convertToQuarters = min => {
  if (min < 15) {
    return 0;
  } if (min < 30) {
    return 15;
  } if (min < 45) {
    return 30;
  } if (min < 60) {
    return 45;
  }
}

export const getWorkTime = (checkInTime, checkOutTime) => {
  checkInTime = new Date(checkInTime).getTime();
  checkOutTime = new Date(checkOutTime).getTime();
  const msPerHour = 60 * 60 * 1000;
  const msPerMinutes = 60 * 1000;
  let workTimeHours = Math.floor((checkOutTime - checkInTime) / msPerHour);
  let workTimeMinutes = Math.floor((checkOutTime - checkInTime) / msPerMinutes - (workTimeHours * 60));
  let string = '';
  if (workTimeHours > 0 ) {
    string += `${workTimeHours} óra `;
  }
  if (convertToQuarters(workTimeMinutes) > 0) {
    string += `${convertToQuarters(workTimeMinutes)} perc`;
  }
  return string;
};

export const getYear = (dateTime) => {
  dateTime = new Date(dateTime);
  return dateTime.getFullYear();
}

export const getMonth = (dateTime) => {
  dateTime = new Date(dateTime);
  return dateTime.getMonth() + 1;
};

export const getDay = (dateTime) => {
  dateTime = new Date(dateTime);
  return dateTime.getDay()-1;
};

export const getDayName = (dateTime) => {
  dateTime = new Date(dateTime);
  const days = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
  return days[dateTime.getDay()];
}

export const getDate = (dateTime) => {
  dateTime = new Date(dateTime);
  return dateTime.getDate();
}

export const getMonthName = (dateTime) => {
  dateTime = new Date(dateTime);
  const month = getMonth(dateTime);
  switch (month) {
    case 1:
      return 'Január';
    case 2:
      return 'Február';
    case 3:
      return 'Március';
    case 4:
      return 'Április';
    case 5:
      return 'Május';
    case 6:
      return 'Június';
    case 7:
      return 'Július';
    case 8:
      return 'Augusztus';
    case 9:
      return 'Szeptember';
    case 10:
      return 'Október';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return 'Nincs hónap';
  }
};

export const getNumberFromMonthName = name => {
  switch (name) {
    case 'Január':
      return '1';
    case 'Február':
      return '2';
    case 'Március':
      return '3';
    case 'Április':
      return '4';
    case 'Május':
      return '5';
    case 'Június':
      return '6';
    case 'Július':
      return '7';
    case 'Augusztus':
      return '8';
    case 'Szeptember':
      return '9';
    case 'Október':
      return '10';
    case 'November':
      return '11';
    case 'December':
      return '12';
    default:
      return '0';
  }
}