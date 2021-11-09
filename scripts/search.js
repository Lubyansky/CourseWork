$('#searchInput').keydown(function(e) {
    if(e.keyCode === 13) {
        var value = $("#searchInput").val();
        $("#searchInput").val("");
        console.log("Clicked", value);
    }
});