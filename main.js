function run() {
    var toggles = []
    for (var i = 0; i < PeopleNames.length; i++) {
        toggles.push(document.getElementById("ScheduleToggles_" + i).checked)
    }
    var maxOrNothing = document.getElementById("ScheduleToggles_Max").checked
    var numToggled = toggles.filter(Boolean).length;
    var grid = document.querySelector("#GroupGridSlots")
    
    var timeSlotsPerDay = grid.children.length;
    var daysAvailable; if (timeSlotsPerDay > 0) { daysAvailable = grid.children[0].children.length } else { console.error("ERROR: No Days Available"); return; }
    var max = 0

    for (var i = 0; i < AvailableAtSlot.length; i++) {
        var list = AvailableAtSlot[i]
        var cnt = 0

        if (numToggled === 0) {
            cnt = list.length
        } else {
            for (var id of list) {
                if (toggles[PeopleIDs.indexOf(id)] === true) {
                    cnt++
                }
            }
        }

        if (cnt > max) {
            max = cnt
        }
    }

    for (var i = 0; i < daysAvailable; i++) {
        for (var j = 0; j < timeSlotsPerDay; j++) {
            var el = grid.children[j].children[i]//.querySelector("[id|=GroupTime], [data-col=" + i + "], [data-row=" + j + "]")
            var list = AvailableAtSlot[i*timeSlotsPerDay + j]
            var cnt = 0
            
            if (numToggled === 0) {
                cnt = list.length
            } else {
                for (var id of list) {
                    if (toggles[PeopleIDs.indexOf(id)] === true) {
                        cnt++
                    }
                }
            }
            
            //totalToggled = numToggled === 0 ? toggles.length : numToggled
            multVal = maxOrNothing ? cnt == max : cnt / max;
            el.style.background = "rgb(" + (255 - (255-51) * multVal) + ", " + (255 - (255-153) * multVal) + ", " + (255 - (255-0) * multVal) + ")"
        }
    }
}

function createDiv() {
    var div = document.createElement("div");
    div.setAttribute('id', 'toggles');
    var nameStr = "<label>Schedules Shown:</label><br>";
    for (var i = 0; i < PeopleNames.length; i++) {
        nameStr += "<input class=\"ScheduleToggles\" id=\"ScheduleToggles_" + i + "\" type=\"checkbox\" onclick=\"run();\"><label> " + (i+1) + ". " + PeopleNames[i] + "</label><br>"
    }
    nameStr += "<br><input id=\"ScheduleToggles_Max\" type=\"checkbox\" onclick=\"run();\"><label>Max or Nothing</label><br>"
    div.innerHTML = nameStr
    document.getElementsByClassName("HalfPanel")[0].appendChild(div);
}

createDiv()
