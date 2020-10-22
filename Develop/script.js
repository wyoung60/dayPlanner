//Get local storage data
var previousData = JSON.parse(localStorage.getItem("dayPlan"));
//If local storage is empty, set empty object
if (previousData === null) {
  var previousData = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
  };
}
//Add current day
$("#currentDay").text(moment().format("MMMM Do YYYY"));
//Create global variable to set values to each row and check for current time
var militaryTime = 9;
//For loop to create all the elements
for (var i = 0; i < 9; i++) {
  //Variables for the different elements as well as attaching their respective classes
  var timeBlock = $("<section>").attr("class", "row time-block description");
  var eventArea = $("<textarea>").attr("class", "col-9");
  var saveButton = $("<button>").attr({
    id: "button" + [i],
    class: "saveBtn col-1",
    value: militaryTime,
  });
  var saveButtonIcon = $("<i>").attr("class", "fas fa-save");
  var timeSlot = $("<h5>").attr("class", "hour col-2");
  //If statements to add appropriate text to each time slot
  if (militaryTime < 12) {
    timeSlot.text(militaryTime + " am");
  } else if (militaryTime === 12) {
    timeSlot.text(militaryTime + " pm");
  } else {
    timeSlot.text(militaryTime - 12 + " pm");
  }
  //Adds local storage text back to specific time slot
  eventArea.val(previousData[militaryTime]);
  //If statement to check if time slot is past, present, or future and attaches correct class
  if (
    $(saveButton).attr("value") <
    Number(moment().format()[11] + moment().format()[12])
  ) {
    eventArea.attr("class", "col-9 past");
  } else if (
    $(saveButton).attr("value") ==
    Number(moment().format()[11] + moment().format()[12])
  ) {
    eventArea.attr("class", "present col-9");
  } else {
    eventArea.attr("class", "future col-9");
  }
  //Appends the element to proper location
  $(".container").append(timeBlock);
  $(timeBlock).append(timeSlot, eventArea, saveButton);
  $(saveButton).append(saveButtonIcon);
  //Increments the time value variable
  militaryTime++;
}
//Click event for save buttons
$(".time-block").on("click", ".saveBtn", function () {
  //Saves value from click button
  hourSaved = $(this).attr("value");
  //Adds text from textarea to clicked location in object
  previousData[hourSaved] = $(this).siblings("textarea").val();
  //Adds object to local storage
  localStorage.setItem("dayPlan", JSON.stringify(previousData));
});
