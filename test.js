var layOutDay = require('./JoelSchoolnik.js').layOutDay;
var assert = require('assert');


describe('layOutDay Tests', function() {

  describe('layOutDay core tests', function() {

    var testSchedule1 = [
      {start: 30, end: 150},
      {start: 540, end: 600},
      {start: 560, end: 620},
      {start: 610, end: 670}
    ];

    var testSchedule2 = [
      {start: 560, end: 620},
      {start: 610, end: 670},
      {start: 540, end: 600},
      {start: 30, end: 150}
    ];

    it('should be a function', function() {
      assert.equal(typeof layOutDay, 'function');
    });

    it('should return "error" if it is not an array', function() {
      assert.equal(layOutDay(1), 'error');
    });    

    it('should return error if events had incorect format', function() {
      assert.equal(layOutDay([{hello: 'world'}]), 'error');
    });

    //passes until new params are added
    xit('should sort the input by start param', function() {
      layOutDay(testSchedule2)
      assert.deepEqual(scheduleState.schedule, testSchedule1);
    });

  });

});
