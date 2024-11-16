function calculateCompletionTime() {
    const now = new Date();
    const days = parseInt(document.getElementById('days').value) || 0;
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const completionTime = new Date(now.getTime() + (days * 24 * 60 + hours * 60 + minutes) * 60 * 1000);

    const resultElement = document.getElementById('result');
    resultElement.textContent = `건설 완료 시간: ${completionTime.toLocaleString('ko-KR', { 
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' 
    })}`;
}

function calculateMaxBuildTime() {
    const now = new Date();
    const startHour = 7;
    const endHour = 22;
    const endMinute = 20; // 10시 20분

    const startOfDay = new Date(now);
    startOfDay.setHours(startHour, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(endHour, endMinute, 0, 0);

    let maxBuildTime;
    if (now < startOfDay) {
        // 현재 시각이 오전 7시 이전인 경우
        maxBuildTime = endOfDay - startOfDay;
    } else if (now > endOfDay) {
        // 현재 시각이 오후 10시 20분 이후인 경우
        const nextDayStart = new Date(now);
        nextDayStart.setDate(now.getDate() + 1);
        nextDayStart.setHours(startHour, 0, 0, 0);
        const nextDayEnd = new Date(nextDayStart);
        nextDayEnd.setHours(endHour, endMinute, 0, 0);
        maxBuildTime = nextDayEnd - nextDayStart;
    } else {
        // 오전 7시와 오후 10시 20분 사이인 경우
        maxBuildTime = endOfDay - now;
    }

    const hours = Math.floor(maxBuildTime / (1000 * 60 * 60));
    const minutes = Math.floor((maxBuildTime % (1000 * 60 * 60)) / (1000 * 60));

    const resultElement = document.getElementById('result');
    resultElement.textContent = `최대 건설 가능 시간: ${hours}시간 ${minutes}분`;
}