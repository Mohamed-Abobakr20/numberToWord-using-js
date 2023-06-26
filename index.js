/*

num < 0     >>>>>>>>> negative

num === 0   >>>>>>>>>> "zero"

num === 1000000000   >>>>>>>>>> "one billion"

num > 1000000000   >>>>>>>>>> "over limit"

num < 10    >>>>>>>>> "one" "two" ....

num < 20    >>>>>>>>> "eleven" "twelve" ....

num < 100   >>>>>>>>> "twenty five" ......

num < 1000  >>>>>>>>> "two hundred five"

num < 1_000_000      >>>>>>>>>>> two hundred thousand

num < 1_000_000_000     >>>>>>>>>> 


*/

// get elements

let num = document.getElementById("number");
let word = document.getElementById("word");

num.addEventListener('input', () => {
    if (num.value === "") {
        word.innerHTML = numberToWord(num.value);
    } else {
        word.innerHTML = numberToWord(Number(num.value));
    }
});
// --------------------------------------------------------------------


let oneDigit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
let prefix_1 = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
let prefix_2 = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
let bigNumbers = [" Hundred ", " Thousand ", " Million "];

function numberToWord(n) {
    if (n === "") return "";
    if (n < 0) return "Negative Number";
    if (n === 0) return "Zero";
    if (n === 1000000000) return "One Billion";
    if (n > 1000000000) return "Over Limit";

    let result = convert(n);
    result = result.split(" ");

    if (result.length > 2 && result[result.length - 1] != "") {
        let temp1 = result[result.length - 1];
        let temp2 = result[result.length - 2];
        if (temp1 != "Hundred" && temp1 != "Thousand" && temp1 != "Million") {
            if (prefix_2.includes(temp2)) {
                result[result.length - 2] = "and " + temp2;
            } else {
                result[result.length - 1] = "and " + temp1;

            }

        }

    }

    return result.join(" ") + " only";
}

function convert(n) {
    let result = "";

    if (n < 10) {
        result = oneDigit[n] + " ";
    } else if (n < 20) {
        result = prefix_1[n - 10] + " ";
    } else if (n < 100) {
        result = prefix_2[(n - n % 10) / 10 - 2] + " " + convert(n % 10).trimEnd();
    } else if (n < 1000) {
        result = oneDigit[parseInt(n / 100)] + bigNumbers[0] + convert(n % 100).trimEnd();
    } else if (n < 1000000) {
        result = convert(parseInt(n / 1000)).trimEnd() + bigNumbers[1] + convert(n % 1000).trimEnd();
    } else if (n < 1000000000) {
        result = convert(parseInt(n / 1000000)).trimEnd() + bigNumbers[2] + convert(n % 1000000).trimEnd()
    }

    return result;
}