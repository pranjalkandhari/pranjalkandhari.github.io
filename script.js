function removeSpaceAndMakeLowerCase(str) {
    console.log("removeSpaceAndMakeLowerCase Called");
    finalString = "";
    for (let i=0; i<str.length; i++) {
        if(str.charCodeAt(i) == 32) {
            continue;
        }

        if (str.charCodeAt(i)>=65 && str.charCodeAt(i)<=90) {
            finalString += String.fromCharCode(str.charCodeAt(i) + 32);
        } else {
            finalString += String.fromCharCode(str.charCodeAt(i));
        }
    }

    return finalString;
}

function showDivCorrespondingToButton(element) {
    console.log("showDivCorrespondingToButton called");

    idOfDivToShow = "text-area-" + removeSpaceAndMakeLowerCase(element.textContent);
    console.log(idOfDivToShow);

    divToShow = document.getElementById(idOfDivToShow);
    divToShow.style.display = "block";
}

function hideDivCorrespondingToButton(element) {
    console.log("showDivCorrespondingToButton called");

    idOfDivToShow = "text-area-" + removeSpaceAndMakeLowerCase(element.textContent);
    console.log(idOfDivToShow);

    divToShow = document.getElementById(idOfDivToShow);
    divToShow.style.display = "none";
}

function selectSection(i) {

    console.log("selectSection called");

    // Fill clicked element with border style.
    i.srcElement.style.borderStyle = "solid";
    i.srcElement.style.borderWidth = "4px";
    i.srcElement.style.borderColor = "#a8d1ff";

    // Remove styling from last element
    lastClickedElement.style.borderStyle = "none";
    lastClickedElement.style.borderWidth = "0 px";
    // Hide div for last element:
    hideDivCorrespondingToButton(lastClickedElement);

    // Make clicked element as the lastClickedElement
    lastClickedElement = i.srcElement;
    //Show div for new element: now stored in last element:
    showDivCorrespondingToButton(lastClickedElement);
}

console.log("SCRIPT STARTS");

console.log(removeSpaceAndMakeLowerCase("Hello MY nAmE is Pranjal 1209****      "));

//Getting the work experience button initially and highlight.
var lastClickedElement = document.getElementById("work-experience-button");
lastClickedElement.style.borderStyle = "solid";
lastClickedElement.style.borderWidth = "5px";
lastClickedElement.style.borderColor = "#a8d1ff";

let i=0;
var currentID = 0;
var array = document.querySelectorAll(".button-36").forEach( (element) => {
    element.id = element.className + i;
    i++;
    element.addEventListener("click", selectSection);
});

//Making all divs invisble:
var textAreaArray = document.querySelectorAll('[id^="text-area"]').forEach( (element) => {
    console.log("Text Area array");
    console.log(element.textContent);
    element.style.display = "none";
});

showDivCorrespondingToButton(lastClickedElement);
