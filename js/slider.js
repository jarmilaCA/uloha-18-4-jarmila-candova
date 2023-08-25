let mySliderSpeed = 7500;
let myFadeSpeed = 200;

function nasledujuci_slide() {
    $(".slide").last().fadeOut(Slider.fadeSpeed, function () {
        $(this).prependTo("#slider").show();
        $(".slide").first().find(".pozadie").removeClass("zoom");
        $(".slide").last().find(".pozadie").addClass("zoom");
    });
}

let Slider = {
    intID: null,
    sliderSpeed: mySliderSpeed,
    fadeSpeed: myFadeSpeed,
    start: function () {
        if (this.intID == null) {
            this.intID = setInterval(function () {
                sliderProgressBarStop();
                nasledujuci_slide();
                sliderProgressBarStart();
            }, this.sliderSpeed)
        }
    },
    stop: function () {
        clearInterval(this.intID);
        this.intID = null;
        sliderProgressBarStop();
    },
    toggle: function () {
        if (this.intID == null) {
            this.start()
        } else {
            this.stop()
        }
        sliderProgressBarStop();
    }
}

Slider.sliderSpeed = mySliderSpeed;
Slider.fadeSpeed = myFadeSpeed;

// ked sa mi nacita stranka
Slider.start();
$(".slide").last().find(".pozadie").addClass("zoom");
$(".slider_indicator").addClass("slider_indicator_full");

$(".sipka").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    Slider.stop();
    if ($(this).is($(".sipka:first-of-type"))) {
        $(".slide").first().hide().appendTo("#slider").fadeIn(Slider.fadeSpeed, function () {
            $(".slide").last().prev().find(".pozadie").removeClass("zoom");
            $(".slide").last().find(".pozadie").addClass("zoom");
        });
    } else {
        nasledujuci_slide();
    }
    Slider.start();
    sliderProgressBarStart();
})

function sliderProgressBarStart() {
    $(".slider_indicator").removeClass("notransition");
    setTimeout(() => {
        $(".slider_indicator").addClass("slider_indicator_full");
    }, 100)
}

function sliderProgressBarStop() {
  $(".slider_indicator").addClass("notransition");//
        $(".slider_indicator").removeClass("slider_indicator_full");
}

