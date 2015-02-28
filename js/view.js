'use strict';

// Put your view code here (e.g., the graph renderering code)

//the forms are hardcoded in
//modify helpers and such from here since they are the only truly interactive
//part of the input view (and errors)
function createModule() {

    var InputView = function () {
        
    };

    _.extend(InputView.prototype, {
        _initializeForm: function (inputName, elementId, givenText) {
            var helpTemplate = document.getElementById(inputName);
            this.newSpan = document.createElement('span');
            this.newSpan.className = "help-block";
            this.newSpan.setAttribute("id", elementId);
            this.newSpan.innerText = givenText;
            helpTemplate.appendChild(this.newSpan);
        }
    });
    
    var SubmitBtn = function() {
        var curBtn = document.getElementById('submitBtn');
        curBtn.addEventListener('click', function () {
            submitClicked();
        });
    };
    _.extend(SubmitBtn.prototype, InputView.prototype);
    
    var EnergyHelpView = function(inputName) {
        this._initializeForm(inputName, 'energy-help', 'Exhausted To Very Awake');
    };
    _.extend(EnergyHelpView.prototype, InputView.prototype);
    
    var StressHelpView = function(inputName) {
        this._initializeForm(inputName, 'stress-help', 'Very Stressed To Very Relaxed');
    };
    _.extend(StressHelpView.prototype, InputView.prototype);
    
    var HappinessHelpView = function(inputName) {
        this._initializeForm(inputName, 'happiness-help', 'Depressed To Very Happy');
    };
    _.extend(HappinessHelpView.prototype, InputView.prototype);
    
    var SubmitHelpView = function(inputName) {
        this._initializeForm(inputName, 'submit-help', 'No Current Entries');
    };
    _.extend(SubmitHelpView.prototype, InputView.prototype);
    
    var AlterEnergy = function() {
        var energyVal = document.getElementById('energy');
        
        energyVal.addEventListener('input', function() {
            var newText = energyText(energyVal.value);
            var energySpan = document.getElementById('energy-help');
            energySpan.innerText = newText;
        });
    };
    
    var AlterStress = function() {
        var stressVal = document.getElementById('stress');
        
            stressVal.addEventListener('input', function() {
            var newText = stressText(stressVal.value);
            var stressSpan = document.getElementById('stress-help');
            stressSpan.innerText = newText;
        });
    };
    
    var AlterHappiness = function() {
        var happyVal = document.getElementById('happiness');
        
            happyVal.addEventListener('input', function() {
            var newText = happinessText(happyVal.value);
            var happySpan = document.getElementById('happiness-help');
            happySpan.innerText = newText;
        });
    };
    
    //=====================================================
    var AnalysisView = function() {
    };
    var GraphSelect = function() {
        var selectGraph = document.getElementById('views');
        selectGraph.addEventListener('change', function() {
        console.log("entered graph select");
            if (selectGraph.value == "Table Summary") {
                console.log("Table Summary Selected");
                HideOptions();
                RemoveCanvas();
                DisplayTableSummary();
                
            } else if( selectGraph.value == "Scatterplot") {
                console.log("Scatterplot Selected");
                RemoveTableSummary();
                ShowOptions();
                RemoveCanvas();
                var curCanv = CreateCanvas();
                DrawScatter(curCanv);
            } else if(selectGraph.value == "Bar Graph") {
                console.log("Bar Graph Selected");
                RemoveTableSummary();
                RemoveCanvas();
                var curCanv = CreateCanvas();
                DrawBar(curCanv);
            }
        });
    };
    
    var ManualSelect = function (graphName) {
        var selectGraph = document.getElementById('views');
        if (graphName == "Table Summary") {
                console.log("Table Summary Selected");
                HideOptions();
                RemoveCanvas();
                DisplayTableSummary();
                selectGraph.value = "Table Summary"; //TODO check if this works as intended
            } else if(graphName == "Scatterplot") {
                console.log("Scatterplot Selected");
                RemoveTableSummary();
                ShowOptions();
                RemoveCanvas();
                var curCanv = CreateCanvas();
                DrawScatter(curCanv);
                selectGraph.value == "Scatterplot";
            } else if(graphName == "Bar Graph") {
                console.log("Bar Graph Selected");
                RemoveTableSummary();
                RemoveCanvas();
                var curCanv = CreateCanvas();
                DrawBar(curCanv);
                selectGraph.value == "Bar Graph";
            }
    };
    
    
    var ShowOptions = function () {
        var checkDiv = document.getElementById('checkDiv');
        checkDiv.style.display="block"
    };
    
    var HideOptions = function() {
        var checkDiv = document.getElementById('checkDiv');
        checkDiv.style.display="none";
    };
    
    var OptionsCheck = function() {
        var energyCheck = document.getElementById('energyCheck');
        var stressCheck = document.getElementById('stressCheck');
        var happyCheck = document.getElementById('happyCheck');
        energyCheck.addEventListener('click', function () {
            console.log("energy checked");
            RemoveCanvas();
            var canvas = CreateCanvas();
            DrawScatter(canvas);
            
        });
        stressCheck.addEventListener('click', function () {
            console.log("stress checked");
            RemoveCanvas();
            var canvas = CreateCanvas();
            DrawScatter(canvas);
        });
        happyCheck.addEventListener('click', function () {
            console.log("happy checked");
            RemoveCanvas();
            var canvas = CreateCanvas();
            DrawScatter(canvas);
        });
    }
    
    var CreateCanvas = function () {
        var curDiv = document.getElementById('analysis_div');
        var canvas = document.getElementById('canvas');
        if(isEmpty(canvas)) {
            canvas = document.createElement('canvas');
            canvas.setAttribute("id", "canvas");
            canvas.width=600;
            canvas.height=300;
            curDiv.appendChild(canvas);
        }
        return canvas;
    };
    
    var RemoveCanvas = function() {
        var curDiv = document.getElementById('analysis_div');
        var canvas = document.getElementById('canvas');
        if(canvas != null) {
            curDiv.removeChild(canvas);
        }
    };
    
    var DrawBar = function(canvas) {
        
        var width = canvas.width;
        var height = canvas.height;
        var context = canvas.getContext('2d');
        context.font = "16px Arial";
        context.strokeText("Coming to UTrack soon!", 10 , 20);
    }
    
    var DrawScatter = function(canvas) {
        var width = canvas.width;
        var height = canvas.height;
        var context = canvas.getContext('2d');
        
        context.rect(50,0, width-100, height-100);
        context.stroke();
        var numActivities = 10;
        context.font = "14px Arial";
        context.strokeText("1", 40, 168);
        context.strokeText("2", 40, 132);
        context.strokeText("3", 40, 96);
        context.strokeText("4", 40, 60);
        context.strokeText("5", 40, 24);
        
        context.save();
        context.translate(width, 0);
        context.rotate(3*Math.PI /2);
        context.strokeText("Schoolwork", -280, -525);
        context.strokeText("Studying", -270, -480);
        context.strokeText("Writing Code", -290, -435);
        context.strokeText("Video Games", -295, -390);
        context.strokeText("Playing Sports", -300, -345);
        context.strokeText("Lecture", -270, -300);
        context.strokeText("Attending Lab", -290, -255);
        context.strokeText("Watching TV", -290, -210);
        context.strokeText("Makin' Bank", -285, -165);
        context.strokeText("Gettin' Swole", -290, -120);
        context.restore();
        
        context.font = "12px Arial";
        var energyCheck = document.getElementById('energyCheck');
        var stressCheck = document.getElementById('stressCheck');
        var happyCheck = document.getElementById('happyCheck');
        if(energyCheck.checked==true) {
            var curEnergy =activityStoreModel.getAvgEnergy("Schoolwork");
            context.strokeText("X", 65, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Studying");
            context.strokeText("X", 110, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Writing Code");
            context.strokeText("X", 155, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Video Games");
            context.strokeText("X", 200, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Playing Sports");
            context.strokeText("X", 245, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Attending Lecture");
            context.strokeText("X", 290, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Attending Lab");
            context.strokeText("X", 335, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Watching TV");
            context.strokeText("X", 380, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Makin' Bank");
            context.strokeText("X", 425, 200-curEnergy*34);
            
            curEnergy =activityStoreModel.getAvgEnergy("Gettin' Swole");
            context.strokeText("X", 470, 200-curEnergy*34);
        }
        
        if(stressCheck.checked==true) {
            var curStress =activityStoreModel.getAvgStress("Schoolwork");
            context.strokeText("O", 65, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Studying");
            context.strokeText("O", 110, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Writing Code");
            context.strokeText("O", 155, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Video Games");
            context.strokeText("O", 200, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Playing Sports");
            context.strokeText("O", 245, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Attending Lecture");
            context.strokeText("O", 290, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Attending Lab");
            context.strokeText("O", 335, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Watching TV");
            context.strokeText("O", 380, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Makin' Bank");
            context.strokeText("O", 425, 200-curStress*34);
            
            curStress =activityStoreModel.getAvgStress("Gettin' Swole");
            context.strokeText("O", 470, 200-curStress*34);
        }
        
        if(happyCheck.checked==true) {
            var curHappy=activityStoreModel.getAvgHappiness("Schoolwork");
            context.strokeText("+", 65, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Studying");
            context.strokeText("+", 110, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Writing Code");
            context.strokeText("+", 155, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Video Games");
            context.strokeText("+", 200, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Playing Sports");
            context.strokeText("+", 245, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Attending Lecture");
            context.strokeText("+", 290, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Attending Lab");
            context.strokeText("+", 335, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Watching TV");
            context.strokeText("+", 380, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Makin' Bank");
            context.strokeText("+", 425, 200-curHappy*34);
            
            curHappy =activityStoreModel.getAvgHappiness("Gettin' Swole");
            context.strokeText("+", 470, 200-curHappy*34);
        }
    };
    
    var RemoveTableSummary = function () {
        var curDiv = document.getElementById('analysis_div');
        var tableDiv = document.getElementById('tableSummary');
        if(!isEmpty(tableDiv)) {
            curDiv.removeChild(tableDiv);
        }
    };
    
    var DisplayTableSummary = function() {
        var curDiv = document.getElementById('analysis_div');
        var tableDiv = document.getElementById('tableSummary');
        if (isEmpty(tableDiv)) {
            tableDiv = document.createElement('div');
            tableDiv.setAttribute('id', 'tableSummary');
            tableDiv.className="panel panel-default";
            curDiv.appendChild(tableDiv);
            var tableHead = document.createElement('div');
            tableHead.className="panel-heading";
            tableHead.innerText = "Table Summary of All Data";
            tableDiv.appendChild(tableHead);
        }
        var tableSetup = document.getElementById('tableSummaryData');
        if (!isEmpty(tableSetup)) {
            tableDiv.removeChild(tableSetup);
        }
        tableSetup = document.createElement('table');
        tableSetup.className = "table";
        tableSetup.setAttribute('id', 'tableSummaryData');
        var tableHead = document.createElement('tr');
        var actHead = document.createElement('th');
        actHead.innerText="Activity";
        tableHead.appendChild(actHead);
        var energyHead = document.createElement('th');
        energyHead.innerText="Avg. Energy";
        tableHead.appendChild(energyHead);
        var stressHead = document.createElement('th');
        stressHead.innerText="Avg. Stress";
        tableHead.appendChild(stressHead);
        var happyHead = document.createElement('th');
        happyHead.innerText="Avg. Happiness";
        tableHead.appendChild(happyHead);
        var timeAHead = document.createElement('th');
        timeAHead.innerText="Avg. Time";
        tableHead.appendChild(timeAHead);
        var timeHead = document.createElement('th');
        timeHead.innerText="Total Time";
        tableHead.appendChild(timeHead);
        tableSetup.appendChild(tableHead);
        tableDiv.appendChild(tableSetup);
        
        //add available activity types
        addToTable("Schoolwork", tableSetup);
        addToTable("Studying", tableSetup);
        addToTable("Writing Code", tableSetup);
        addToTable("Video Games", tableSetup);
        addToTable("Playing Sports", tableSetup);
        addToTable("Attending Lecture", tableSetup);
        addToTable("Attending Lab", tableSetup);
        addToTable("Watching TV", tableSetup);
        addToTable("Makin' Bank", tableSetup);
        addToTable("Gettin' Swole", tableSetup);
    };
    
    return {
        EnergyHelpView: EnergyHelpView,
        StressHelpView: StressHelpView,
        HappinessHelpView: HappinessHelpView,
        SubmitHelpView: SubmitHelpView,
        AlterEnergy: AlterEnergy,
        AlterStress: AlterStress,
        AlterHappiness: AlterHappiness,
        SubmitBtn: SubmitBtn,
        GraphSelect: GraphSelect,
        DisplayTableSummary: DisplayTableSummary,
        RemoveTableSummary: RemoveTableSummary,
        CreateCanvas: CreateCanvas,
        RemoveCanvas: RemoveCanvas,
        OptionsCheck: OptionsCheck,
        ManualSelect: ManualSelect
    };
}

function addToTable(actName, table) {
    if(activityStoreModel.isDataEntered(actName) ==false) {
        return false;
    }
    
    var avgEn = activityStoreModel.getAvgEnergy(actName);
    var avgSt = activityStoreModel.getAvgStress(actName);
    var avgHa = activityStoreModel.getAvgHappiness(actName);
    var avgTi = activityStoreModel.getAvgTime(actName);
    var ttlTi = activityStoreModel.getTtlTime(actName);
    var newRow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    
    td1.innerText=actName;
    td2.innerText=Math.round(100*avgEn)/100;
    td3.innerText=Math.round(100*avgSt)/100;
    td4.innerText = Math.round(100*avgHa)/100;
    td5.innerText = Math.round(100*avgTi)/100;
    td6.innerText = ttlTi;
    
    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);
    newRow.appendChild(td4);
    newRow.appendChild(td5);
    newRow.appendChild(td6);
    
    table.appendChild(newRow);
}

function energyText(givenVal) {
    if (isEmpty(givenVal)) {
        return "Exhausted To Very Awake";
    } else if(givenVal == 1) {
        return "Exhausted";
    } else if(givenVal == 2) {
        return "Tired";
    } else if(givenVal == 3) {
        return "Normal";
    } else if(givenVal == 4) {
        return "Awake";
    } else if(givenVal == 5) {
        return "Very Awake"
    } else {
        return "Enter Value from 1-5";
    }
}

function stressText(givenVal) {
    if (isEmpty(givenVal)) {
        return "Very Stressed To Very Relaxed";
    } else if(givenVal == 1) {
        return "Very Stressed";
    } else if(givenVal == 2) {
        return "Stressed";
    } else if(givenVal == 3) {
        return "Normal";
    } else if(givenVal == 4) {
        return "Relaxed";
    } else if(givenVal == 5) {
        return "Very Relaxed"
    } else {
        return "Enter Value from 1-5";
    }
}

function happinessText(givenVal) {
    if (isEmpty(givenVal)) {
        return "Depressed To Very Happy";
    } else if(givenVal == 1) {
        return "Depressed";
    } else if(givenVal == 2) {
        return "Uncomfortable";
    } else if(givenVal == 3) {
        return "Normal";
    } else if(givenVal == 4) {
        return "Happy";
    } else if(givenVal == 5) {
        return "Very Happy"
    } else {
        return "Enter Value from 1-5";
    }
}


//return true for success, false for failure
function submitClicked() {
    console.log("entered");
    //check values first
    var activityVal = document.getElementById('activities').value;
    var energyVal = document.getElementById('energy').value;
    var stressVal = document.getElementById('stress').value;
    var happyVal = document.getElementById('happiness').value;
    var timeVal = document.getElementById('time').value;
    var errorSpan = document.getElementById('errorMes');
    var errorDiv = document.getElementById('error');
    if (isEmpty(energyVal) || isEmpty(stressVal) || isEmpty(happyVal) || isEmpty(timeVal)) {
        errorSpan.innerText="Make sure you fill all inputs in";
        error.style.display = 'block';
        console.log("empty values");
        return false;
    }
    if (energyVal <1 || energyVal >5) {
        errorSpan.innerText="Not all values are valid, check again";
        error.style.display = 'block';
        return false;
    }
    error.style.display = 'none';
    
    //store values
    var actHash = {};
    actHash['energy'] = energyVal;
    actHash['stress'] = stressVal;
    actHash['happy'] = happyVal;
    var curAct = new ActivityData(activityVal, {energyLevel: energyVal, stressLevel: stressVal, happinessLevel: happyVal}, timeVal);
    activityStoreModel.addActivityDataPoint(curAct);
    
    //clear input boxes
    document.getElementById('energy').value = "";
    document.getElementById('stress').value = "";
    document.getElementById('happiness').value = "";
    document.getElementById('time').value = "";
    document.getElementById('energy-help').innerText = energyText("");
    document.getElementById('stress-help').innerText = stressText("");
    document.getElementById('happiness-help').innerText = happinessText("");
    
    //last entered date and time update============
    var subHelp = document.getElementById('submit-help');
    var curDate = new Date();
    var curMins = curDate.getMinutes();
    if (curMins<10) {
        curMins = "0"+curMins;
    }
    var dateTime = "Last Entry: " + monthToName(curDate.getMonth()+1) + " " +
    + curDate.getDate() + ", " + curDate.getFullYear() + " at " + curDate.getHours() +
     ":" +curMins;
    subHelp.innerText=dateTime;
    
}

function monthToName(curMonth) {
    switch(curMonth) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Apr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
    }
}

function isEmpty(givenVal) {
    return (givenVal == null || givenVal == "");
}

