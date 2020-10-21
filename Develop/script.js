//Attaching current day to currentDay id
var previousData = JSON.parse(localStorage.getItem("dayPlan"));
$("#currentDay").text(moment().format("MMMM Do YYYY"));
var militaryValue = 12;
hourInput = $("<div>");
$(".container").append(hourInput);
timeArray = [9, 10, 11, 12, 1, 2, 3, 4, 5];
for (var i = 0; i < 9; i++) {
  var timeBlock = $("<section>").attr("class", "row time-block");
  $(hourInput).append(timeBlock);
  var timeSlot = $("<h3>").attr("class", "hour col-2");
  if (timeArray[i] === 9 || timeArray[i] === 10 || timeArray[i] === 11) {
    timeSlot.text(timeArray[i] + "am");
    timeSlot.attr("value", timeArray[i]);
  } else {
    timeSlot.text(timeArray[i] + "pm");
    timeSlot.attr("value", militaryValue);
    militaryValue++;
  }
  var eventArea = $("<textarea>").attr("class", "description col-9");
  var saveButton = $("<button>").attr({
    id: "button" + [i],
    class: "saveBtn col-1",
  });
  if (previousData !== null) {
    hourSavedData = timeSlot.attr("value");
    console.log(hourSavedData);
    console.log(previousData[hourSavedData]);
    eventArea.val(previousData[hourSavedData]);
  }
  if (
    $(timeSlot).attr("value") <
    Number(moment().format()[11] + moment().format()[12])
  ) {
    eventArea.attr("class", "col-9 past");
  } else if (
    $(timeSlot).attr("value") ==
    Number(moment().format()[11] + moment().format()[12])
  ) {
    eventArea.attr("class", "present col-9");
  } else {
    eventArea.attr("class", "future col-9");
  }
  $(timeBlock).append(timeSlot);
  $(timeBlock).append(eventArea);
  $(timeBlock).append(saveButton);
}

$(".time-block").on("click", ".saveBtn", function () {
  hourSaved = $(this).siblings(".hour").attr("value");
  console.log(hourSaved);
  console.log($(this).siblings("textarea").val());
  dayLog[hourSaved] = $(this).siblings("textarea").val();
  console.log(dayLog);
  var storeData = localStorage.setItem("dayPlan", JSON.stringify(dayLog));
});

if (previousData === null) {
  var dayLog = {
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
} else {
  var dayLog = previousData;
}

console.log(dayLog);

// console.log(Number(moment().format()[11] + moment().format()[12]));
