// silkc.js

(function() {
if (navigator.userAgentData.mobile) {
	return
}

var stuff = []
stuff[0] = document.createElementNS("http://www.w3.org/2000/svg", "svg")
stuff[0].style = "pointer-events:none;top:-200px;position:fixed;left:0;z-index:9999999999999999999"
stuff[0].setAttribute("xmlns", "http://www.w3.org/2000/svg")
stuff[0].setAttribute("width", "28")
stuff[0].setAttribute("height", "36")
stuff[0].setAttribute("viewBox", "0 0 50 54")
stuff[0].setAttribute("fill", "none")

stuff[1] = document.createElementNS("http://www.w3.org/2000/svg", "path")
stuff[1].setAttribute("d", "M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z")
stuff[1].setAttribute("fill", "black")
stuff[0].appendChild(stuff[1])

stuff[2] = document.createElementNS("http://www.w3.org/2000/svg", "path")
stuff[2].setAttribute("d", "M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z")
stuff[2].setAttribute("stroke", "white")
stuff[2].setAttribute("stroke-width", "3")
stuff[0].appendChild(stuff[2])

document.body.appendChild(stuff[0])

var cursor = stuff[0]
var angle = 0
var first = true
var prevvy = [0,0]
var hovering = false

document.onmouseout = function(e) {
	if (e.target && e.target.matches("button,a,input")) {
		hovering = false
	}
    cursor.style.transform = "translate(calc(" + prevvy[1] + "px - 50%), calc(" + prevvy[0] + "px - 50%)) rotate(" + angle + "deg) scale(0)"
	angle = 0
}

document.onmouseover = function(e) {
	if (e.target && e.target.matches("button,a,input")) {
		hovering = true
	}
	if (angle !== 0) {
		cursor.style.transform = "translate(calc(" + prevvy[1] + "px - 50%), calc(" + prevvy[0] + "px - 50%)) rotate(" + angle + "deg) scale(1)"
	}
}

document.onmousemove = function(e) {
	if (first) {
		cursor.style.top = 0
	}
	let point = (Math.atan2(e.clientY - prevvy[0], e.clientX - prevvy[1]) * 50 + 90) - angle
	prevvy = [e.clientY, e.clientX]
	while (true) {
		if (point < 180 && point > -180) {
			angle = angle + point
			break
		}
		if (point < -180) {
			point = point + 360
		} else {
			point = point - 360
		}
	}
	if (!first) {
		let a1 = "translate(calc(" + prevvy[1] + "px - 50%), calc(" + prevvy[0] + "px - 50%)) rotate(" + angle + "deg)"
		if (hovering) {
			a1 = a1 + " scale(1.3)"
		}
		cursor.style.transform = a1
	} else {
		cursor.style.transform = "translate(calc(" + prevvy[1] + "px - 50%), calc(" + prevvy[0] + "px - 50%)) rotate(" + angle + "deg) scale(0)"
	}
	if (first) {
		first = false
		setTimeout(function() {
			cursor.style.transition = "transform 1s cubic-bezier(0.2, 1, 0.2, 1)"
			cursor.style.transform = "translate(calc(" + prevvy[1] + "px - 50%), calc(" + prevvy[0] + "px - 50%)) rotate(" + angle + "deg) scale(1)"
		}, 1)
	}
}

var removedefault = document.createElement("style")
removedefault.textContent = "*{cursor:none !important}"
document.head.appendChild(removedefault)

if (!window.matchMedia("(prefers-color-scheme:dark)").matches) {
	stuff[1].setAttribute("fill", "white")
	stuff[2].setAttribute("stroke", "black")
}
})()
