const clockElem = document.getElementById('clock');
const batteryElem = document.getElementById('battery');
const addAlarmbutton = document.getElementById('addAlarm');
const alarmListElem = document.getElementById('alarmList');

let batteryPercentage = 100;
let alarms = [];

function updateClock() {
    if (batteryPercentage <= 0){
        clockElem.innerHTML = "";
        clockElem.style.backgroundColor = "black";
        return;
    }

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = '${hours}:${minutes}:${seconds}';

    checkAlarms(currentTime);
    clockElem.innerHTML = currentTime;
}

function updateBattery() {
    if (batteryPercentage > 0) {
        batteryPercentage -= 1;
        batteryElem.innerHTML = 'Battery: ${batteryPercentage}%'
    }
}

function addAlarm() {
    const hour = document.getElementById('hour').value.padStart(2,'0');
    const minute = document.getElementById('minute').value.padStart(2,'0');
    const second = document.getElementById('second').value.padStart(2,'0');
    const alarm = '${hour}:${minute}:${second}';

    if (alarms.length < 3){
        alarms.push(alarm);
        updateAlarmList();
    } else {
        alert('You can only set up to 3 alarms. ');
    }
}

function updateAlarmList() {
    alarmListElem.innerHTML = 'Alarms: ' + alarms.join(', ');
}

function checkAlarms(currentTime) {
    alarms.forEach((alarm, index) => {
        if (currentTime == alarm) {
            alert('ALRAM: ' + alarm);
            alarms.splice(index, 1);
            updateAlarmList();
        }
    });
}

addAlarmbutton.addEventListener('click', addAlarm);

setInterval(() => {
    updateClock();
    updateBattery();
}, 1000);