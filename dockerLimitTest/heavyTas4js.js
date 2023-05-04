// 10萬次亂數陣列
const arr = [];
for (let i = 0; i < 1000000; i++) {
    arr.push(Math.random());
}

// 負載測試
function heavyTask() {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        map.set(i, value);
    }
    return map;
}

// 執行前
console.time("耗費時間");

// 重複10次負載測試
for (let i = 0; i < 10; i++) {
    heavyTask();
}

// 最後結果
console.timeEnd("耗費時間");
