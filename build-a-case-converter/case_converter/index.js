const getUpperCase = (str) => {
  return str.toUpperCase();
};

const getLowerCase = (str) => {
  return str.toLowerCase();
};

const getSentenceCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getProperCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase,
};