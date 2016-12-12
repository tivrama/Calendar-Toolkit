// To populate schedule, paste the following in the console:
// layOutDay(USER_INPUT_ARRAY_OF_EVENTS)

// test example:
var USER_INPUT_ARRAY_OF_EVENTS = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];







// Object which tracks schedule with events.  
var scheduleState = {
  schedule: []
};

// --- Parent function ----------------------------------------

var layOutDay = function(userInput) {
  // Make sure input is an array and has at least item in it, and has a sart and end param.  
  if (!Array.isArray(userInput) || !userInput.length) {
    console.error('incorrect input - not an array or has no events: ', userInput);
    return 'error';
  }
  if (!userInput[0].start || !userInput[0].end) {
    console.error('incorrect input - events hav no start or end: ', userInput);
    return 'error';
  }
  // add new events and sort
  // -------------------------------------
  scheduleState.schedule = []; // Comment this line out if we want to add events to an already existant schedule.  You can use clearSchedule() to reset.  
  // -------------------------------------
  scheduleState.schedule = scheduleState.schedule.concat(userInput)
  scheduleState.schedule = scheduleState.schedule.sort(function(a, b){return a.start - b.start});
  
  // call setW to add widths to events
  setW();
console.log('state: ', scheduleState.schedule);
  // call populateDOM to append events
  populateDOM();

  return scheduleState;
};


var setW = function() {
  var schLength = scheduleState.schedule.length;
  for (let i = 0; i < schLength; i++) {
    // create or reset W param on each event
    // TODO: Refactor to a recursive function. 
    scheduleState.schedule[i].W = 1;
    scheduleState.schedule[i].P = 1; // P is for the horizontal position of the card
    if (scheduleState.schedule[i - 1]) {
      if (scheduleState.schedule[i].start < scheduleState.schedule[i - 1].end) {
        scheduleState.schedule[i].W = 2;
        scheduleState.schedule[i - 1].W = 2;
        scheduleState.schedule[i].P = 1;
        scheduleState.schedule[i - 1].P = 0;
      }
      if (scheduleState.schedule[i - 2]) {
        if (scheduleState.schedule[i].start < scheduleState.schedule[i - 2].end) {
          scheduleState.schedule[i].W = 3;
          scheduleState.schedule[i - 1].W = 3;
          scheduleState.schedule[i - 2].W = 3;
          scheduleState.schedule[i].P = 2;
          scheduleState.schedule[i - 1].P = 1;
          scheduleState.schedule[i - 2].P = 0;
        }
        if (scheduleState.schedule[i - 3]) {
          if (scheduleState.schedule[i].start < scheduleState.schedule[i - 3].end) {
            scheduleState.schedule[i].W = 4;
            scheduleState.schedule[i - 1].W = 4;
            scheduleState.schedule[i - 2].W = 4;
            scheduleState.schedule[i - 3].W = 4;
            scheduleState.schedule[i].P = 3;
            scheduleState.schedule[i - 1].P = 2;
            scheduleState.schedule[i - 2].P = 1;
            scheduleState.schedule[i - 3].P = 0;
          }
          if (scheduleState.schedule[i - 4]) {
            if (scheduleState.schedule[i].start < scheduleState.schedule[i - 4].end) {
              scheduleState.schedule[i].W = 5;
              scheduleState.schedule[i - 1].W = 5;
              scheduleState.schedule[i - 2].W = 5;
              scheduleState.schedule[i - 3].W = 5;
              scheduleState.schedule[i - 4].W = 5;
              scheduleState.schedule[i].P = 4;
              scheduleState.schedule[i - 1].P = 3;
              scheduleState.schedule[i - 2].P = 2;
              scheduleState.schedule[i - 3].P = 1;
              scheduleState.schedule[i - 4].P = 0;
            }
            if (scheduleState.schedule[i - 5]) {
              if (scheduleState.schedule[i].start < scheduleState.schedule[i - 5].end) {
                scheduleState.schedule[i].W = 6;
                scheduleState.schedule[i - 1].W = 6;
                scheduleState.schedule[i - 2].W = 6;
                scheduleState.schedule[i - 3].W = 6;
                scheduleState.schedule[i - 4].W = 6;
                scheduleState.schedule[i - 5].W = 6;
                scheduleState.schedule[i].P = 5;
                scheduleState.schedule[i - 1].P = 4;
                scheduleState.schedule[i - 2].P = 3;
                scheduleState.schedule[i - 3].P = 2;
                scheduleState.schedule[i - 4].P = 1;
                scheduleState.schedule[i - 5].P = 0;
              }
            }
          }
        }
      }
    }
  }
};


var removeElementsByClass = function(className){
  var elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  }
};


var populateDOM = function() {
  // Remove all event cards from the board
  removeElementsByClass("event");

  var runningPositionV = 0;
  var runningPositionH = 1;
  // Loop through scheduleState.schedule and create and apply elements
  for (let i = 0; i < scheduleState.schedule.length; i++) {

    // Create event element
    var node = document.createElement("div");
    node.className = "event";
    var id = i;
    node.setAttribute("id", id);
    var sampleItem = document.createTextNode("Sample Item"); // or event name saved to event object
    node.appendChild(sampleItem);

    // Add Location to event card
    var location = document.createElement("div");
    location.className = "location";
    var idL = i +'L';
    location.setAttribute("id", id);
    var sampleLocation = document.createTextNode("Sample Location"); // or location saved to event object
    location.appendChild(sampleLocation);

    // Set dimentions and vertical coordinates
    var width = ((600 / scheduleState.schedule[i].W) - 25);
    var height = scheduleState.schedule[i].end - scheduleState.schedule[i].start - 20;
    if (!runningPositionV) {
      var top = scheduleState.schedule[i].start;
    } else {
      var top = scheduleState.schedule[i].start - runningPositionV;
    }
    runningPositionV += scheduleState.schedule[i].end - scheduleState.schedule[i].start;

    // Set horizontal coordinates
    var left = 0;
    // Set position based on W and previous divs
    if (scheduleState.schedule[i].W > 1) {
      if (scheduleState.schedule[i].P) {
        left = (scheduleState.schedule[i].P * width) + 25
      }
    }

    //..works for example with W=2..
    /*
    if (scheduleState.schedule[i - 1]) {
      if (scheduleState.schedule[i].W > 1 && scheduleState.schedule[i - 1].W > 1) {
        if (scheduleState.schedule[i].start < scheduleState.schedule[i-1].end) {
          left = width + 25;
        }
        if (runningPositionH > 1) {
          left = 0
        }
        runningPositionH += 1;
      }
    }
    */

    // Append to DOM
    document.getElementById("entry-board").appendChild(node);
    if (height > 25) { // Dont show location if card is too short
      document.getElementById(id).appendChild(location);
    }
    // Apply dimentions and position on event
    document.getElementById(id).style.width = width+'px';
    document.getElementById(id).style.height = height+'px';
    document.getElementById(id).style.position = 'relative';
    document.getElementById(id).style.left = left+'px';
    document.getElementById(id).style.top = top+'px';
  }
};

// To clear schedule if using opting to keep adding events (see line 32)
var clearSchedule = function() {
  removeElementsByClass("event");
  return scheduleState.schedule = [];
};




layOutDay(USER_INPUT_ARRAY_OF_EVENTS);


// -- for tests ----------------
// module.exports = { layOutDay };