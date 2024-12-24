const digit = [
    [0x0, 0x78, 0xfc, 0x1ce, 0x186, 0x387, 0x303, 0x303, 0x303, 0x303, 0x387, 0x186, 0x1ce, 0xfc, 0x78, 0x0],
    [0x0, 0x20, 0x70, 0x1f0, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x0],
    [0x0, 0x78, 0x1fe, 0x186, 0x303, 0x303, 0x3, 0x6, 0xc, 0x18, 0x70, 0xc0, 0x180, 0x3ff, 0x3ff, 0x0],
    [0x0, 0x1ff, 0x1ff, 0x6, 0xc, 0x18, 0x38, 0xc, 0x6, 0x3, 0x303, 0x303, 0x387, 0x1fe, 0x78, 0x0],
    [0x0, 0xc, 0x1c, 0x1c, 0x3c, 0x6c, 0xcc, 0xcc, 0x18c, 0x3ff, 0x3ff, 0xc, 0xc, 0xc, 0xc, 0x0],
    [0x0, 0x1ff, 0x1ff, 0x180, 0x180, 0x378, 0x3fe, 0x386, 0x3, 0x3, 0x3, 0x303, 0x306, 0x1fe, 0xf8, 0x0],
    [0x0, 0x1c, 0x7c, 0xe0, 0x180, 0x180, 0x378, 0x3fe, 0x387, 0x303, 0x303, 0x303, 0x387, 0x1fe, 0x78, 0x0],
    [0x0, 0x3ff, 0x3ff, 0x6, 0x6, 0xc, 0x18, 0x18, 0x60, 0x60, 0x60, 0xc0, 0xc0, 0xc0, 0xc0, 0x0],
    [0x0, 0xfc, 0x1fe, 0x387, 0x303, 0x303, 0x186, 0xfc, 0xfc, 0x186, 0x303, 0x303, 0x387, 0x1fe, 0xfc, 0x0],
    [0x0, 0x78, 0x1fe, 0x387, 0x303, 0x303, 0x303, 0x387, 0x1ff, 0x7b, 0x6, 0x6, 0x1c, 0xf8, 0xe0, 0x0]
];


function printNum(digitPrt) {
    var digitPrtOpt = "";
    for (let i = 0; i < 16; i++) {
        var digitPrtOptLine = "";
        for (let j = 0; j < 16 * 4; j++) {
            if (digitPrt[i][j] == 1) {
                digitPrtOptLine = digitPrtOptLine + "<div class='" + "red" + "-on'></div>";
            } else {
                digitPrtOptLine = digitPrtOptLine + "<div class='" + "red" + "-off'></div>";
            }
        }
        digitPrtOpt = digitPrtOpt + "<div class='line'>" + digitPrtOptLine + "</div>";
    }
    document.getElementById("numOpt").innerHTML = digitPrtOpt;
}

function formatDigit(digitArray) {
    var digitEach = [];
    for (let i = 0; i < digitArray.length; i++) {
        var digitOne = [];
        for (let j = 0; j < 16; j++) {
            var digitLine = digit[digitArray[i]][j].toString(2).split("").map(Number);
            const digitLineLength = digitLine.length;
            if (digitLineLength < 10) {
                for (let k = 0; k < 10 - digitLineLength; k++) {
                    digitLine.unshift(0);
                }
            }
            digitOne.push(digitLine);
        }
        digitEach.push(digitOne);
    }
    return(digitEach);
}

function numOut(digitIn) {
    digitIn = digitIn.split("").map(Number);
    console.log(digitIn);
    var numOut = [];
    if (digitIn.length == 0) {
        for (let i = 0; i < 16; i++) {
            var numOutLine = [];
            for (let j = 0; j < 16 * 4; j++) {
                numOutLine.push(0);
            }
            numOut.push(numOutLine);
        }
    } else {
        var digitEach = formatDigit(digitIn);
        for (let i = 0; i < 16; i++) {
            var numOutLine = [];
            numOutLine = digitEach[0][i];
            if (digitEach.length > 4) {
                const digitEachLength = digitEach.length;
                for (let j = 0; j < digitEachLength - 1; j++) {
                    numOutLine = numOutLine.concat([0,0,0]).concat(digitEach[j + 1][i]);
                }
            } else if (digitEach.length > 1) {
                const digitEachLength = digitEach.length;
                for (let j = 0; j < digitEachLength - 1; j++) {
                    numOutLine = numOutLine.concat([0,0,0,0,0,0]).concat(digitEach[j + 1][i]);
                }
            }
            const numOutLineLength = numOutLine.length;
            for (let j = 0; j < (16 * 4 - numOutLineLength) / 2; j++) {
                numOutLine.unshift(0);
                numOutLine.push(0);
            }
            numOut.push(numOutLine);
        }
    }
    printNum(numOut);
}

function numIptOn() {
    var numIpt = document.getElementById("numIpt").value;
    if (numIpt != "") {
        var numIptMatch = numIpt.match(/\d{1,5}/g);
        if (numIptMatch == null) {
            numIpt = "";
        } else {
            numIpt = numIptMatch[0];
        }
        document.getElementById("numIpt").value = numIpt;
    }
    numOut(numIpt);
}

numIptOn()

// var digitArray = digits[numOut[0]][i].toString(2).split("").map(Number);
// if (digitArray[j - 16 + 3 + digitArray.length] == 1) {
//     lineOpt = lineOpt + "<div class='" + "yellow" + "-on'></div>";
// } else {
//     lineOpt = lineOpt + "<div class='" + "yellow" + "-off'></div>";
// }

function clearNumIpt() {
    document.getElementById("numIpt").value = "";
}