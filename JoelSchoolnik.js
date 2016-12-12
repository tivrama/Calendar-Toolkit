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
  // call populateDOM to append events
  populateDOM();

  return scheduleState.schedule;
};


// Set width of each card
var setW = function() {
  var schLength = scheduleState.schedule.length;
  var count = 1;
  var count2 = 1;
  for (var i = 0; i < schLength; i++) {
    // create or reset W param on each event
    scheduleState.schedule[i].W = 1;
    // Check if current ecent collides with previous events
    while (scheduleState.schedule[i - count]) {
      if (scheduleState.schedule[i].start < scheduleState.schedule[i - count].end) {
        scheduleState.schedule[i].W = count + 1;
        scheduleState.schedule[i - count].W = count + 1;
        // Change W on all events with a collision
        while (scheduleState.schedule[i - count2]) {
          if (scheduleState.schedule[i].start < scheduleState.schedule[i - count2].end) {
            scheduleState.schedule[i - count2].W = count + 1;
          }
          count2 ++;
        }
        count2 = 1;
      }
      count ++;
    }
    count = 1;
  }
};


// Clear all event elements
var removeElementsByClass = function(className){
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};


// Set size and positions of events and append to the DOM
var populateDOM = function() {
  // Remove all event cards from the board
  removeElementsByClass("event");

  var runningPositionV = 0;
  var runningPositionH = 1;
  // Loop through scheduleState.schedule and create and apply elements
  for (var i = 0; i < scheduleState.schedule.length; i++) {

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
    if (scheduleState.schedule[i].W > 1 && scheduleState.schedule[i - 1]) { //if there a prev div and width > 1
      if (runningPositionH) {
        if (scheduleState.schedule[i].start < scheduleState.schedule[i-1].end) {
          left = (width * runningPositionH) + (25 * runningPositionH);
        }
        if (scheduleState.schedule[i - runningPositionH] && scheduleState.schedule[i].start > scheduleState.schedule[i-runningPositionH].end) {
          left = 0
          runningPositionH = 0
        }
      }
      runningPositionH += 1;
    } else {
      runningPositionH = 0;
    }

    // Append to DOM
    document.getElementById("entry-board").appendChild(node);
    document.getElementById(id).appendChild(location);
    // Apply dimentions and position on event
    document.getElementById(id).style.width = width+'px';
    document.getElementById(id).style.height = height+'px';
    document.getElementById(id).style.position = 'relative';
    document.getElementById(id).style.left = left+'px';
    document.getElementById(id).style.top = top+'px';
  }
};

// To clear schedule.  Useful if using option to keep adding events (see line 32)
var clearSchedule = function() {
  removeElementsByClass("event");
  return scheduleState.schedule = [];
};





layOutDay(USER_INPUT_ARRAY_OF_EVENTS);


// -- for tests ----------------
// module.exports = { layOutDay, scheduleState, setW };