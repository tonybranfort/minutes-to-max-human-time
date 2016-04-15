# google-calendar-reminder-max-time

To mimic the online reminder (notifications) widget in google calender, this is a function that takes minutes and determines whether that converts best to minutes, hours, days or weeks such that there is no remainder.  For example: 
* 50 minutes returns 50 minutes
* 60 minutes returns 1 hour
* 70 minutes returns 70 minutes
* 1440 minutes returns 1 day
* 1441 minutes returns 1441 minutes
* etc

The function takes minutes as an integer and returns an object with these 2 parameters: 
*  timeQty: int,
*  timePeriod: string of 'minutes', 'hours', 'days',  or 'weeks'


###Example: 

```
var gcrmt = require('google-calendar-reminder-max-time');

gcrmt.getMax(0);    // { timeQty: 0, timePeriod: 'minutes' }

gcrmt.getMax(59);   // { timeQty: 59, timePeriod: 'minutes' }

gcrmt.getMax(60);   // { timeQty: 1, timePeriod: 'hours' }

gcrmt.getMax(61);   // { timeQty: 61, timePeriod: 'minutes' }

gcrmt.getMax(60*23);  // { timeQty: 23, timePeriod: 'hours' }

gcrmt.getMax(60*24);  // { timeQty: 1, timePeriod: 'days' }

gcrmt.getMax(60*25);  // { timeQty: 25, timePeriod: 'hours' }

gcrmt.getMax(60*24*6); // { timeQty: 6, timePeriod: 'days' }

gcrmt.getMax(60*24*7+1);
// { timeQty: 10081, timePeriod: 'minutes' }

gcrmt.getMax(60*24*7);  // { timeQty: 1, timePeriod: 'weeks' }

gcrmt.getMax(60*24*8);  // { timeQty: 8, timePeriod: 'days' }
```

###getMax(minutes, objectToUpdate, maxMinutes)
####`minutes`
* integer, required

####`objectToUpdate`
* object literal, optional.  
* If passed in `objectToUpdate` will be updated with timeQty and timePeriod

example: 
```
var myObj = {method: 'email', minutes:60};
gcrmt.getMax(myObj.minutes, myObj);
console.log(myObj);
// { method: 'email', minutes: 60, timeQty: 1, timePeriod: 'hours' }

```

####`maxMinutes`
* integer, optional, default = 40320 (4 weeks);  
* If passed in will reset `minutes` parameter to `maxMinutes` if `minutes` is > `maxMinutes`

example: 
```
gcrmt.getMax(70, {}, 60);
// { timeQty: 1, timePeriod: 'hours' }

```




