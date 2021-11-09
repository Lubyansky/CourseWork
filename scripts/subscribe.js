
$('#emailInput').keydown(function(e) {
    if(e.keyCode === 13) {
        var value = $("#emailInput").val();
        $("#emailInput").val("");
        console.log("Clicked", value);
    }
});
$('#button1').click(function() {
    var value = $("#emailInput").val();
    $("#emailInput").val("");
    console.log("Clicked", value);
});

//button1.onclick = function() {
//    var val = document.getElementById('textInput').value;
//    document.getElementById("textInput").value = "";
//    console.log("Clicked", val);
//};