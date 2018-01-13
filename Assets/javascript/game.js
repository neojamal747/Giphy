var buttonIndex = 0;
function insertButton(text){
    var buttonTypes = ["success", "info", "warning", "danger"];
    if (text){
        var gifButton = "<button type='button' class='btn btn-block gifButton btn-" + buttonTypes[buttonIndex] +  "'>" + text + "</button>";
        $("#buttonDiv").prepend(gifButton);
        buttonIndex++;
    }
    if(buttonIndex > 3){buttonIndex = 0}
}

var buttonArray = ["Bugs Bunny", "Tom and Jerry", "Road Runner"]
var search = $("#searchBox").val();

for (var i =0; i<buttonArray.length; i++){
    insertButton(buttonArray[i]);
}

$(".btn-primary").on('click', function(){
    var buttonText = $("#searchForm").val();
    insertButton(buttonText);
    return false;

})

$(".container").on("click", ".gifButton", function() {
	var selectedGif = $(this).text();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedGif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $("#gifsDiv").empty();

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response){

        console.log("queryURL: " + queryURL);
        console.log("response: " + response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
        	var animate = results[i].images.fixed_height.url;
        	var still = results[i].images.fixed_height_still.url;
        	var gifBox = $("<div class ='thumbnail'>");
        	var gifImg = $("<img>").attr({
                "src": still,
                "class": "gifImg"
            });
        	var rating = $("<p class = 'caption'>").text("Rating: " + results[i].rating);

            gifImg.data({
                "animate": animate,
                "still": still,
                "state": true
            });

            gifBox.append(gifImg);
            gifBox.append(rating);

      		$("#gifsDiv").prepend(gifBox);
        }         
    })
});

$(".container").on("click", ".gifImg", function(){
    var state = $(this).data('state');
    console.log(".gifImg click");
    console.log(state);

    if (state){
        $(this).attr("src", $(this).data("animate"));
        $(this).data("state", false);
    }

    else{
        $(this).attr("src", $(this).data("still"));
        $(this).data("state", true);
    }
});


