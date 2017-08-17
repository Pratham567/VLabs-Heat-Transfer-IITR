$(document).ready(function(){
    $("input").focus(function(){
        $(this).css("background-color", "#cccccc");
    });
    $("input").blur(function(){
        $(this).css("background-color", "#ffffff");
    });
});

var v1;

function properties(){
    var sh_cold , sh_hot, d_cold , d_hot ;

    sh_cold = document.getElementById("sh_cold").value ;
    sh_hot = document.getElementById("sh_hot").value ;
    d_cold = document.getElementById("d_cold").value ;
    d_hot = document.getElementById("d_hot").value ;

    v1 = d_hot;
}

function output(){
    document.getElementById("out").innerHTML = v1;
}