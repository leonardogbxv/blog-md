// Formats date to 'DD MMM YYYY' custom format
function formatDate(date) {
  const dateString = new Date(date).toString();
  const splitDate = dateString.split(' ');
  const dateArr = splitDate.slice(1, 4).map(month => month.toUpperCase());
  dateArr.splice(1, 1, dateArr.splice(0, 1, dateArr[1])[0]);

  return dateArr.join(' ');
}

module.exports.formatDate = formatDate;
