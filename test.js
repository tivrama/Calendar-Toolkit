var assert = require('assert');

var codingChallenge = require('./JoelSchoolnik.js');
var layOutDay = codingChallenge.layOutDay;
var scheduleState = codingChallenge.scheduleState;
var setW = codingChallenge.setW;

describe('layOutDay Tests', function() {

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

  describe('layOutDay core tests', function() {

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
    it('should sort the input by start param', function() {
      layOutDay(testSchedule2)
      for (var i = 0 ; i < testSchedule2.length; i++) {
        assert.equal(scheduleState.schedule[i].start, testSchedule1[i].start);
      }
    });

  });

  describe('setW tests', function() {

    it('should be a function', function() {
      assert.equal(typeof setW, 'function');
    });

    it('should apply a "W" param to each event', function() {
      layOutDay(testSchedule1)
      for (var i = 0 ; i < testSchedule1.length; i++) {
        assert.equal(typeof scheduleState.schedule[i].W, 'number');
      }
    });

    it('should make "W" equal to the number of collisions', function() {
      layOutDay(testSchedule1)
      assert.equal(scheduleState.schedule[0].W, 1);
      assert.equal(scheduleState.schedule[1].W, 2);
      assert.equal(scheduleState.schedule[2].W, 2);
      assert.equal(scheduleState.schedule[3].W, 2);
    });

  });

});
