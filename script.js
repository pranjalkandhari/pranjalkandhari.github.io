function removeSpaceAndMakeLowerCase(str) {
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
    idOfDivToShow = "text-area-" + removeSpaceAndMakeLowerCase(element.textContent);

    divToShow = document.getElementById(idOfDivToShow);
    divToShow.style.display = "block";
}

function hideDivCorrespondingToButton(element) {
    idOfDivToHide = "text-area-" + removeSpaceAndMakeLowerCase(element.textContent);

    divToShow = document.getElementById(idOfDivToHide);
    divToShow.style.display = "none";
}

function selectSection(i) {
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
    element.style.display = "none";
});

showDivCorrespondingToButton(lastClickedElement);
