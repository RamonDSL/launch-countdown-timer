const Tdays = document.querySelector('[data-time="days"]')
const Thrs = document.querySelector('[data-time="hrs"]')
const Tmins = document.querySelector('[data-time="mins"]')
const Tsecs = document.querySelector('[data-time="secs"]')

let interval;

const start = () => {
    seconds()
    interval = setInterval(seconds, 1000)
}

const seconds = () => {
    const keepRunning = checkIfThereIsStillTime(Tmins.textContent, Thrs.textContent, Tdays.textContent)
    
    if (Tsecs.innerHTML > 0) {
        flipCard(Tsecs, Tsecs.textContent, Tsecs.textContent-1)
    } else if(!keepRunning) {
        flipCard(Tsecs, Tsecs.textContent, 59)
        minutes()
    }

    stopTimer()
}

const minutes = () => {
    const keepRunning = checkIfThereIsStillTime(Thrs.textContent, Tdays.textContent) 

    if (Tmins.innerHTML > 0) {
        flipCard(Tmins, Tmins.textContent, Tmins.textContent-1)
    } else if(!keepRunning) {
        flipCard(Tmins, Tmins.textContent, 59)
        hours()
    }
}

const hours = () => {
    const keepRunning = checkIfThereIsStillTime(Tdays.textContent) 

    if (Thrs.innerHTML > 0) {
        flipCard(Thrs, Thrs.textContent, Thrs.textContent-1)
    } else if(!keepRunning) {
        flipCard(Thrs, Thrs.textContent, 23)
        days()
    }    
}

const days = () => {
    if (Tdays.innerHTML > 0) {
        flipCard(Tdays, Tdays.textContent, Tdays.textContent-1)
    }    
}

const checkIfThereIsStillTime = (...times) => times.every(time => time == 0)

const formatNum = number => {
    if (number < 10) {
        return `0${number}`
    } else {
        return number
    }
}

const flipCard = (topHalf, timeStart, nextTime) => {
    const countdown = topHalf.parentNode
    
    const bottomHalf = countdown.querySelector('.bottom')
    const topFlip = document.createElement('div')
    topFlip.classList.add('top-flip')
    const bottomFlip = document.createElement('div')
    bottomFlip.classList.add('bottom-flip')

    timeStart = formatNum(parseInt(timeStart))
    nextTime = formatNum(nextTime)

    bottomHalf.textContent = timeStart
    topFlip.textContent = timeStart
    bottomFlip.textContent = nextTime

    topFlip.addEventListener('animationstart', () => {
        topHalf.textContent = nextTime
    })

    topFlip.addEventListener('animationend', () => {
        topFlip.remove()        
    })

    bottomFlip.addEventListener('animationend', () => {
        bottomHalf.textContent = nextTime
        bottomFlip.remove()        
    })

    countdown.append(topFlip, bottomFlip)
    
}

const stopTimer = () => {
    const endTimer = checkIfThereIsStillTime(
        Tsecs.textContent,Tmins.textContent, Thrs.textContent, Tdays.textContent
        )

    if (endTimer) {
        clearInterval(interval)
    }
}

(function() {
    const countdowns = document.querySelectorAll('.countdown')
    
    for (const countdown of countdowns) {
        const topHalf = countdown.querySelector('.top')
        const bottomHalf = countdown.querySelector('.bottom')

        topHalf.textContent = formatNum(topHalf.textContent)
        bottomHalf.textContent = formatNum(bottomHalf.textContent)
    }
})()


start()