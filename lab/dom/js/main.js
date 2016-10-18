"use strict";

var boxOne = document.getElementById('one'),
	boxTwo = document.getElementById('two'),
	boxThree = document.getElementById('three'),
	boxFour = document.getElementById('four'),
	boxFive = document.getElementById('five'),
	boxSix = document.getElementById('six');

boxOne.addEventListener("click", function() {
	boxOne.classList.add("fade-to-black");
	boxOne.classList.add("black");
});

boxTwo.addEventListener("click", function() {
	boxTwo.classList.add("fall");
});

boxThree.addEventListener("mouseover", function() {
	boxThree.classList.add("toWhite");
    boxThree.classList.add("white");
});

boxThree.addEventListener("mouseout", function() {
	boxThree.classList.add("fade-to-bg-color");
	boxThree.classList.remove("white");
	boxThree.classList.add("grey");
});

boxFour.addEventListener("click", function() {
	boxFour.classList.toggle("fall");
});

boxFive.addEventListener("click", function() {
	var myInterval = setInterval(function() {
		boxFive.style.width = (boxFive.offsetWidth + 5) + "px";
		boxFive.style.height = (boxFive.offsetHeight + 5) + "px";
		if(boxFive.offsetWidth >= 500){
			boxFive.style.display = "none";
			clearInterval(myInterval);
		}
	}
});