var visible = 0;
setInterval(
    function showImagenes() {
        var longitut = document.getElementsByClassName("misImagenes").length
        var longitut = document.getElementsByClassName("misImagenes").length
        if (visible == longitut) {
            visible = 0;
        }
        for (let i = 0; i < longitut; i++) {
            if (i != visible) {
                document.getElementsByClassName("misImagenes")[i].classList.add("amagat");
            } else {
                document.getElementsByClassName("misImagenes")[i].classList.remove("amagat");
            }
        }
        visible++;
    }
    , 3000);
