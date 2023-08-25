"use strict";

//prepinac stylov
let x_prepinac = document.getElementById("x_prepinac")
let prepinac_stylov = document.getElementById("prepinac_stylov")
let koleso_prepinac = document.getElementById("koleso_prepinac")
let body = document.querySelector("#body")

koleso_prepinac.addEventListener("click", vysun_prepinac)

function vysun_prepinac(event) {
	event.preventDefault();
	prepinac_stylov.style.transform = ("translate(0,-50%)");
}

x_prepinac.addEventListener("click", zasun_prepinac)

function zasun_prepinac(event) {
	event.preventDefault();
	prepinac_stylov.style.transform = "translate(-100%,-50%)";
}

//kvapky
let kvapky = document.querySelectorAll("#farby a")

for (let kvapka of kvapky) {
	let farba = kvapka.getAttribute("href")
	kvapka.style.color = kvapka.getAttribute("href")
	kvapka.style.color = farba

	kvapka.addEventListener("click", function (evt) {
		evt.preventDefault();
		body.style.setProperty("--farebny", farba);
		dizajn_data.farebnost = farba;
		uloz_data();
	})
}

let kruhy = document.querySelectorAll("#kruhy a");
let kruh
let dizajn_kruh
let farba_kruh

for (let kruh of kruhy) {
	let farba_kruh = kruh.getAttribute("href")
	kruh.style.color = kruh.getAttribute("href")
	kruh.style.color = farba_kruh

	kruh.addEventListener("click", function (evt) {
		evt.preventDefault();
		body.style.setProperty("--kruh", farba_kruh);
		dizajn_kruh = farba_kruh;
		body.style.backgroundColor = farba_kruh
		console.log(farba_kruh);
		uloz_pozadie(farba_kruh);
	})
}

function uloz_pozadie(pozadie) {
	let posielam_pozadie = JSON.stringify(pozadie);
	localStorage.setItem("pozadie_data",posielam_pozadie);
}

let vybrane_pozadie = localStorage.getItem("pozadie_data");
vybrane_pozadie = JSON.parse(vybrane_pozadie);
body.style.backgroundColor = vybrane_pozadie;


//
let input_svetle = document.querySelector('input[value="svetle"]')
let input_tmave = document.querySelector('input[value="tmave"]')

input_svetle.addEventListener("click", function() {
	body.style.setProperty('--ciernobiely', "#efefef");
	body.style.setProperty('--velmitmava', "#fff");
	body.style.setProperty('--farba_font', "#000");
	body.style.setProperty('--stisena', "#6e6e6e");
	dizajn_data.ciernobielost = "svetle";
	uloz_data();
})

input_tmave.addEventListener("click", function() {
	body.style.setProperty('--ciernobiely', "#242424");
	body.style.setProperty('--velmitmava', "#151515");
	body.style.setProperty('--farba_font', "#fff");
	body.style.setProperty('--stisena', "#ccc");
	dizajn_data.ciernobielost = "tmave";
	uloz_data();
})

// nastavujeme dizajn
let dizajn_data;
let vybrana_polozka = localStorage.getItem("dizajn_data");
vybrana_polozka = JSON.parse(vybrana_polozka);

if (vybrana_polozka) {
	body.style.setProperty('--farebny', vybrana_polozka.farebnost);

	if (vybrana_polozka.ciernobielost == "svetle") {
		body.style.setProperty('--ciernobiely', "#efefef");
		body.style.setProperty('--velmitmava', "#fff");
		body.style.setProperty('--farba_font', "#000");
		body.style.setProperty('--stisena', "#6e6e6e");
	}
	else {
		body.style.setProperty('--ciernobiely', "#242424");
		body.style.setProperty('--velmitmava', "#151515");
		body.style.setProperty('--farba_font', "#fff");
		body.style.setProperty('--stisena', "#ccc");
	}

	document.querySelector('html').style.fontSize = vybrana_polozka.font;
	document.querySelector('input[value="'+vybrana_polozka.ciernobielost+'"]').checked = true;
	document.querySelector('option[value="'+vybrana_polozka.font+'"]').selected = "selected";

	dizajn_data = {
		farebnost: vybrana_polozka.farebnost,
		ciernobielost: vybrana_polozka.ciernobielost,
		font: vybrana_polozka.font
	}
}

//prepinac fontu
let prepinac_fontu = document.querySelector('#prepinac_fontu select');
prepinac_fontu.addEventListener("change", function() {
	document.querySelector('html').style.fontSize = prepinac_fontu.value;
})

