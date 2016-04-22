# minutes-to-max-human-time
[![Build Status via Travis CI](https://travis-ci.org/tonybranfort/minutes-to-max-human-time.svg?branch=master)](https://travis-ci.org/tonybranfort/req-uscis-status)
[![Coverage Status](https://coveralls.io/repos/tonybranfort/minutes-to-max-human-time/badge.svg?branch=master&service=github)](https://coveralls.io/github/)

Takes minutes and returns the maximum whole human readable equivalent in minutes, hours, days or weeks.  Mimics Google Calendar online appointments for setting reminders (notifications).  

For example: 
* 50 minutes returns 50 minutes
* 60 minutes returns 1 hour
* 70 minutes returns 70 minutes
* 1440 minutes returns 1 day
* 1441 minutes returns 1441 minutes
* 100800 minutes returns 1 week  

###Example: 

```
var m2MaxHT = require('minutes-to-max-human-time');

m2MaxHT.getMax(0);    // { timeQty: 0, timePeriod: 'minutes' }

m2MaxHT.getMax(59);   // { timeQty: 59, timePeriod: 'minutes' }

m2MaxHT.getMax(60);   // { timeQty: 1, timePeriod: 'hours' }

m2MaxHT.getMax(61);   // { timeQty: 61, timePeriod: 'minutes' }

m2MaxHT.getMax(60*23);  // { timeQty: 23, timePeriod: 'hours' }

m2MaxHT.getMax(60*24);  // { timeQty: 1, timePeriod: 'days' }

m2MaxHT.getMax(60*25);  // { timeQty: 25, timePeriod: 'hours' }

m2MaxHT.getMax(60*24*6); // { timeQty: 6, timePeriod: 'days' }

m2MaxHT.getMax(60*24*7+1);
// { timeQty: 10081, timePeriod: 'minutes' }

m2MaxHT.getMax(60*24*7);  // { timeQty: 1, timePeriod: 'weeks' }

m2MaxHT.getMax(60*24*8);  // { timeQty: 8, timePeriod: 'days' }
```

This has 2 functions: `getMax` and `getMinutes`. 

###getMax(minutes, objectToUpdate, maxMinutes)
Returns an object with these 2 parameters: 
*  timeQty: integer,
*  timePeriod: string of 'minutes', 'hours', 'days',  or 'weeks'

'weeks' is the maximum whole human readable equivalent given minutes.  

####`minutes`
* integer, required

####`objectToUpdate`
* object literal, optional.  
* If passed in `objectToUpdate` will be updated with timeQty and timePeriod parameters.  If not included, a new object is returned. 

example: 
```
var m2MaxHT = require('minutes-to-max-human-time');
var myObj = {method: 'email', minutes:60};
m2MaxHT.getMax(myObj.minutes, myObj);
console.log(myObj);
// { method: 'email', minutes: 60, timeQty: 1, timePeriod: 'hours' }

```

####`maxMinutes`
* integer, optional, default = 40320 (4 weeks);  
* If passed in will reset `minutes` parameter to `maxMinutes` if `minutes` is > `maxMinutes`

example: 
```
m2MaxHT.getMax(85, {}, 80);
// { timeQty: 80, timePeriod: 'minutes' }  // minutes was set to 80 from 85

```

###getMinutes(object)
Returns the number of minutes given an object with parameters `timeQty` and `timePeriod`. 
####`object`
* object literal, required. 
* must be an object with parameters `timeQty` and `timePeriod` where timeQty is an integer and timePeriod is a string of 'minutes','hours','days' or 'weeks'. 

example: 
```
var m2MaxHT = require('minutes-to-max-human-time');

var myObj = {timeQty: 1, timePeriod: 'hours' };
var minutes = m2MaxHT.getMinutes(myObj);
console.log(minutes);
// 60

```


