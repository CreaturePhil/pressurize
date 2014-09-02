var month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Converts date format to Month day, Year
exports.format_date = function(date) {
  return month_names[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// Converts date to how long ago from date.now()
exports.diff_date = function(date) {

  var elapsed = new Date() - date;

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var time = Math.round(elapsed/msPerYear);


  if (elapsed < msPerMinute) {
    time = Math.round(elapsed/1000);
    return time === 1 ? time + ' second ago' : time + ' seconds ago';
  }

  if (elapsed < msPerHour) {
    time = Math.round(elapsed/msPerMinute);
    return time === 1 ? time + ' minute ago' : time + ' minutes ago';
  }

  if (elapsed < msPerDay) {
    time = Math.round(elapsed/msPerHour);
    return time === 1 ? time + ' hour ago' : time + ' hours ago';
  }

  if (elapsed < msPerMonth) {
    time = Math.round(elapsed/msPerDay);
    return time === 1 ? time + ' day ago' : time + ' days ago';
  }

  if (elapsed < msPerYear) {
    time = Math.round(elapsed/msPerMonth);
    return time === 1 ? time + ' month ago' : time + ' months ago';
  }

  return  time === 1 ? time + ' year ago' : time + ' years ago';
}
