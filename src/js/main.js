'use strict';

// -----------------------Elements-----------------------
// Text
const headerWelcome = document.querySelector('#welcome-header');
// Divs
const containerScheduler = document.querySelector('.scheduler-container');
let containerSchedulerRows = null;
// Buttons
const btnScheduleLeft = document.querySelector('.scheduler-btn_left');
const btnScheduleRight = document.querySelector('.scheduler-btn_right');

// -----------------------Dummy Data-----------------------
const month1 = [];
for (let i = 0; i < 31; i++) {
  month1.push({
    dayNum: i + 1,
  });
}
const month2 = [];
for (let i = 0; i < 30; i++) {
  month2.push({
    dayNum: i + 1,
  });
}
const month3 = [];
for (let i = 0; i < 29; i++) {
  month3.push({
    dayNum: i + 1,
  });
}
let currMonth = month2;
let currScheduleIndex = 1;
const scheduleArray = [month1, month2, month3];

// -----------------------Behavior-----------------------
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

const modifyBtn = function (btn, direction) {
  const btnClassEnable = `scheduler-btn_${direction}_enable`;
  const btnClassDisable = `scheduler-btn_${direction}_disable`;

  // Button should be enabled or disabled based on if there are more schedules
  const toDisable =
    direction === 'left'
      ? currScheduleIndex === 0
      : currScheduleIndex === scheduleArray.length - 1;
  const btnClassList = btn.classList;
  if (toDisable) {
    btnClassList.remove(btnClassEnable);
    btnClassList.add(btnClassDisable);
  } else {
    btnClassList.remove(btnClassDisable);
    btnClassList.add(btnClassEnable);
  }
};

// Left arrow btn event listener
btnScheduleLeft.addEventListener('click', function (e) {
  e.preventDefault();

  console.log('here1');

  if (currScheduleIndex > 0) {
    currScheduleIndex--;
  }
  modifyBtn(btnScheduleLeft, 'left');
  modifyBtn(btnScheduleRight, 'right');
  displaySchedule(scheduleArray[currScheduleIndex]);
});

// Right arrow btn event listener
btnScheduleRight.addEventListener('click', function (e) {
  e.preventDefault();

  console.log('here2');

  // Increase current schedule index
  if (currScheduleIndex < scheduleArray.length - 1) {
    currScheduleIndex++;
  }
  modifyBtn(btnScheduleLeft, 'left');
  modifyBtn(btnScheduleRight, 'right');
  displaySchedule(scheduleArray[currScheduleIndex]);
});

const firstRender = function () {
  console.log('First render');

  modifyBtn(btnScheduleLeft, 'left');
  modifyBtn(btnScheduleRight, 'right');
  displaySchedule(month2);
};
firstRender();
