$(function(){
    $("form").submit(function(){
        const data = {
            name: $("#Player_Name").val(),
            icon: $("#Player_Icon").val(),
            level: $("#Player_Level").val()
        }
        console.log("Name: " + data.name + " Icon: " + data.icon + " Level: " + data.level)
        $.post( "/api/players/create", data, function( response ) {
            console.log(response);
        });
        

        return false;
    });
    
});









