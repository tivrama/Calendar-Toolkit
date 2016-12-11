var functions = require('./JoelSchoolnik.js').functions;
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
      assert.equal(typeof functions.layOutDay, 'function');
    });

    it('should return "error" if it is not an array', function() {
      assert.equal(functions.layOutDay(1), 'error');
    });    

    it('should return error if events had incorect format', function() {
      assert.equal(functions.layOutDay([{hello: 'world'}]), 'error');
    });

    it('should sort the input by start param', function() {
      functions.layOutDay(testSchedule2)
      assert.deepEqual(functions.scheduleState.schedule, testSchedule1);
    });

  });

});
