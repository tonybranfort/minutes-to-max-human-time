var gcrmt = require('../lib/index.js');
var expect = require('expect.js'); 

describe('Google calendar reminder max time ',function(){
  describe('getMax', function() {
    it('should return minutes when no match to hours, days, weeks',function(){
      expect(gcrmt.getMax(0).timeQty).to.be(0); 
      expect(gcrmt.getMax(0).timePeriod).to.be('minutes'); 
      expect(gcrmt.getMax(1).timeQty).to.be(1); 
      expect(gcrmt.getMax(1).timePeriod).to.be('minutes'); 
      expect(gcrmt.getMax(59).timeQty).to.be(59); 
      expect(gcrmt.getMax(59).timePeriod).to.be('minutes'); 

      expect(gcrmt.getMax(60).timePeriod).to.not.be('minutes'); 

      expect(gcrmt.getMax(61).timeQty).to.be(61); 
      expect(gcrmt.getMax(61).timePeriod).to.be('minutes'); 

      expect(gcrmt.getMax(61).timeQty).to.be(61); 
      expect(gcrmt.getMax(61).timePeriod).to.be('minutes'); 

      // test +/ 2 hours
      expect(gcrmt.getMax(60*2-1).timeQty).to.be(60*2-1); 
      expect(gcrmt.getMax(60*2-1).timePeriod).to.be('minutes'); 

      expect(gcrmt.getMax(60*2).timePeriod).to.not.be('minutes'); 

      expect(gcrmt.getMax(60*2+1).timeQty).to.be(60*2+1); 
      expect(gcrmt.getMax(60*2+1).timePeriod).to.be('minutes'); 

      // test +/ 1 day
      expect(gcrmt.getMax(60*24-1).timeQty).to.be(60*24-1); 
      expect(gcrmt.getMax(60*24-1).timePeriod).to.be('minutes'); 

      expect(gcrmt.getMax(60*24).timePeriod).to.not.be('minutes'); 

      expect(gcrmt.getMax(60*24+1).timeQty).to.be(60*24+1); 
      expect(gcrmt.getMax(60*24+1).timePeriod).to.be('minutes'); 

      // test +/ 1 week
      expect(gcrmt.getMax(60*24*7-1).timeQty).to.be(60*24*7-1); 
      expect(gcrmt.getMax(60*24*7-1).timePeriod).to.be('minutes'); 

      expect(gcrmt.getMax(60*24*7).timePeriod).to.not.be('minutes'); 

      expect(gcrmt.getMax(60*24*7+1).timeQty).to.be(60*24*7+1); 
      expect(gcrmt.getMax(60*24*7+1).timePeriod).to.be('minutes'); 

    }); 

    it('should return hours when no match to days, weeks',function(){
      expect(gcrmt.getMax(60).timeQty).to.be(1); 
      expect(gcrmt.getMax(60).timePeriod).to.be('hours'); 
      expect(gcrmt.getMax(60*2).timeQty).to.be(2); 
      expect(gcrmt.getMax(60*2).timePeriod).to.be('hours'); 

      // test +/- 1 day
      expect(gcrmt.getMax(60*23).timeQty).to.be(23); 
      expect(gcrmt.getMax(60*23).timePeriod).to.be('hours'); 

      expect(gcrmt.getMax(60*24).timePeriod).to.not.be('hours'); 

      expect(gcrmt.getMax(60*25).timeQty).to.be(25); 
      expect(gcrmt.getMax(60*25).timePeriod).to.be('hours'); 

      // test +/- 2 days
      expect(gcrmt.getMax(60*47).timeQty).to.be(47); 
      expect(gcrmt.getMax(60*47).timePeriod).to.be('hours'); 

      expect(gcrmt.getMax(60*24*2).timePeriod).to.not.be('hours'); 

      expect(gcrmt.getMax(60*49).timeQty).to.be(49); 
      expect(gcrmt.getMax(60*49).timePeriod).to.be('hours'); 

      // test +/- 1 week
      expect(gcrmt.getMax(60*(24*7-1)).timeQty).to.be(24*7-1); 
      expect(gcrmt.getMax(60*(24*7-1)).timePeriod).to.be('hours'); 

      expect(gcrmt.getMax(60*24*7).timePeriod).to.not.be('hours'); 

      expect(gcrmt.getMax(60*(24*7+1)).timeQty).to.be(24*7+1); 
      expect(gcrmt.getMax(60*(24*7+1)).timePeriod).to.be('hours'); 

      // test +/- 4 weeks
      expect(gcrmt.getMax(60*(24*28-1)).timeQty).to.be(24*28-1); 
      expect(gcrmt.getMax(60*(24*28-1)).timePeriod).to.be('hours'); 

      expect(gcrmt.getMax(60*24*28).timePeriod).to.not.be('hours'); 


    }); 

    it('should return days when no match to weeks',function(){
      expect(gcrmt.getMax(60*24).timeQty).to.be(1); 
      expect(gcrmt.getMax(60*24).timePeriod).to.be('days'); 

      expect(gcrmt.getMax(60*24*2).timeQty).to.be(2); 
      expect(gcrmt.getMax(60*24*2).timePeriod).to.be('days'); 

      expect(gcrmt.getMax(60*24*6).timeQty).to.be(6); 
      expect(gcrmt.getMax(60*24*6).timePeriod).to.be('days'); 

      expect(gcrmt.getMax(60*24*7).timePeriod).to.not.be('days'); 

      expect(gcrmt.getMax(60*24*8).timeQty).to.be(8); 
      expect(gcrmt.getMax(60*24*8).timePeriod).to.be('days'); 

      // test +/- 4 weeks
      expect(gcrmt.getMax(60*24*(7*4-1)).timeQty).to.be(7*4-1); 
      expect(gcrmt.getMax(60*24*(7*4-1)).timePeriod).to.be('days'); 

      expect(gcrmt.getMax(60*24*(7*4)).timePeriod).to.not.be('days'); 


    }); 

    it('should return weeks when exact minutes match to weeks',function(){

      expect(gcrmt.getMax(60*24*7*1).timeQty).to.be(1); 
      expect(gcrmt.getMax(60*24*7*1).timePeriod).to.be('weeks'); 

      expect(gcrmt.getMax(60*24*7*2).timeQty).to.be(2); 
      expect(gcrmt.getMax(60*24*7*2).timePeriod).to.be('weeks'); 

      expect(gcrmt.getMax(60*24*7*3).timeQty).to.be(3); 
      expect(gcrmt.getMax(60*24*7*3).timePeriod).to.be('weeks'); 

      expect(gcrmt.getMax(60*24*7*4).timeQty).to.be(4); 
      expect(gcrmt.getMax(60*24*7*4).timePeriod).to.be('weeks'); 

    }); 

    it('should update object if it is passed into getMax', function() {
      var obj = {'blah': 40}; 
      var to = gcrmt.getMax(3, obj);
      expect(obj.timeQty).to.be(3);  
      expect(obj.timePeriod).to.be('minutes');  
      expect(obj.blah).to.be(40); 
    }); 

    it('should allow 40320 minutes max by default', function() {
      expect(gcrmt.getMax(40321).timeQty).to.be(4);  
      expect(gcrmt.getMax(40321).timePeriod).to.be('weeks');  
    }); 

    it('should allow adjust max minutes with parameter', function() {
      expect(gcrmt.getMax(40321,{},40321).timeQty).to.be(40321);  
      expect(gcrmt.getMax(40321,{},40321).timePeriod).to.be('minutes');  

      expect(gcrmt.getMax(40319,{},40321).timeQty).to.be(40319);  
      expect(gcrmt.getMax(40319,{},40321).timePeriod).to.be('minutes');  

      expect(gcrmt.getMax(40321,{},59).timeQty).to.be(59);  
      expect(gcrmt.getMax(40321,{},59).timePeriod).to.be('minutes');  

      expect(gcrmt.getMax(40321,{},60).timeQty).to.be(1);  
      expect(gcrmt.getMax(40321,{},60).timePeriod).to.be('hours');  
    }); 

  });

  describe('getMinutes', function() {
    it('should return correct minutes for passing in minutes', function() {
      expect(gcrmt.getMinutes({timeQty: 59, timePeriod: 'minutes'})).to.be(59); 
      expect(gcrmt.getMinutes({timeQty: 60, timePeriod: 'minutes'})).to.be(60); 
      expect(gcrmt.getMinutes({timeQty: 61, timePeriod: 'minutes'})).to.be(61); 
      expect(gcrmt.getMinutes({timeQty: 1441, timePeriod: 'minutes'})).to.be(1441); 
    }); 
    it('should return correct mintues for passing in hours', function() {
      expect(gcrmt.getMinutes({timeQty: 1, timePeriod: 'hours'})).to.be(60); 
      expect(gcrmt.getMinutes({timeQty: 5, timePeriod: 'hours'})).to.be(60*5); 
      expect(gcrmt.getMinutes({timeQty: 24, timePeriod: 'hours'})).to.be(60*24); 
    }); 

    it('should return correct mintues for passing in days', function() {
      expect(gcrmt.getMinutes({timeQty: 1, timePeriod: 'days'})).to.be(60*24*1); 
      expect(gcrmt.getMinutes({timeQty: 5, timePeriod: 'days'})).to.be(60*24*5); 
      expect(gcrmt.getMinutes({timeQty: 7, timePeriod: 'days'})).to.be(60*24*7); 
    }); 

    it('should return correct mintues for passing in weeks', function() {
      expect(gcrmt.getMinutes()).not.to.be.NaN; 
      expect(gcrmt.getMinutes({timeQty: 1, timePeriod: 'weeks'})).to.be(60*24*7*1); 
      expect(gcrmt.getMinutes({timeQty: 2, timePeriod: 'weeks'})).to.be(60*24*7*2); 
      expect(gcrmt.getMinutes({timeQty: 4, timePeriod: 'weeks'})).to.be(60*24*7*4); 
    }); 

    it('should return NaN if invalid time object passed in', function() {
      // expect library uses === for to.be and to.equal assertion so 
      //   expect(NaN) won't work directly so using goofy convert to string
      expect(gcrmt.getMinutes() + '').to.be('NaN'); 
      expect(gcrmt.getMinutes({}) + '').to.be('NaN');
      expect(gcrmt.getMinutes({timeQty: 30}) + '').to.be('NaN');
      expect(gcrmt.getMinutes({timeQty: 30, timePeriod: 'hours'}) + '').not.to.be('NaN');
      expect(gcrmt.getMinutes({timeQty: 30, timePeriod: 'monkey'}) + '').to.be('NaN');
      expect(gcrmt.getMinutes({timeQty: 30, timePeriod: 'day'}) + '').to.be('NaN');
    }); 

  });  // end of getMinutes()
});


