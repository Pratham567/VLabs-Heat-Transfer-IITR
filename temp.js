/**
 * Created by pratham on 3/7/17.
 */

// Check if a variable inside function takes global value or not.
    // Ans. Yes, it takes.
// Also check if it overwrites global one or not.
    // Ans. Yes it overwrites.
// Can we use numbers as variable name.
// to check if a variable using another variable works if that secondary var is specified in function.
    //Ans.  No it doesn't work.

var a,b,c,d,e,f;
a = 10;
b = 20;
c = 30;
e = f;


/*function f1 () {
    document.getElementById("a").value = a;
    document.getElementById("b").value = b;
    document.getElementById("c").value = 30;

    f = document.getElementById("c").value;
    a = 11;
    // f = 60;
}


function f2 () {
    document.getElementById("c").value = document.getElementById("b").value;
    document.getElementById("d").value = a;
    document.getElementById("e").value = f;

}*/

function roundoff4(){
    a = 32.123123;
    a = (Math.round(a*Math.pow(10,2)))/Math.pow(10,2);
    document.getElementById("a").value = a;
    document.getElementById("a").value = a;
    document.getElementById("b").value = b;
    document.getElementById("c").value = c;
    d = b+c;
    document.getElementById("d").value = d;
}