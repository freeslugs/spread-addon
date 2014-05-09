function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Grab', 'showSidebar')
      .addToUi();
  showSidebar();
}

function onInstall() {
  onOpen();
}

function showSidebar() {
  var ui = compileHTML()
  .setTitle('Spread')
  .setWidth(100);
  SpreadsheetApp.getUi().showSidebar(ui);
}

function compileHTML() {
  return HtmlService.createTemplateFromFile('Page')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// The config file, the json
var configFile = getConfig();

function getConfig() {
  var url = 'http://spreadapi.com/config.json';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;
}


function testGrab() {
  grab("crunchbase", "dropbox");
}

/** http request functions **/

/**
 * e.g. =grab("company", "dropbox")
 */ 
function grab(fn, params) {
  var data = getData("http://boiling-brushlands-2298.herokuapp.com/api?fn=" + fn + "&params=" + params);  
  Logger.log(data);
  return Utilities.parseCsv(data);
}


function writeFunction(fn, params) {
  var cell = SpreadsheetApp.getActive().getActiveCell();   
  var string;
  var string = '=grab("'
  string += fn + '","';
  string += params +'")';
  cell.setFormula(string);
}

// Gets json from the http request to the api
function getData(url) {
  var response = UrlFetchApp.fetch(url);  
  var json = response.getContentText();
//  return JSON.parse(json);  
  return json;
}


//============================================

/** cool functions **/

function getValue(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');  // convert indexes to properties
    s = s.replace(/^\./, ''); // strip leading dot
    var a = s.split('.');
    while (a.length) {
        var n = a.shift();
        if (n in o) {
            o = o[n];
        } else {
            return;
        }
    }
    return o;
}

function getKey(object, value){
  for(var key in object){
    if(object[key] == value){
      return key;
    }
  }
  return null;
};
