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
