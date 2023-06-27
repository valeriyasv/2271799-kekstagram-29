const lengthString = (str, maxLength) => str.length <= maxLength;
lengthString();

const isPalindrome = function (string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let result = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    result += newString[i];
  }
  return result === newString;
};
isPalindrome();

const getPositiveNumber = function (data) {
  let str = data;
  if (typeof str !== 'string') {
    str = str.toString();
  }

  let result = '';
  for (let i = 0; i <= str.length; i++) {
    const num = parseInt(str[i], 10);
    if (!Number.isNaN(num)) {
      result += num;
    }
  }
  return result;
};
getPositiveNumber();

const convertToMinutes = function (time) {
  const parts = time.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);

  return hours * 60 + minutes;
};

const meetingTime = function(startWorkDay, endWorkDay, startMeeting, durationMeeting) {
  const minutesStartWorkDay = convertToMinutes(startWorkDay);
  const minutesEndWorkDay = convertToMinutes(endWorkDay);
  const minutesStartMeeting = convertToMinutes(startMeeting);

  if (minutesStartMeeting < minutesStartWorkDay || (minutesEndWorkDay - minutesStartWorkDay) < durationMeeting || (minutesEndWorkDay - minutesStartMeeting) < durationMeeting) {
    return false;
  }
};

console.log(meetingTime());
