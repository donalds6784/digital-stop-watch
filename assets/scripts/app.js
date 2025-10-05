'use strict'

/*==========================================
        Selecting DOM elements
==========================================*/
const themeToggleBtn = document.querySelector('.theme-toggle')
const stopWatch = document.querySelector('.stop-watch')
const hours = stopWatch.querySelector('.hours')
const minutes = stopWatch.querySelector('.minutes')
const seconds = stopWatch.querySelector('.seconds')
const milliseconds = stopWatch.querySelector('.milliseconds')
const startBtn = stopWatch.querySelector('.start')
const stopBtn = stopWatch.querySelector('.stop')
const resetBtn = stopWatch.querySelector('.reset')

// Laps
const dialogDisplayButton = document.querySelector('.view-laps')
const lapsDialog = document.getElementById('laps-dialog')
const lapBtn = document.querySelector('.lap-btn')
const lapCount = document.querySelector('.lap-count')
const lapTime = document.querySelector('.lap-time')
const lapsList = document.querySelector('.laps-list')

/*==========================================
		Handler for the laps dialog
==========================================*/
dialogDisplayButton.addEventListener('click', () => {
	lapsDialog.showModal()
})

lapsDialog.querySelector('.close-dialog-btn').addEventListener('click', () => {
	lapsDialog.close()
})

/*==========================================
        Global variables
==========================================*/
let intervalId
let hoursValue = 0,
	minutesValue = 0,
	secondsValue = 0,
	millisecondsValue = 0
let isTimerRunning = false
let lapCounter = 0

/*==========================================
    Function to display the current time
	on the stopwatch
==========================================*/
const updateTime = () => {
	millisecondsValue++
	if (millisecondsValue >= 100) {
		secondsValue++
		millisecondsValue = 0
	}
	if (secondsValue >= 60) {
		minutesValue++
		secondsValue = 0
	}
	if (minutesValue >= 60) {
		hoursValue++
		minutesValue = 0
	}

	// Updating the DOM
	hours.textContent = hoursValue < 10 ? '0' + hoursValue : hoursValue
	minutes.textContent = minutesValue < 10 ? '0' + minutesValue : minutesValue
	seconds.textContent = secondsValue < 10 ? '0' + secondsValue : secondsValue
	milliseconds.textContent =
		millisecondsValue < 10 ? '0' + millisecondsValue : millisecondsValue
}

/*==========================================
		Function to start the stopwatch
==========================================*/

const startTimer = () => {
	if (!isTimerRunning) {
		intervalId = setInterval(updateTime, 10)
		isTimerRunning = true
	}
}

/*==========================================
		Function to stop the stopwatch
==========================================*/

const stopTimer = () => {
	clearInterval(intervalId)
	isTimerRunning = false
}

/*==========================================
		Function to reset the stopwatch
==========================================*/
const resetTimer = () => {
	stopTimer()
	hoursValue = 0
	minutesValue = 0
	secondsValue = 0
	millisecondsValue = 0

	// Updating the DOM
	hours.textContent = '00'
	minutes.textContent = '00'
	seconds.textContent = '00'
	milliseconds.textContent = '00'
	isTimerRunning = false
	startBtn.textContent = 'Start'

	resetLaps()
}

/*==========================================
		Laps handler
==========================================*/
const lap = () => {
	const lapTime = `${hours.textContent}:${minutes.textContent}:${seconds.textContent}:${milliseconds.textContent}`
	lapCounter++
	const lapItem = document.createElement('li')
	lapItem.classList.add('lap-item')
	lapItem.innerHTML = `
		<span class="lap-number">Lap ${lapCounter}:</span>
		<span class="lap-time">${lapTime}</span>`
	lapsList.appendChild(lapItem)
	lapCount.textContent = parseInt(lapCount.textContent) + 1
}

/*==========================================
        Event listeners for the buttons
==========================================*/
startBtn.addEventListener('click', () => {
	if (!isTimerRunning) {
		startTimer()
	}
})

stopBtn.addEventListener('click', stopTimer)

resetBtn.addEventListener('click', resetTimer)

lapBtn.addEventListener('click', () => {
	if (isTimerRunning) {
		lap()
	}
})

/*==========================================
		Function to reset the laps
==========================================*/

const resetLaps = () => {
	lapsList.innerHTML = ''
	lapCount.textContent = '0'
}

/*==========================================
		Theme toggle
==========================================*/
const THEME_KEY = 'dw_theme'
const iconImg = themeToggleBtn.querySelector('img')

function setTheme(theme) {
	if (theme === 'light') {
		document.body.classList.add('light-theme')
		themeToggleBtn.classList.add('active')
		if (iconImg) iconImg.src = './assets/images/dark_icon.webp'
	} else {
		document.body.classList.remove('light-theme')
		themeToggleBtn.classList.remove('active')
		if (iconImg) iconImg.src = './assets/images/light_mode_icon.webp'
	}
}

// Initialize theme from localStorage or prefers-color-scheme
;(function initTheme() {
	const saved = localStorage.getItem(THEME_KEY)
	if (saved) {
		setTheme(saved)
	} else if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: light)').matches
	) {
		setTheme('light')
	} else {
		setTheme('dark')
	}
})()

themeToggleBtn.addEventListener('click', () => {
	const isLight = document.body.classList.toggle('light-theme')
	themeToggleBtn.classList.toggle('active', isLight)
	setTheme(isLight ? 'light' : 'dark')
	localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark')
})

/*==========================================
        End of file
==========================================*/
