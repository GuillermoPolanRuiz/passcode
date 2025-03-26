var timesClicked = 0;
var passcodeCount = 0;
var passcode = '';
var newPassCode = '';

// Guardar datos en sessionStorage cuando la página carga
window.onload = function() {
	toggleFullscreen();
	GetDate();

	passcode = sessionStorage.getItem("passcode");

	if (passcode != null) {
		OpenPasscode();
	}else{
		var divPasscode = document.getElementById('divPasscode');
		divPasscode.style.display = 'none';

		var divHome = document.getElementById('divHome');
		divHome.style.display = 'none';
	}
};

function GetDate() {
	// Crear un objeto Date para obtener la fecha y hora actuales
	const now = new Date();

	// Obtener la hora y los minutos (formato hh:mm)
	let hours = now.getHours();
	let minutes = now.getMinutes();

	// Asegurarse de que las horas y minutos siempre sean de dos dígitos
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;

	const time = `${hours}:${minutes}`;

	// Obtener el día de la semana (en formato texto)
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const weekday = weekdays[now.getDay()];

	// Obtener el mes (en formato de texto, como Enero, Febrero, etc.)
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const month = months[now.getMonth()];

	// Obtener el día del mes
	const dayOfMonth = now.getDate();
	
	var lblTime = document.getElementById('lblTime')
	lblTime.innerText = time;

	var lblTime2 = document.getElementById('lblTime2');
	lblTime2.innerText = time;

	var lblDate = document.getElementById('lblDate');
	lblDate.innerText = weekday + ', ' + month + ' ' + dayOfMonth;

}

function OpenPasscode() {
	var divIndex = document.getElementById('divIndex');
	divIndex.style.display = 'none';

	var divIndex = document.getElementById('divHome');
	divIndex.style.display = 'none';

	var divPasscode = document.getElementById('divPasscode');
	divPasscode.style.display = 'block';
}

function turnOff() {
	timesClicked++;

	if (timesClicked % 2 == 1) { 
		document.getElementById("inner").style.opacity = "0"; 
		document.getElementById("iphone").style.backgroundImage = "none";   
		document.getElementById("iphone").style.backgroundColor = "#000"; 
		document.getElementById("inner").style.cursor = "pointer"; 
	} else {
		document.getElementById("inner").style.opacity = "1"; 
		document.getElementById("iphone").style.backgroundColor = "transparent"; 
		document.getElementById("iphone").style.backgroundImage = "url('Images/Backgrounds/lockscreen.jpeg')";   
		document.getElementById("inner").style.cursor = "auto"; 
	}

	document.getElementById("iphone").addEventListener("click", () => {
		document.getElementById("inner").style.opacity = "1"; 
		document.getElementById("iphone").style.backgroundColor = "transparent"; 
		document.getElementById("iphone").style.backgroundImage = "url('Images/Backgrounds/lockscreen.jpeg')";   
	});
}

function turnOffLock() {
	timesClicked++;

	if (timesClicked % 2 == 1) { 
		document.getElementById("inner").style.opacity = "0"; 
		document.getElementById("iphone").style.backgroundImage = "none";   
		document.getElementById("iphone").style.backgroundColor = "#000"; 
		document.getElementById("inner").style.cursor = "pointer"; 
	} else {
		window.location.href = "/index.html";	
	}

	document.getElementById("iphone").addEventListener("click", () => {
		window.location.href = "/index.html";			
	});
}

function changeColorTorch() {
	timesClicked++;

	if (timesClicked % 2 == 1) {
	document.getElementById("torchBtn").style.backgroundColor = "#ffffff";
	document.getElementById("torchImg").src = "Images/Icons/torchDark.png";
	} else {
		document.getElementById("torchBtn").style.backgroundColor = "#1d2145";
		document.getElementById("torchImg").src = "Images/Icons/torch.png";
	}
}


function addFilledDot(num) {
	newPassCode += num;
	
	passcodeCount++;

	document.getElementById("dot" + passcodeCount).style.backgroundColor = "#fff";

	if ((passcodeCount == 6 && newPassCode == passcode) || (passcodeCount == 6 && passcode == null)) {
		setTimeout(function(){
			
			//window.location.href = "/home.html";
			
			var divPasscode = document.getElementById('divPasscode');
			divPasscode.style.display = 'none';
			
			var divHome = document.getElementById('divHome');
			
			divHome.style.display = 'block';
			
			sessionStorage.setItem("passcode", newPassCode);

			var all = document.getElementsByClassName("dot");
			for (var i = 0; i < all.length; i++) {
				all[i].style.backgroundColor = "transparent";
			}					
		}, 200);
	}
	else if (passcodeCount == 6 && passcode != newPassCode) 
	{
		// Añadir clase CSS para hacer que los puntos vibren
		const dots = document.querySelectorAll('.dot');
		dots.forEach(dot => {
			dot.classList.add('shake');
		});

		setTimeout(() => {
		dots.forEach(dot => {
			dot.classList.remove('shake');

		});
		}, 500);  // La animación dura 0.5s

		ClearDots();

		timesClicked = 0;
		passcodeCount = 0;
		newPassCode = '';
	}
}

function ClearDots(){
	const dots = document.querySelectorAll('.dot');
		dots.forEach(dot => {
			dot.style.backgroundColor = '#c8c5c569';
		});
}

function ShowPasscode() {
	alert('Passcode: ' + passcode)
}

// Function to toggle fullscreen
function toggleFullscreen() {
	if (!document.fullscreenElement &&    // Check if not already in fullscreen
		!document.webkitFullscreenElement && // For Safari
		!document.mozFullScreenElement &&    // For Firefox
		!document.msFullscreenElement) {    // For Internet Explorer
		// If not in fullscreen, enter fullscreen
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) { // Firefox
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
			document.documentElement.webkitRequestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
			document.documentElement.msRequestFullscreen();
		}
	} else {
		// If already in fullscreen, exit fullscreen
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) { // Firefox
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { // IE/Edge
			document.msExitFullscreen();
		}
	}
}
