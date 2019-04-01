"use strict";

/* -----------------------------------------
-- Initialize
------------------------------------------*/

var firstGo = true,
    spinning = false,
    holding = false,
    debug = false,

    reelNum = 0,
    balanceState = 0,
    bodyClass,
    els = document.getElementsByClassName("blink"),

    coins0 = document.getElementById("coins-0"),
    coins1 = document.getElementById("coins-1"),
    coins2 = document.getElementById("coins-2"),
    coins3 = document.getElementById("coins-3"),
    coins4 = document.getElementById("coins-4"),
    coins5 = document.getElementById("coins-5"),
    coins6 = document.getElementById("coins-6"),
    coins7 = document.getElementById("coins-7"),
    coins8 = document.getElementById("coins-8"),

    winnings = 0,
    winningsString,
    currentCredit,

    reel1Map = [],
    reel2Map = [],
    reel3Map = [],
    defaultSpin = -1800,
    onlyBars = ["bar", "twobar", "threebar"],
    onlyCherrySeven = ["cherry", "seven"],

    stopLocations1,
    stopLocations2,
    stopLocations3,

    a,
    b,
    c,
    str,
    i,
    coin,
    elements,
    selValue,
    posValue,

    laststopLocations1 = -6,
    laststopLocations2 = -6,
    laststopLocations3 = -6,

    thisLaststopLocations,

    lastStopTopLocation1Minus,
    lastStopTopLocation2Minus,
    lastStopTopLocation3Minus,

    lastStopCenterLocation1Minus,
    lastStopCenterLocation2Minus,
    lastStopCenterLocation3Minus,

    lastStopBottomLocation1Minus,
    lastStopBottomLocation2Minus,
    lastStopBottomLocation3Minus,

    reel1TopValue,
    reel2TopValue,
    reel3TopValue,

    reel1CenterValue,
    reel2CenterValue,
    reel3CenterValue,

    reel1BottomValue,
    reel2BottomValue,
    reel3BottomValue,

    reelDuration1 = 3400,
    reelDuration2 = 2800,
    reelDuration3 = 2000,

    thisReel,
    thisReelEnd,
    wobbleRotation,
    reelWobble,

    reels = document.getElementsByClassName("reel"),
    reel1 = document.getElementById("reel1"),
    reel2 = document.getElementById("reel2"),
    reel3 = document.getElementById("reel3"),
    bank = document.getElementById("bank").value,
    rightwrap,
    bank2 = 0,
    bank3,
    bank4,
    bank5,

    // Equal stop locations for every reel
    stopLocations = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

function initializeReels() {

    console.log("initialize reels");



    reel1Map = {
        m30: "bar",
        0: "threebar",
        30: "bar",
        60: "twobar",
        90: "seven",
        120: "cherry",
        150: "threebar",
        180: "bar",
        210: "twobar",
        240: "seven",
        270: "cherry",
        300: "threebar",
        330: "bar",
        360: "threebar"
    };

    reel2Map = {
        m30: "seven",
        0: "twobar",
        30: "seven",
        60: "cherry",
        90: "threebar",
        120: "bar",
        150: "twobar",
        180: "seven",
        210: "cherry",
        240: "threebar",
        270: "bar",
        300: "twobar",
        330: "seven",
        360: "twobar"
    };

    reel3Map = {
        m30: "threebar",
        0: "cherry",
        30: "threebar",
        60: "bar",
        90: "twobar",
        120: "seven",
        150: "cherry",
        180: "threebar",
        210: "bar",
        240: "twobar",
        270: "seven",
        300: "cherry",
        330: "threebar",
        360: "cherry"
    };

    spinReels();
}


(function () {

    var h = window.innerHeight,
        w = window.innerWidth;

    reelScale(w);

    // Spin button

    document.getElementById("spin-button").onclick = function () {
        if (firstGo === true && spinning === false && debug === false) {
            initializeReels();
            eatCoin();
        } else if (spinning === false) {
            console.log("Continuing normally");
            initializeReels();
        }
        if (debug === true) {
            console.log("Debugging true");
            eatCoin();
            setFixed();
        }
    };

})();


