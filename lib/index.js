// takes minutes qty(integer) and returns on object: 
//  {timeQty: int,
//   timePeriod: ('minutes', 'hours', 'days', 'weeks')}
// where timePeriod is the maximum possible without a partial of that timePeriod
// 50 minutes should display 50 minutes
// 60 minutes should display 1 hour
// 70 minutes should display 70 minutes
// 1440 minutes should display 1 day
// 1441 minutes should display 1440 minutes
// 6 days should display 6 days
// 7 days should display 1 week 
// 8 days should display 8 days
// etc 

// (function(root) {

(function () {

  var root = this; 

  var minutesToMaxHumanTime = {getMax: getMax, getMinutes: getMinutes}; 

  var MINUTES_IN_HOUR = 60; 
  var MINUTES_IN_DAY = 60*24; 
  var MINUTES_IN_WEEK = 60*24*7; 

  // thanks async: 
  // Export the minutesToMaxHumanTime object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `minutesToMaxHumanTime` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = minutesToMaxHumanTime;
    }
    exports.minutesToMaxHumanTime = minutesToMaxHumanTime;
  } else {
    root.minutesToMaxHumanTime = minutesToMaxHumanTime;
  }

  function getMax(minutes, returnObj, maxMinutes) {

    var timeQty; 

    returnObj = returnObj && isObjectLiteral(returnObj) ? returnObj : {}; 

    maxMinutes = maxMinutes ? maxMinutes : 40320; 

    minutes = minutes > maxMinutes ? maxMinutes : minutes; 

    // if minutes is 0, then should return 0  minutes
    if(minutes === 0) { 
      updateReturnObj(minutes, 'minutes'); 
      return returnObj; 
    }

    if(minutes % MINUTES_IN_WEEK === 0 ) {
      timeQty = minutes / MINUTES_IN_WEEK; 
      updateReturnObj(timeQty, 'weeks'); 
      return returnObj; 
    }

    if(minutes % MINUTES_IN_DAY === 0 ) {
      timeQty = minutes / MINUTES_IN_DAY; 
      updateReturnObj(timeQty, 'days'); 
      return returnObj; 
    }

    if(minutes % MINUTES_IN_HOUR === 0 ) {
      timeQty = minutes / MINUTES_IN_HOUR; 
      updateReturnObj(timeQty, 'hours'); 
      return returnObj; 
    }

    updateReturnObj(minutes, 'minutes'); 
    return returnObj; 

    function updateReturnObj(timeQty, timePeriod) {
      // updates return object with timeQty and timePeriod
      returnObj.timeQty = timeQty; 
      returnObj.timePeriod = timePeriod; 
    }

  }

  function isObjectLiteral(obj) {
    // returns true if obj is an object literal: {} 
    // returns false if anything else including arrays and functions

    return Object.prototype.toString.call(obj) === '[object Object]'; 
  }

  function getMinutes(timeObj) {
    // returns minutes given a timeObj that is fits defintion of 
    //   object returned from getMax function 
    // returns NaN if timeObj doesn't fit definition

    timeObj = timeObj ? timeObj : {}; 

    var minutesIn = {
      minutes: 1,
      hours: 60,
      days: 60 * 24,
      weeks: 60 * 24 * 7
    }; 

    return timeObj.timeQty * minutesIn[timeObj.timePeriod]; 
  }

// return minutesToMaxHumanTime; 

}).call(this);

