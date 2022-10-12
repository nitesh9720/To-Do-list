module.exports.getDate=getDate;
module.exports.getDay = getDay;

function getDay() {
  let today = new Date();
  var options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-us", options);
}
function getDate() {
  let today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return today.toLocaleDateString("en-us", options);
}