/* -----------------------------------------
-- Window resize
------------------------------------------*/

window.onresize = function (event) {

    var h = window.innerHeight;
    var w = window.innerWidth;
    //orientation(w, h);
    reelScale(w);
};


/* -----------------------------------------
-- Functions
------------------------------------------*/

function spinReels() {
    // Removing blink class from paytable
    clearBlink();

    console.log("spinReels");

    // Starting spin
    spinning = true;
    addClass(document.body, "spinning");
    var completeReels = 0;

    // if we are not holding reel 1, spin reel 1
    if (!hasClass(document.body, "holdReel1")) {
        stopLocations1 = stopLocations[Math.floor(Math.random() * stopLocations.length)] + defaultSpin - 6;
        //stopLocations1 = stopLocations[10]+defaultSpin-6;
        Velocity(reel1, {
            rotateX: [stopLocations1, 0 + laststopLocations1],
        }, {
            easing: "linear",
            duration: 2000,
            complete: function (elements) {
                thisReelEnd = stopLocations1;
                reelWobble(elements, thisReelEnd);
            }
        });
        laststopLocations1 = stopLocations1 - defaultSpin + 6;
    } else {
        completeReels++;
        laststopLocations1 = stopLocations1 - defaultSpin + 6;
    }

    // if we are not holding reel 2, spin reel 2
    if (!hasClass(document.body, "holdReel2") && debug === false) {
        stopLocations2 = stopLocations[Math.floor(Math.random() * stopLocations.length)] + defaultSpin - 6;
        //stopLocations2 = stopLocations[4]+defaultSpin-6;
        Velocity(reel2, {
            rotateX: [stopLocations2, 0 + laststopLocations2],
        }, {
            easing: "linear",
            duration: 2500,
            complete: function (elements) {
                thisReelEnd = stopLocations2;
                reelWobble(elements, thisReelEnd);
            }
        });
        laststopLocations2 = stopLocations2 - defaultSpin + 6;
    } else {
        completeReels++;
        laststopLocations2 = stopLocations2 - defaultSpin + 6;
    }

    // if we are not holding reel 3, spin reel 3
    if (!hasClass(document.body, "holdReel3") && debug === false) {
        stopLocations3 = stopLocations[Math.floor(Math.random() * stopLocations.length)] + defaultSpin - 6;
        //stopLocations3 = stopLocations[3]+defaultSpin-6;
        Velocity(reel3, {
            rotateX: [stopLocations3, 0 + laststopLocations3],
        }, {
            easing: "linear",
            duration: 3000,
            complete: function (elements) {
                // if we are not holding any reels
                thisReelEnd = stopLocations3;
                reelWobble(elements, thisReelEnd);
            }
        });
        laststopLocations3 = stopLocations3 - defaultSpin + 6;
    } else {
        completeReels++;
        laststopLocations3 = stopLocations3 - defaultSpin + 6;
    }

    // console.log("stopLocations1: " + (stopLocations1-defaultSpin+6));
    // console.log("stopLocations2: " + (stopLocations2-defaultSpin+6));
    // console.log("stopLocations3: " + (stopLocations3-defaultSpin+6));

    // Wobble function for end of reel animation
    function reelWobble(elements, thisReelEnd) {
        wobbleRotation = thisReelEnd - 6;
        Velocity(elements, {
            rotateX: [thisReelEnd, wobbleRotation],
        }, {
            easing: [800, 10],
            duration: 600,
            complete: function (elements) {
                completeReels++;
                if (completeReels === 3) {
                    calculateScores();
                }
            }
        });
    }
    // Check if line exists before spin
    if (document.getElementById("line-top").style.display === "block") {
        addLineTop();
    }
    if (document.getElementById("line-center").style.display === "block") {
        addLineCenter();
    }
    if (document.getElementById("line-bottom").style.display === "block") {
        addLineBottom();
    }
}

function count_similarities(a, onlyBars) {
    var matches = 0;
    for (i = 0; i < a.length; i++) {
        if (onlyBars.indexOf(a[i]) != -1)
            matches++;
    }
    return matches;
}

