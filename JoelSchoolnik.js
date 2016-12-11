var functions = {

  // Object which tracks schedule with events, and can append attributes to append to DOM.  
  scheduleState: {},

  setW: function() {
    var clock = 0;
    for (var i = 0; i < this.scheduleState.schedule.length; i++) {
      // create W param on each event
      this.scheduleState.schedule[i].W = 1;
      if (this.scheduleState.schedule[i - 1]) {
        if (this.scheduleState.schedule[i].start < this.scheduleState.schedule[i - 1].end) {
          this.scheduleState.schedule[i].W = 2;
          this.scheduleState.schedule[i - 1].W = 2;
        }
      }
    }
  },


  layOutDay: function(schedule) {
    // Make sure input is an array and has at least item in it.  
    if (!Array.isArray(schedule) || !schedule.length) {
      console.error('incorrect input - not an array or has no events: ', schedule);
      return 'error';
    }
    if (!schedule[0].start || !schedule[0].end) {
      console.error('incorrect input - events hav no start or end: ', schedule);
      return 'error';
    }

    // sort the input
    this.scheduleState.schedule = schedule.sort(function(a, b){return a.start - b.start});

    // call this.setW to add widths to events
    this.setW();

    

  },


};


var testSchedule2 = [
  {start: 560, end: 620},
  {start: 610, end: 670},
  {start: 540, end: 600},
  {start: 30, end: 150}
];

functions.layOutDay(testSchedule2);
console.log('state: ', functions.scheduleState);

module.exports = { functions };