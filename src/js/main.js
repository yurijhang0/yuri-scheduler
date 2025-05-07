'use strict';

// -----------------------Elements-----------------------
// Text
const headerWelcome = document.querySelector('#welcome-header');
// Divs
const containerScheduler = document.querySelector('.scheduler-container');
let containerSchedulerRows = null;
// Buttons
const btnScheduleLeft = document.querySelector('.scheduler-btn_left');
const btnScheduleRight = document.querySelector('.scheduler-btn_left');

// -----------------------Behavior-----------------------
// TEMP DATA
// const user
const days = [];
for (let i = 0; i < 31; i++) {
  days.push({
    dayNum: i + 1,
  });
}
const day2 = [];
for (let i = 0; i < 30; i++) {
  day2.push({
    dayNum: i + 1,
  });
}
let currDays = day2;
let currDayIndex = 1;
const scheduleArray = [days, day2];

const displaySchedule = function (days) {
  // Clear schedule before populating
  containerScheduler.innerHTML = '';

  // Populating weeks or rows
  let numWeeks = Math.trunc(days.length / 7);
  if (days.length % 7 > 0) {
    numWeeks += 1;
  }
  const containerRowHTML = `
    <div class="scheduler-row-container">
    </div>
    `;
  containerScheduler.insertAdjacentHTML(
    'beforeend',
    containerRowHTML.repeat(numWeeks)
  );
  containerSchedulerRows = document.querySelectorAll(
    '.scheduler-row-container'
  );

  // Populating the days for each row
  const lastRowDays = days.length % 7;
  const containerDayHTML = `
    <div class="scheduler-day-container">
    </div>
    `;
  containerSchedulerRows.forEach((row, i) => {
    const numDays = i === numWeeks - 1 ? lastRowDays : 7;
    const containerDaysHTML = containerDayHTML.repeat(numDays);
    row.insertAdjacentHTML('beforeend', containerDaysHTML);
  });
};
displaySchedule(day2);

btnScheduleLeft.addEventListener('click', function (e) {
  e.preventDefault();

  console.log('here');

  if (currDayIndex > 0) {
    currDayIndex -= 1;
  }
  displaySchedule(scheduleArray[currDayIndex]);
});