function addLineTop() {
    var x = document.getElementById("line-top");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function addLineCenter() {
    var x = document.getElementById("line-center");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function addLineBottom() {
    var x = document.getElementById("line-bottom");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
// Getting current balance
setInterval(function () {
    currentCredit = +(document.getElementById("bank").value);
    console.log("Current balance: " + currentCredit);
}, 1000);

function eatCoin() {
    winnings = 0;
    --currentCredit;
    document.getElementById("bank").value = currentCredit;
}

function updateInput() {
    bank4 = document.getElementById("bank").value;
    if (bank4 >= 5000) {
        balanceState = 2;
        bank4 = "5000";
        document.getElementById("bank").value = bank4;
        console.log("Higher amount than 5K was chosen");
    } else {
        balanceState = 1;
        console.log("Lower amount than 5K was chosen");
    }
}

function playSfx() {
    var obj = document.createElement("audio");
    obj.src = "./assets/win.mp3";
    obj.volume = 0.1;
    obj.autoPlay = false;
    obj.preLoad = true;
    obj.controls = true;

    obj.play();
    // obj.pause();
}

function calculateScores() {
    var getTopVal = 30;

    console.log("calculateScores");
    console.log((laststopLocations1 - getTopVal), (laststopLocations2 - getTopVal), (laststopLocations3 - getTopVal));
    console.log(laststopLocations1, laststopLocations2, laststopLocations3);
    console.log((laststopLocations1 + getTopVal), (laststopLocations2 + getTopVal), (laststopLocations3 + getTopVal));

    // Replace the "m" from the stop loc array to be a minus

    lastStopTopLocation1Minus = (laststopLocations1 - getTopVal).toString().replace("-", "m");
    lastStopTopLocation2Minus = (laststopLocations2 - getTopVal).toString().replace("-", "m");
    lastStopTopLocation3Minus = (laststopLocations3 - getTopVal).toString().replace("-", "m");

    lastStopCenterLocation1Minus = laststopLocations1.toString().replace("-", "m");
    lastStopCenterLocation2Minus = laststopLocations2.toString().replace("-", "m");
    lastStopCenterLocation3Minus = laststopLocations3.toString().replace("-", "m");

    lastStopBottomLocation1Minus = (laststopLocations1 + getTopVal).toString();
    lastStopBottomLocation2Minus = (laststopLocations2 + getTopVal).toString();
    lastStopBottomLocation3Minus = (laststopLocations3 + getTopVal).toString();


    reel1TopValue = reel1Map[lastStopTopLocation1Minus];
    reel2TopValue = reel2Map[lastStopTopLocation2Minus];
    reel3TopValue = reel3Map[lastStopTopLocation3Minus];

    reel1CenterValue = reel1Map[lastStopCenterLocation1Minus];
    reel2CenterValue = reel2Map[lastStopCenterLocation2Minus];
    reel3CenterValue = reel3Map[lastStopCenterLocation3Minus];

    reel1BottomValue = reel1Map[lastStopBottomLocation1Minus];
    reel2BottomValue = reel2Map[lastStopBottomLocation2Minus];
    reel3BottomValue = reel3Map[lastStopBottomLocation3Minus];

    console.log(reel1TopValue, reel2TopValue, reel3TopValue);
    console.log(reel1CenterValue, reel2CenterValue, reel3CenterValue);
    console.log(reel1BottomValue, reel2BottomValue, reel3BottomValue);

    a = [];
    a.push(reel1BottomValue, reel2BottomValue, reel3BottomValue);

    b = [];
    b.push(reel1CenterValue, reel2CenterValue, reel3CenterValue);

    c = [];
    c.push(reel1TopValue, reel2TopValue, reel3TopValue);


    // We are a winner
    if ((reel1TopValue === reel2TopValue && reel1TopValue === reel3TopValue) ||
        (reel1CenterValue === reel2CenterValue && reel1CenterValue === reel3CenterValue) ||
        (reel1BottomValue === reel2BottomValue && reel1BottomValue === reel3BottomValue)) {

        console.log("winner!");

        if (reel1TopValue === reel2TopValue && reel1TopValue === reel3TopValue) {
            switch (reel1TopValue) {
                case "cherry":
                    addClass(coins0, "blink");
                    winnings = winnings + 2000;
                    break;
                case "bar":
                    addClass(coins7, "blink");
                    winnings = winnings + 10;
                    break;
                case "twobar":
                    addClass(coins6, "blink");
                    winnings = winnings + 20;
                    break;
                case "seven":
                    addClass(coins3, "blink");
                    winnings = winnings + 150;
                    break;
                case "threebar":
                    addClass(coins5, "blink");
                    winnings = winnings + 50;
            }
            playSfx();
            /* alert("Top: Winner with " + reel1TopValue + "s!!"); */
            addLineTop();
        }


        if (reel1CenterValue === reel2CenterValue && reel1CenterValue === reel3CenterValue) {
            switch (reel1CenterValue) {
                case "cherry":
                    addClass(coins1, "blink");
                    winnings = winnings + 1000;
                    break;
                case "bar":
                    addClass(coins7, "blink");
                    winnings = winnings + 10;
                    break;
                case "twobar":
                    addClass(coins6, "blink");
                    winnings = winnings + 20;
                    break;
                case "seven":
                    addClass(coins3, "blink");
                    winnings = winnings + 150;
                    break;
                case "threebar":
                    addClass(coins5, "blink");
                    winnings = winnings + 50;
            }
            playSfx();
            /* alert("Center: Winner with " + reel1CenterValue + "s!!"); */
            addLineCenter();
        }

        if (reel1BottomValue === reel2BottomValue && reel1BottomValue === reel3BottomValue) {
            switch (reel1BottomValue) {
                case "cherry":
                    addClass(coins2, "blink");
                    winnings = winnings + 4000;
                    break;
                case "bar":
                    addClass(coins7, "blink");
                    winnings = winnings + 10;
                    break;
                case "seven":
                    addClass(coins3, "blink");
                    winnings = winnings + 150;
                    break;
                case "threebar":
                    addClass(coins5, "blink");
                    winnings = winnings + 50;
                    break;
                case "twobar":
                    addClass(coins6, "blink");
                    winnings = winnings + 20;
            }
            playSfx();
            /* alert("Bottom: Winner with " + reel1BottomValue + "s!!"); */
            addLineBottom();
        }

        removeClass(document.body, "spinning");
        spinning = false;

    } else {
        removeClass(document.body, "spinning");
        spinning = false;
    }

    // Adding BAR combinations
    str = "";

    if (count_similarities(a, onlyBars) === 3) {
        addClass(coins8, "blink");
        playSfx();
        /*  alert("bar exists"); */
        if (document.getElementById("line-bottom").style.display === "none") {
            addLineBottom();
        }
        winnings = winnings + 5;
    }

    if (count_similarities(b, onlyBars) === 3) {
        addClass(coins8, "blink");
        playSfx();
        /* alert("bar exists"); */
        if (document.getElementById("line-center").style.display === "none") {
            addLineCenter();
        }
        winnings = winnings + 5;
    }

    if (count_similarities(c, onlyBars) === 3) {
        addClass(coins8, "blink");
        playSfx();
        /* alert("bar exists"); */
        if (document.getElementById("line-top").style.display === "none") {
            addLineTop();
        }
        winnings = winnings + 5;
    }
    // Cherrys and sevens combination only

    if ((a.indexOf("cherry") > -1) && (a.indexOf("seven") > -1)) {
        if (count_similarities(a, onlyCherrySeven) === 3) {
            playSfx();
            addClass(coins4, "blink");
            /* alert("cherry 7 exists"); */
            addLineBottom();
            winnings = winnings + 75;
        }
    }
    if ((b.indexOf("cherry") > -1) && (b.indexOf("seven") > -1)) {
        if (count_similarities(b, onlyCherrySeven) === 3) {
            playSfx();
            addClass(coins4, "blink");
            /* alert("cherry 7 exists"); */
            addLineCenter();
            winnings = winnings + 75;
        }
    }
    if ((c.indexOf("cherry") > -1) && (c.indexOf("seven") > -1)) {
        if (count_similarities(c, onlyCherrySeven) === 3) {
            playSfx();
            addClass(coins4, "blink");
            /* alert("cherry 7 exists"); */
            addLineTop();
            winnings = winnings + 75;
        }

    }

    // bank4 is a value which was inserted after entering an integer bigger than 5K, bank3 is an automatic one, bank2 is entered value less than 5K
    // and bank is a winning string
    // balanceState 0 normal, 1 when added value less than 5K, 3 when added over 5K
    if (winnings > 0) {
        if (balanceState === 2) {
            winningsString = winnings.toString();
            bank4 = ((parseFloat(currentCredit) + parseFloat(winningsString))).toString();
            console.log(winnings, bank, bank2, bank3, bank4, bank5);
            document.getElementById("bank").value = bank4;
        } else if (balanceState === 1) {
            winningsString = winnings.toString();
            bank5 = ((parseFloat(currentCredit) + parseFloat(winningsString))).toString();
            console.log(bank5 + " sisestatud väärtus bank5");
            document.getElementById("bank").value = bank5;
        }
        // Random default mode
        else {
            console.log(winnings, bank, bank2, bank3, bank4, bank5);
            winningsString = winnings.toString();
            bank3 = ((parseFloat(currentCredit) + parseFloat(winningsString))).toString();
            document.getElementById("bank").value = bank3;
            winnings = 0;
        }
    }

}


function clearBlink() {
    for (var i = els.length - 1; i >= 0; i--) {
        els[i].classList.remove("blink");
    }
}


function reelScale(w) {

    var reelScaleVal = w / 1400;
    var reels = document.getElementById("reels2");
    var rightwrap = document.getElementById("rightPanel");
    if (reelScaleVal < 1) {
        reels.style.transform = "translateX(-50%) translateY(-60%) scale(" + reelScaleVal + ")";
        rightwrap.style.transform = "translateX(-50%) translateY(-60%) scale(" + reelScaleVal + ")";
    } else {
        reels.style.transform = "translateX(-50%) translateY(-60%) scale(1)";
        rightwrap.style.transform = "translateX(-50%) translateY(-60%) scale(1)";
    }
}

function reelWobble(elements, thisReelEnd) {
    wobbleRotation = thisReelEnd - 6;
    Velocity(elements, {
        rotateX: [thisReelEnd, wobbleRotation],
    }, {
        easing: [800, 10],
        duration: 600
    });
}


// Class helper functions
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}

/* -----------------------------------------
-- Debug
------------------------------------------*/

function addFixedLeft(num) {
    if (!hasClass(document.body, "holdreel1")) {
        stopLocations1 = stopLocations[num] + defaultSpin - 6;
        Velocity(reel1, {
            rotateX: [stopLocations1, 0 + laststopLocations1],
        }, {
            easing: "linear",
            duration: 2000,
            complete: function (elements) {
                thisReelEnd = stopLocations1;
            }
        });
        laststopLocations1 = stopLocations1 - defaultSpin + 6;
        console.log(laststopLocations1);
    }
}

function addFixedCenter(num) {
    if (!hasClass(document.body, "holdreel2")) {
        stopLocations2 = stopLocations[num] + defaultSpin - 6;
        Velocity(reel2, {
            rotateX: [stopLocations2, 0 + laststopLocations2],
        }, {
            easing: "linear",
            duration: 2500,
            complete: function (elements) {
                thisReelEnd = stopLocations2;
                reelWobble(elements, thisReelEnd);
            }
        });
        laststopLocations2 = stopLocations2 - defaultSpin + 6;
        console.log(laststopLocations2);
    }
}


function addFixedRight(num) {
    if (!hasClass(document.body, "holdreel3")) {
        stopLocations3 = stopLocations[num] + defaultSpin - 6;
        Velocity(reel3, {
            rotateX: [stopLocations3, 0 + laststopLocations3],
        }, {
            easing: "linear",
            duration: 3000,
            complete: function (elements) {
                thisReelEnd = stopLocations3;
                reelWobble(elements, thisReelEnd);
            }
        });
        laststopLocations3 = stopLocations3 - defaultSpin + 6;
        console.log(laststopLocations3);
    }
}

function singleSelectChangeValueLeft(selValue) {
    //Getting Value
    //var selValue = document.getElementById("singleSelectDD").value;
    var selObj = document.getElementById("symbol-reel1");
    var selValue = selObj.options[selObj.selectedIndex].value;
    //Setting Value
    return selValue;
}

function positionChangeValueLeft(posValue) {
    //Getting Value
    var posObj = document.getElementById("position-reel1");
    var posValue = posObj.options[posObj.selectedIndex].value;
    //Setting Value
    return posValue;
}


function singleSelectChangeValueCenter(selValue) {
    //Getting Value
    //var selValue = document.getElementById("singleSelectDD").value;
    var selObj = document.getElementById("symbol-reel2");
    var selValue = selObj.options[selObj.selectedIndex].value;
    //Setting Value
    return selValue;
}

function positionChangeValueCenter(posValue) {
    //Getting Value
    var posObj = document.getElementById("position-reel2");
    var posValue = posObj.options[posObj.selectedIndex].value;
    //Setting Value
    return posValue;
}

function singleSelectChangeValueRight(selValue) {
    //Getting Value
    //var selValue = document.getElementById("singleSelectDD").value;
    var selObj = document.getElementById("symbol-reel3");
    var selValue = selObj.options[selObj.selectedIndex].value;
    //Setting Value
    return selValue;
}

function positionChangeValueRight(posValue) {
    //Getting Value
    var posObj = document.getElementById("position-reel3");
    var posValue = posObj.options[posObj.selectedIndex].value;
    //Setting Value
    return posValue;
}

function getFixedLeft() {
    if (singleSelectChangeValueLeft(selValue) === "CHERRY") {
        if (positionChangeValueLeft(posValue) === "top") {
            addFixedLeft(10);
        } else if (positionChangeValueLeft(posValue) === "center") {
            addFixedLeft(9);
        } else if (positionChangeValueLeft(posValue) === "bottom") {
            addFixedLeft(8);
        }
    } else if (singleSelectChangeValueLeft(selValue) === "3xBAR") {
        if (positionChangeValueLeft(posValue) === "top") {
            addFixedLeft(11);
        } else if (positionChangeValueLeft(posValue) === "center") {
            addFixedLeft(10);
        } else if (positionChangeValueLeft(posValue) === "bottom") {
            addFixedLeft(9);
        }
    } else if (singleSelectChangeValueLeft(selValue) === "7") {
        if (positionChangeValueLeft(posValue) === "top") {
            addFixedLeft(9);
        } else if (positionChangeValueLeft(posValue) === "center") {
            addFixedLeft(8);
        } else if (positionChangeValueLeft(posValue) === "bottom") {
            addFixedLeft(7);
        }
    } else if (singleSelectChangeValueLeft(selValue) === "2xBAR") {
        if (positionChangeValueLeft(posValue) === "top") {
            addFixedLeft(8);
        } else if (positionChangeValueLeft(posValue) === "center") {
            addFixedLeft(7);
        } else if (positionChangeValueLeft(posValue) === "bottom") {
            addFixedLeft(6);
        }
    } else if (singleSelectChangeValueLeft(selValue) === "BAR") {
        if (positionChangeValueLeft(posValue) === "top") {
            addFixedLeft(7);
        } else if (positionChangeValueLeft(posValue) === "center") {
            addFixedLeft(6);
        } else if (positionChangeValueLeft(posValue) === "bottom") {
            addFixedLeft(5);
        }
    }
}

function getFixedCenter() {
    if (singleSelectChangeValueCenter(selValue) === "CHERRY") {
        if (positionChangeValueCenter(posValue) === "top") {
            addFixedCenter(8);
        } else if (positionChangeValueCenter(posValue) === "center") {
            addFixedCenter(7);
        } else if (positionChangeValueCenter(posValue) === "bottom") {
            addFixedCenter(6);
        }
    } else if (singleSelectChangeValueCenter(selValue) === "3xBAR") {
        if (positionChangeValueCenter(posValue) === "top") {
            addFixedCenter(9);
        } else if (positionChangeValueCenter(posValue) === "center") {
            addFixedCenter(8);
        } else if (positionChangeValueCenter(posValue) === "bottom") {
            addFixedCenter(7);
        }
    } else if (singleSelectChangeValueCenter(selValue) === "7") {
        if (positionChangeValueCenter(posValue) === "top") {
            addFixedCenter(7);
        } else if (positionChangeValueCenter(posValue) === "center") {
            addFixedCenter(6);
        } else if (positionChangeValueCenter(posValue) === "bottom") {
            addFixedCenter(5);
        }
    } else if (singleSelectChangeValueCenter(selValue) === "2xBAR") {
        if (positionChangeValueCenter(posValue) === "top") {
            addFixedCenter(6);
        } else if (positionChangeValueCenter(posValue) === "center") {
            addFixedCenter(5);
        } else if (positionChangeValueCenter(posValue) === "bottom") {
            addFixedCenter(4);
        }
    } else if (singleSelectChangeValueCenter(selValue) === "BAR") {
        if (positionChangeValueCenter(posValue) === "top") {
            addFixedCenter(5);
        } else if (positionChangeValueCenter(posValue) === "center") {
            addFixedCenter(4);
        } else if (positionChangeValueCenter(posValue) === "bottom") {
            addFixedCenter(3);
        }
    }
}

function getFixedRight() {
    if (singleSelectChangeValueRight(selValue) === "CHERRY") {
        if (positionChangeValueRight(posValue) === "top") {
            addFixedRight(6);
        } else if (positionChangeValueRight(posValue) === "center") {
            addFixedRight(5);
        } else if (positionChangeValueRight(posValue) === "bottom") {
            addFixedRight(4);
        }
    } else if (singleSelectChangeValueRight(selValue) === "3xBAR") {
        if (positionChangeValueRight(posValue) === "top") {
            addFixedRight(7);
        } else if (positionChangeValueRight(posValue) === "center") {
            addFixedRight(6);
        } else if (positionChangeValueRight(posValue) === "bottom") {
            addFixedRight(5);
        }
    } else if (singleSelectChangeValueRight(selValue) === "7") {
        if (positionChangeValueRight(posValue) === "top") {
            addFixedRight(5);
        } else if (positionChangeValueRight(posValue) === "center") {
            addFixedRight(4);
        } else if (positionChangeValueRight(posValue) === "bottom") {
            addFixedRight(3);
        }
    } else if (singleSelectChangeValueRight(selValue) === "2xBAR") {
        if (positionChangeValueRight(posValue) === "top") {
            addFixedRight(4);
        } else if (positionChangeValueRight(posValue) === "center") {
            addFixedRight(3);
        } else if (positionChangeValueRight(posValue) === "bottom") {
            addFixedRight(2);
        }
    } else if (singleSelectChangeValueRight(selValue) === "BAR") {
        if (positionChangeValueRight(posValue) === "top") {
            addFixedRight(3);
        } else if (positionChangeValueRight(posValue) === "center") {
            addFixedRight(2);
        } else if (positionChangeValueRight(posValue) === "bottom") {
            addFixedRight(1);
        }
    }
}

function setFixed() {
    /* initializeReels(); */
    getFixedLeft();
    getFixedCenter();
    getFixedRight();
}

var checkbox = document.querySelector("#switchDebug");
var input = document.querySelector("#symbol-reel1");
var input2 = document.querySelector("#symbol-reel2");
var input3 = document.querySelector("#symbol-reel3");
var position = document.querySelector("#position-reel1");
var position2 = document.querySelector("#position-reel2");
var position3 = document.querySelector("#position-reel3");

var toggleInput = function (e) {
    input.disabled = !e.target.checked;
    input2.disabled = !e.target.checked;
    input3.disabled = !e.target.checked;
    position.disabled = !e.target.checked;
    position2.disabled = !e.target.checked;
    position3.disabled = !e.target.checked;
    debug = e.target.checked;
};

toggleInput({
    target: checkbox
});
checkbox.addEventListener("change", toggleInput);