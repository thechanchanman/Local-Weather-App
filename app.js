// if (window.location.protocol !== 'https:') {
// 	$(".box").html("<p>In order to run the Weather app you have to establish a secure connection." + "</p><p>" + "Add 'https://' before 'codepen.io/....'" + "</p>").addClass("error");
// }

var imageUrl = "https://source.unsplash.com/featured/";
var imageTag = "sun";
var imageQuery = "?" + imageTag;

$(".wrapper").css({
	"background": "url('" + imageUrl + imageQuery + "')",
	"background-size": "cover",
	"background-repeat": "no-repeat"
});
