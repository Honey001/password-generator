const range = document.querySelector('input[type="range"]');
const upperCaseCheckbox = document.getElementById("checkbox-uppercase");
const lowerCaseCheckbox = document.getElementById("checkbox-lowercase");
const numberCheckbox = document.getElementById("checkbox-number");
const symbolCheckbox = document.getElementById("checkbox-symbol");
const textDisplay = document.querySelector(".character-length-no");
const generateBtn = document.querySelector(".generate-btn");
const passwordInput = document.querySelector('input[type="text"]');
const strengthBar = document.querySelectorAll(".str");
const strengthText = document.querySelector(".strength-text");
const copyImg = document.querySelector('img[alt="icon-copy"]');
const copiedText = document.querySelector(".copy-text");

function updateSliderBackground() {
	const min = range.min ? range.min : 0;
	const max = range.max ? range.max : 100;
	const val = range.value;

	const percent = ((val - min) / (max - min)) * 100;
	range.style.setProperty("--value", `${percent}%`);
	textDisplay.textContent = val;
}
updateSliderBackground();

range.addEventListener("input", () => {
	updateSliderBackground();
	strengthBar.forEach((bar) => {
		bar.classList.remove("one", "two", "three", "four");
	});
	strengthText.textContent = "";
	passwordInput.value = "";
});

const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_-+=?/{}[]~";

const generatePassword = () => {
	let character = "";
	const passwordLength = parseInt(range.value);

	if (upperCaseCheckbox.checked) character += upperCaseLetters;

	if (lowerCaseCheckbox.checked) character += lowerCaseLetters;

	if (numberCheckbox.checked) character += numbers;

	if (symbolCheckbox.checked) character += symbols;
	if (character == "") {
		return;
	}
	let password = "";
	for (let i = 0; i < passwordLength; i++) {
		const randomIndex = Math.floor(Math.random() * character.length);
		password += character[randomIndex];
	}
	passwordInput.value = password;
	strength(passwordLength);
};

const strength = (length) => {
	let count = 0;
	if (upperCaseCheckbox.checked) count++;

	if (lowerCaseCheckbox.checked) count++;

	if (numberCheckbox.checked) count++;

	if (symbolCheckbox.checked) count++;
	strengthBar.forEach((bar) => {
		bar.classList.remove("one", "two", "three", "four");
	});

	if (count === 1 || length <= 3) {
		strengthText.textContent = "TOO WEAK!";
		strengthBar.forEach((bar, i) => {
			if (i < 1) {
				bar.classList.add("one");
			}
		});
		return;
		// WEAK
	} else if ((count === 2 && length >= 4) || (count >= 3 && length <= 5)) {
		strengthText.textContent = "WEAK";
		strengthBar.forEach((bar, i) => {
			if (i < 2) {
				bar.classList.add("two");
			}
		});
		return;
	} else if ((count === 3 && length >= 10) || (count >= 3 && length <= 9)) {
		strengthText.textContent = "MEDIUM";
		strengthBar.forEach((bar, i) => {
			if (i < 3) {
				bar.classList.add("three");
			}
		});
	} else if (count === 4 && length >= 10) {
		strengthText.textContent = "STRONG";
		strengthBar.forEach((bar) => {
			bar.classList.add("four");
		});
	}
};
const copyText = () => {
	passwordInput.select();
	passwordInput.setSelectionRange(0, 99999);

	// Copy the text inside the text field
	navigator.clipboard.writeText(passwordInput.value);
};
generateBtn.addEventListener("click", (e) => {
	generatePassword();
	generateBtn.classList.add("hover-effect");
	setTimeout(() => {
		generateBtn.classList.remove("hover-effect");
	}, 600);
	e.target.blur();
});
copyImg.addEventListener("click", () => {
	copyText();
	if (!passwordInput.value == "") {
		copiedText.classList.remove("hidden");
	}
	setTimeout(() => {
		copiedText.classList.add("hidden");
	}, 500);
});
