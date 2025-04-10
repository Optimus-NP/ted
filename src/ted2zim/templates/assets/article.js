$.urlParam = function(name){
    var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
};

// Function to retrieve the stored language
function getStoredLanguage() {
    return storage.getItem('selectedLanguage') || $.urlParam('lang');
}

window.onload = function() {
    var lang = getStoredLanguage();
    if (lang && lang !== "undefined") {
        document.getElementById("title-head").innerHTML = $("p.title.lang-" + lang).text();
        $(".lang-default").css("display", "none");
        $(".lang-" + lang).css("display", "block");

        // Initialize the video player and enable subtitles for the selected language
        videojs("ted-video").ready(function () {
            const player = this;
            player.ready(() => {
                const textTracks = player.textTracks();
                // Iterate over all text tracks using a lambda expression
                Array.from(textTracks).forEach(t => {
                    // If the track's language matches the selected language, show it
                    // Otherwise, disable the subtitle track
                    t.mode = (t.language === lang) ? 'showing' : 'disabled';
                });
            });
        });
    }
};

$(document).ready(function() {
    $("#backtolist").on("click", function() { history.go(-1) });
});

