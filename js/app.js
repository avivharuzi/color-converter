"use strict";

$(function () {
	setColorByKeyUp();
	setRandomColorsByClick();
	setCopyButtonClicks();
	$("#random").click();
});

function setCopyButtonClicks() {
	$(".btn-copy").on("click", function () {
		let text = $(this).prev().text();
		copyToClipboard(text);
		Materialize.toast('COPIED', 2000)
	});
}

function setColorByKeyUp() {
	$("#color").on("keyup", function() {
		setColors($(this).val());
	});
}

function setRandomColorsByClick() {
	$("#random").on("click", function () {
		let hex = getRandomHexColor();
		setColors(hex);
	});
}

function getColorName(hex) {
    let match  = ntc.name(hex);
    return match[1];
}

function getRandomHexColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

function copyToClipboard(text) {
	let aux = document.createElement("input");
	aux.setAttribute("value", text);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
}

function setColors(value) {
	let color, name, rgb, hex, hsl, hwb, cmyk, ncol;

	color = w3color(value);

	if (color.valid) {
		$("#message").hide();
		$("#mainColorRow").show();

		name = color.toName();
		hex = color.toHexString();
		cmyk = color.toCmykString();
		ncol = color.toNcolString();

		if (name === "") {
			name = getColorName(hex);
		}

		if (color.opacity === 1) {
			rgb = color.toRgbString();
			hsl = color.toHslString();
			hwb = color.toHwbString();
		} else {
			rgb = color.toRgbaString();
			hsl = color.toHslaString();
			hwb = color.toHwbaString();
		}

		$("#name").html(name);
		$("#hex").html(hex);
		$("#cmyk").html(cmyk);
		$("#ncol").html(ncol);
		$("#rgb").html(rgb);
		$("#hsl").html(hsl);
		$("#hwb").html(hwb);

		$("body").css("background", hex);
	} else {
		if (value.length > 3) {
			$("#message").show();
			$("#mainColorRow").hide();
		}
	}
}
