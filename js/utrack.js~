'use strict';

/*
Put any interaction code here
 */
var activityStoreModel;
var graphModel;
var classes;
window.addEventListener('load', function() {
    // You should wire up all of your event handling code here, as well as any
    // code that initiates calls to manipulate the DOM (as opposed to responding
    // to events)
    //console.log("Hello world!");
    
    activityStoreModel = new ActivityStoreModel();
    graphModel = new GraphModel();
    graphModel.addGraph("Table Summary");
    graphModel.addGraph("Scatterplot");
    graphModel.addGraph("Bar Graph");
    classes = createModule();
    makeHelper(classes);
    makeAnHelper(classes);
    toInput();
    
    
    //for the nav bar buttons
    var inputNav = document.getElementById('inputNav');
    var analysisNav = document.getElementById('analysisNav');
    
    inputNav.addEventListener('click', function() {
        clickInput(inputNav, analysisNav);
    });
    
    analysisNav.addEventListener('click', function() {
        clickAnalysis(analysisNav, inputNav);
    });
    
    
});

function toAnalysis(anNav) {
    
    console.log("Switching to Analysis");
    var anDiv = document.getElementById('analysis_div');
    var inDiv = document.getElementById('input_div');
    anDiv.style.display = 'block';
    inDiv.style.display = 'none';
    var onTable = document.getElementById('views');
    classes.ManualSelect(onTable.value);
}

function toInput() {
    console.log("Switching to Input");
    var anDiv = document.getElementById('analysis_div');
    var inDiv = document.getElementById('input_div');
    anDiv.style.display = 'none';
    inDiv.style.display = 'block';
}

function clickInput(inNav, anNav) {
    inNav.setAttribute('class','active');
    anNav.removeAttribute('class');
    toInput();
}

function clickAnalysis(anNav, inNav) {
    anNav.setAttribute('class','active');
    inNav.removeAttribute('class');
    toAnalysis();
}

function makeHelper(classes) {
    var energyHelp = new classes.EnergyHelpView('energyDiv');
    var stressHelp = new classes.StressHelpView('stressDiv');
    var happinessHelp = new classes.HappinessHelpView('happinessDiv');
    var submitHelp = new classes.SubmitHelpView('submitDiv');
    var altEnergy = new classes.AlterEnergy();
    var alterStress = new classes.AlterStress();
    var alterHappiness = new classes.AlterHappiness();
    var submitButton = new classes.SubmitBtn();
}

function makeAnHelper(classes) {
    var tableSummary = new classes.DisplayTableSummary();
    var graphSelect = new classes.GraphSelect();
    var optionsCheck = new classes.OptionsCheck();
    var manualSelect = new classes.ManualSelect("Table Summary");
}



