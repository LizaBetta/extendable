var showingSourceCode = false;
var isInEditMode = true;
var externalDoc = null;
var myXML = null;

var xsltProcessor = new XSLTProcessor();

var myXMLHTTPRequest = new XMLHttpRequest();
myXMLHTTPRequest.open("GET", "https://raw.githubusercontent.com/LizaBetta/extendable/master/ExtEss/ExtEss.xsl", false);
myXMLHTTPRequest.send(null);
var xslRef = parseXML(myXMLHTTPRequest.responseText);
xsltProcessor.importStylesheet(xslRef);

function parseXML(text) {
  parser = new DOMParser();
  return parser.parseFromString(text, "text/xml");
}

function LoadXML(files) {
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    newDoc = parseXML(event.target.result);
    trans = xsltProcessor.transformToDocument(newDoc.documentElement);
    tmp = trans.documentElement;
    document.getElementById("richTextField").appendChild(trans.body);
    document.getElementById("richTextField").contentEditable = true;

  };
  reader.readAsText(file);
};

function initXSLT() {
  var xhttp = new XMLHttpRequest();
  var myXSLT = null;

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myXSLT = this.responseXML;
    }
  };
  xhttp.open("GET", "https://raw.githubusercontent.com/LizaBetta/extendable/master/ExtEss/ExtEss.xsl", false);
  xhttp.send();

  // Finally import the .xsl
  xsltProcessor.importStylesheet(myXSLT);
}

function enableEditMode () {
  document.getElementById("richTextField").contentEditable = true;
}

function execCmd (command) {
  document.getElementById("richTextField").execCommand(command, false, null);
}

function execCommandWithArg (command, arg) {
  document.getElementById("richTextField").execCommand(command, false, arg);
}

function toggleSource () {
  if (showingSourceCode) {
    document.getElementById("richTextField").getElementsByTagName('body')[0].innerHTML = document.getElementById("richTextField").getElementsByTagName('body')[0].textContent;
    showingSourceCode = false;
  } else {
    document.getElementById("richTextField").getElementsByTagName('body')[0].textContent = document.getElementById("richTextField").getElementsByTagName('body')[0].innerHTML;
    showingSourceCode = true;
  }
}

function toggleEdit () {
  if(isInEditMode) {
    document.getElementById("richTextField").contentEditable = false;
    isInEditMode = false;
  } else {
    document.getElementById("richTextField").contentEditable = true;
    isInEditMode = true;
  }
}