dizajn_data = { 
	farebnost: "#daa520",
	ciernobielost: "tmave",
	font: "16px"
}

function uloz_data() {
	let posielam_data = JSON.stringify(dizajn_data);
	localStorage.setItem("dizajn_data",posielam_data);
}

//mobil_menu
$(".mobil_menu").click(function(evt){
	evt.preventDefault()
	$(".mobil_menu").toggleClass("otvorene_menu")
	console.log(this)
})

//accordion
let acc = document.getElementsByClassName("accordion_header");
let icon = document.getElementsByClassName("accordion_icon");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let accordion_content = this.nextElementSibling;

   if (accordion_content.style.maxHeight) {
      accordion_content.style.maxHeight = null;
    } else {
      accordion_content.style.maxHeight = accordion_content.scrollHeight + "px";
    } 

  });
}

//formulár
$("form").append($('<p class="error"></p>'));
let element_novy = $("<p>", {class: "error", id: "chybova_hlaska"})
let cislo = $("<p>", {class: "cislo_error", id: "cislo_chybova_hlaska"})

$("form button").click(function(e) {
	e.preventDefault();
	let chyby = "VYPLŇTE";
	let zobrazit = false;
	let data = $(this).parents("form").find("[placeholder]");
	let error_ele = $(this).parents("form").find(".error");

	for (let info of data) {
		if (info.value == "") {
			chyby += "<br>- "+ info.getAttribute("placeholder");
			zobrazit = true;
		}
	}
	if (zobrazit) { error_ele.html(chyby) }
	else {error_ele.html("")}	
})

$("form button").click(function hladaj() {
	let hladaj = document.getElementById("email").value;
	let cislo = document.getElementById("phone").value;

	if (cislo.startsWith("0")) {
		let edit_number = cislo.split("9");
		
		let final_number = "+4219" + edit_number[1];
		document.getElementById("phone").value = final_number
	}
	
	if (hladaj) {

	let zavinac = hladaj.includes("@");
	let format = hladaj.split("@")[1];
	let bodka = false;

	if(format) {
		bodka = format.includes(".");
	}

	if (!bodka || !zavinac) {
		document.getElementById("hlasenie").innerHTML=("Zadajte email v správnom formáte.");
	}
  	else {
		document.getElementById("hlasenie").innerHTML=("");
	}
	}
})

//progress bar
let indicator = document.querySelector(".indicator");
let documentHeight = document.documentElement.scrollHeight;
let viewportHeight = document.documentElement.clientHeight;

window.onscroll = function() {
	let percentageScrolled = (scrollY/(documentHeight-viewportHeight))*100;
	indicator.style.width = percentageScrolled + "%";//
}

