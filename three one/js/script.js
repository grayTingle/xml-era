let xhr = new XMLHttpRequest();
//4 means it's like basically loaded up the html n css n js
//200 just means the page actually loaded
//tldr, on successful load, after everything else has

xhr.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
 
    museum(this);//this is referring to the httprequest
    //we're calling to the function we're making below vvvvv
 
 }
};
xhr.open("GET", "http://127.0.0.1:5500/stuff.xml", true); //the true/false refers to being asynchronous, making it all synced can be slower, tkes true (asynchronous) by default
xhr.send(); //this does the thing, this is the thing-doing command

//all that up there is api stuff that you basically just need for anything to happen, copy it over

function museum(xmlobject){
var xmlresponse = xmlobject.responseXML; //find the xml and display it as thus
console.log(xmlresponse) //picks up the xml stuff in the console (yay)
var museumvar = xmlresponse.getElementsByTagName("museum"); //now you're reading the stuff you pulled from the log
for(let i = 0; i < museumvar.length; i++)
    {
        console.log(museumvar[i])
        var cardtext = document.querySelector("div.card:nth-child("+ (i+1) +")"); //js starts from zero but css starts from one and you need ot deal with that and this is how
        
        cardtext.querySelector("h2.card-title").textContent = museumvar[i].getElementsByTagName("name")[0].textContent; //put the text in the spot
        cardtext.querySelector("a.icons").setAttribute("href",museumvar[i].getElementsByTagName("addressurl")[0].textContent); //making links work on not-text
        cardtext.querySelector("p.card-text").textContent = museumvar[i].getElementsByTagName("opendate")[0].textContent;
        cardtext.querySelector("p.state").textContent = museumvar[i].getElementsByTagName("country")[0].textContent;

        var cates = museumvar[i].getElementsByTagName("arts")[0].children; // grab the subroot stuff
        var catext = "";

    for(let j = 0; j < cates.length; j++){
        console.log(cates[j]);
        catext = catext + " " + cates[j].getAttribute("name"); //this makes it write all the names out, instead of just one
    }
        cardtext.querySelector("h4.cate").textContent = catext; 
    }
}