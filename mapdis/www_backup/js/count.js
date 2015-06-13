Function.prototype.Timer = function (interval, calls, onend) {
    var count = 0;
    var payloadFunction = this;
    var startTime = new Date();
    var callbackFunction = function () {
        return payloadFunction(startTime, count);
    };
    var endFunction = function () {
        if (onend) {
            onend(startTime, count, calls);
        }
    };
    var timerFunction =  function () {
        count++;
        if (count < calls && callbackFunction() != false) {
            window.setTimeout(timerFunction, interval);
        } else {
            endFunction();
        }
    };
    timerFunction();
};

function leadingzero (number) {
    return (number < 10) ? '0' + number : number;
}
function countdown (seconds, target) {
    var element = document.getElementById(target);
    var calculateAndShow = function () {
        if (seconds > 0) {
            var h = Math.floor(seconds / 3600);
            var m = Math.floor((seconds % 3600) / 60);
            var s = seconds % 60;
            element.innerHTML=
                leadingzero(h) + ':' +
                leadingzero(m) + ':' +
                leadingzero(s);
            seconds--;
        } else {
            return false;
        }
    };
    var completed = function () {
        element.innerHTML = "<strong>Liftoff!<\/strong>";
    };
    calculateAndShow.Timer(1000, Infinity, completed);
}