// Slider
let slider = function () {
  let slides = document.querySelectorAll('.recenzia_slide');
  let btnLeft = document.querySelector('.slider__btn--left');
  let btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  let maxSlide = slides.length;

  let goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  let nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  let prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  let init = function () {
    goToSlide(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};
slider();

// jQuery:
let win = $(window);
let od_vrchu;
const header = $("header");
const nav_a = $("header nav a");


win.scroll(function() {
	od_vrchu = Math.round(win.scrollTop());

	if (od_vrchu > 1) {
		header.attr("id", "header_pozadie");
	}
	else {
		header.attr("id", "");
	}

	jQuery.each(pozicie_ele, function(index, item) {
		if (od_vrchu > item.ele_odvrchu && od_vrchu < item.ele_pospodok) {
			nav_a.removeClass("aktivne")
			nav_a.eq(index).addClass("aktivne");
		}
		else if (od_vrchu < pozicie_ele[0].ele_odvrchu) {
			nav_a.removeClass("aktivne")
		}
	})
})

let pozicie_ele = []

function pozicie_elementov() {
	nav_a.each(function(index, item) {
		let sekcia = $(item.hash);
		const ele_poz = {
			ele_odvrchu: Math.round(sekcia?.offset()?.top),
			ele_pospodok: Math.round(sekcia?.offset()?.top) + Math.round(sekcia.height())
		}
		pozicie_ele.push(ele_poz);
	})
}

$(window).resize(function () {
	pozicie_ele = [];
	pozicie_elementov();
});

pozicie_elementov();

// parallax
function parallax(ele, rychlost_y = 0.7, rychlost_x = 1) {
	let x = para_x * rychlost_x;

	ele = $(ele);
	let po_spodok = od_vrchu + window.innerHeight;
	let ele_po_spodok =  Math.round(ele?.offset()?.top + ele.height());
	let y = (po_spodok - ele_po_spodok)*rychlost_y;
	ele.css("transform", "translate("+x+"px, "+y+"px)");
}

let para_x = 0;
$("#parallax").mousemove(function(evt) {
	let sirka_okna = $("body").width() // $("body").css("width")
	let polka = sirka_okna / 2;
	let myska_x = evt.clientX - polka;
	para_x = Math.round(myska_x / 5) // 20%

	cely_paralax()
})

win.scroll(function() {
	cely_paralax()
})

function cely_paralax() {
	parallax("#para_hora", 0.1, 0.3);
	parallax("#stromceky_druhe", 0.3, 0.5);
	parallax("#stromceky_prve", 0.2, 0.6);
	parallax("#para_dom", undefined, 0.8);
	parallax("#para_tabula", -0.2);
	parallax("#para_trava", -0.2);
}

function createStars(type, quantity) {
    for (let i = 0; i<quantity; i++) {
    	let parallax = document.getElementById("parallax")
        let star = document.createElement('img');
        star.classList.add('star', `type-${type}`);
        star.style.left = `${randomNumber(1, 99)}%`;
        star.style.bottom = `${randomNumber(1, 99)}%`;
        parallax.prepend(star);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}
     
createStars(1, 50);
createStars(2, 50);
createStars(3, 40);
createStars(4, 30);

// taby
function taby(a) {
	let id = a.attr("href");
	let p = $(id);
	a.addClass("aktivne").siblings().removeClass("aktivne");
	// p.parent().height(p.height());
	p.fadeIn().siblings().fadeOut();
}

$(".taby nav a").on("click mouseenter", function(evt) {
	evt.preventDefault();
	taby($(this));
})
taby($(".taby nav .aktivne"));
maxOfTabs();

function maxOfTabs() {
	let children = $(".taby_tabs").children();
	let heights = [];
	for(i=0; i<children.length; i++) {
		heights.push(children[i].offsetHeight)
	}
	let max = Math.max(...heights);
	$(".taby_tabs").height(max);
}

// galéria lightbox
let img_lightbox = $("#lightbox_pre_img img");
let lightbox_pre_img = $("#lightbox_pre_img");
let p_lightbox_pre_img = $(".oznam1");
let fotky;
let titles;
let fotky_pozicia = 0;
let oznam = $(".oznam2");
let door = $("#images img");

$("#images .titulka").on("click", function(e) {
	e.preventDefault();

	fotky_pozicia = 0;

	fotky = $(this).data("fotky");
	titles = $(this).data("title");
	console.log(titles);
	img_lightbox.attr("src", fotky[0]);

	lightbox_pre_img.fadeIn(500);
	p_lightbox_pre_img.text(fotky_pozicia+1+"/"+fotky.length);
	oznam.text(titles[fotky_pozicia]);
})

lightbox_pre_img.click(function() {
	lightbox_pre_img.fadeOut(500);
})

$(".sipky").click(function(e) {
	e.preventDefault();
	e.stopPropagation();
})

function lightbox_doprava() {
	if (fotky[fotky_pozicia+1]) {
		fotky_pozicia++;
	}
	else {
		fotky_pozicia = 0;
	}
	img_lightbox.attr("src", fotky[fotky_pozicia]);
	p_lightbox_pre_img.text(fotky_pozicia+1+"/"+fotky.length);
	oznam.text(titles[fotky_pozicia]);
}
function lightbox_dolava() {
	if (fotky[fotky_pozicia-1]) {
		fotky_pozicia--;
	}
	else {
		fotky_pozicia = fotky.length-1;
	}
	img_lightbox.attr("src", fotky[fotky_pozicia]);
	p_lightbox_pre_img.text(fotky_pozicia+1+"/"+fotky.length);
	oznam.text(titles[fotky_pozicia]);
}

$(".sipka2").click(function() {
	lightbox_doprava();
})
$(".sipka1").click(function() {
	lightbox_dolava();
})

$( function() {
    $( "#draggable" ).draggable({ revert: "valid" });
    $( "#draggable2" ).draggable({ revert: "invalid" });
 
    $( "#droppable" ).droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  } );



let items;
//const data = items[0].json

//const key = Object.keys(data)[0]

//console.log(data)

$("button").click(function(){
  $.getJSON("https://happycoding.io/tutorials/javascript/example-ajax-files/random-welcomes.json", function(result){
  	console.log(result);
    $.each(result, function(i, field){
      $("#dalsia_uloha").append(`<p class="jsonTexty" style="color: ` + field.color + `">` + field.text + `</p>`);
    });
  });
});

// preloader
$(document).ready(function() {
	$("#preloader").fadeOut(600)
})