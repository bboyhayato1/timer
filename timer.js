const timerElement = document.getElementById('timer');
const statusElement = document.getElementById('status');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let timeLeft = 25 * 60; // 25分
let isRunning = false;
let intervalId;

// 時間を表示形式に変換
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// タイマーを更新
function updateTimer() {
    timeLeft--;
    timerElement.textContent = formatTime(timeLeft);
    
    if (timeLeft <= 0) {
        clearInterval(intervalId);
        isRunning = false;
        alert('時間になりました！');
        // 作業時間と休憩時間の切り替え
        if (statusElement.textContent === '作業時間') {
            timeLeft = 5 * 60; // 休憩時間は5分
            statusElement.textContent = '休憩時間';
        } else {
            timeLeft = 25 * 60; // 作業時間は25分
            statusElement.textContent = '作業時間';
        }
        timerElement.textContent = formatTime(timeLeft);
    }
}

// 開始ボタンの処理
startButton.addEventListener('click', () => {
    if (!isRunning) {
        intervalId = setInterval(updateTimer, 1000);
        isRunning = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
    }
});

// 一時停止ボタンの処理
pauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = false;
    }
});

// リセットボタンの処理
resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
    timeLeft = 25 * 60;
    timerElement.textContent = formatTime(timeLeft);
    statusElement.textContent = '作業時間';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
});

// 初期状態の設定
startButton.disabled = false;
pauseButton.disabled = true;
resetButton.disabled = true;
