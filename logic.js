var showingSourceCode = false;
var isInEditMode = true;
var externalDoc = null;
var myXML = null;
var xsltProcessor = new XSLTProcessor();

var myXMLHTTPRequest = new XMLHttpRequest();
myXMLHTTPRequest.open("GET", "ExtEss/ExtEss.xsl", false);
myXMLHTTPRequest.send(null);
var xslRef = myXMLHTTPRequest.responseXML;
xsltProcessor.importStylesheet(xslRef);

function processFiles(files) {
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var output = document.getElementById("fileOutput"); 
    produceText("<essay> <title> Реализация расширяемого эссе </title> <parts> lol</parts> </essay>");
    richTextField.document.getElementsByTagName('body')[0].innerHTML = myXML;
    //e.target.result
  };
  reader.readAsText(file);
};

function parseHTML(text) {
  parser = new DOMParser();
  return parser.parseFromString(txt, "text/xml");

}

function produceText(text) {
  alert(text);
  $.ajax(
  {
    type: "POST",
    url: "https://www.prettifier.net/ajax",
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:63.0) Gecko/20100101 Firefox/63.0",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.5",
        "Referer": "https://www.prettifier.net/xml/",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest"
      },
    data: {
      "data": text,
      "url": "",
      "type": "xml"
    },
    success: function(result) {
      alert(result);
      myXML = jQuery.parseJSON(result);
    }
  }
  );
}

function checkReadyState() {
 if (externalDoc.readyState == 4) {
  if (
   externalDoc.status == 200
   && externalDoc.responseXML.documentElement
   && externalDoc.responseXML.documentElement.nodeName != 'parsererror'
   ) {
   alert('Файл пришел в целости и сохранности!');
}
}
}

function loadAsyncXML(fileName) {
 try {
  externalDoc = new XMLHttpRequest();
} catch (error) {
  try {
    externalDoc = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (error){ 
    return;
  }
}
externalDoc.onreadystatechange = checkReadyState;
externalDoc.open('GET', fileName);
externalDoc.send(null);
}

function enableEditMode () {
  richTextField.document.designMode = 'On';
}

function execCmd (command) {
  richTextField.document.execCommand(command, false, null);
}

function execCommandWithArg (command, arg) {
  richTextField.document.execCommand(command, false, arg);
}

function toggleSource () {
  if (showingSourceCode) {
    richTextField.document.getElementsByTagName('body')[0].innerHTML = richTextField.document.getElementsByTagName('body')[0].textContent;
    showingSourceCode = false;
  } else {
    richTextField.document.getElementsByTagName('body')[0].textContent = richTextField.document.getElementsByTagName('body')[0].innerHTML;
    showingSourceCode = true;
  }
}

function toggleEdit () {
  if(isInEditMode) {
    richTextField.document.designMode = 'Off';
    isInEditMode = false;
  } else {
    richTextField.document.designMode = 'On';
    isInEditMode = true;
  }
}

function randomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 8;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  document.randform.randomfield.value = randomstring;
}

function createBasic (text, id){
  var paragraph = document.createElement("Paragraph");
  var att = document.createAttribute("id");       
  att.value = randomstring();                           
  paragraph.setAttributeNode(att);  
  var basic = document.createElement("Basic");
  var att2 = document.createAttribute("id");       
  att2.value = randomstring();                           
  basic.setAttributeNode(att2); 
  var t =  document.createTextNode(text); 
  basic.appendChild(t);
  paragraph.appendChild(basic);
  if (! id == ""){
    node = myXML.document.getElementById(id);
  }
  else{
    node = myXML.document.getElementsByTagName('body')[0]; 
  }
  node.appendChild(paragraph);
  convertXmlToHtml();
}

function convertXmlToHtml(){
  richTextField = xsltProcessor.transformToDocument(myXML);
}


















