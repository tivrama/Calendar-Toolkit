// To populate schedule, enter the following in the terminal:
//   node
//   var layOutDay = require('./JoelSchoolnik.js').layOutDay
//   layOutDay(USER_INPUT_ARRAY_OF_EVENTS)


// Object which tracks schedule with events, and can append attributes to append to DOM.  
var scheduleState = {
  schedule: []
};

var setW = function() {
  var clock = 0;
  for (let i = 0; i < scheduleState.schedule.length; i++) {
    // create W param on each event
    scheduleState.schedule[i].W = 1;
    if (scheduleState.schedule[i - 1]) {
      if (scheduleState.schedule[i].start < scheduleState.schedule[i - 1].end) {
        scheduleState.schedule[i].W = 2;
        scheduleState.schedule[i - 1].W = 2;
      }
    }
  }
};

var populateDOM = function() {
  var runningPositionH = 0;
  // Loop through scheduleState.schedule and create and apply elements
  for (let i = 0; i < scheduleState.schedule.length; i++) {
    // Create event element
    var node = document.createElement("div");
    node.className = "event";
    var id = i;
    node.setAttribute("id", id);
    var sampleItem = document.createTextNode("Sample Item, start: " + scheduleState.schedule[i].start + ", end: " + scheduleState.schedule[i].end);
    node.appendChild(sampleItem);

    // Figure out dimentions and position
    var width = (600 / scheduleState.schedule[i].W) - 10;

    if (!runningPositionH) {
      runningPositionH = scheduleState.schedule[i].start - 30
      var top = scheduleState.schedule[i].start;
    } else {
      var top = scheduleState.schedule[i].start - runningPositionH;
    }
    var height = scheduleState.schedule[i].end - scheduleState.schedule[i].start - 22;
    runningPositionH += scheduleState.schedule[i].end - scheduleState.schedule[i].start;
    // Append to DOM
    document.getElementById("entry-board").appendChild(node);
    // Set dimentions and position on event
    document.getElementById(id).style.width = width+'px';
    document.getElementById(id).style.height = height+'px';
    document.getElementById(id).style.position = 'relative';
    // document.getElementById(id).style.left = left+'px';
    document.getElementById(id).style.top = top+'px';

  }

};




var layOutDay = function(schedule) {
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
  scheduleState.schedule = schedule.sort(function(a, b){return a.start - b.start});

  // call setW to add widths to events
  setW();

  // call populateDOM to append events
  populateDOM();

  return 'Page Loaded';

};




var testSchedule2 = [
  {start: 560, end: 620},
  {start: 610, end: 670},
  {start: 540, end: 600},
  {start: 30, end: 150}
];

layOutDay(testSchedule2);

module.exports = { layOutDay };