import http from "k6/http";
import { check, sleep } from "k6";
export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: "constant-arrival-rate",
            rate: 100, //每秒幾個用戶
            timeUnit: "1s", //到達的秒數，應該都設定1，最後結果是rate/timeUnit的數量
            duration: "60s", //設定測試秒數
            preAllocatedVUs: 100, //每秒幾個用戶，應該設定和rate一樣就好
            maxVUs: 100, //允許每秒最大用戶，跟上面設定一樣就好
        },
    },
};
// test HTTP
export default function () {
    const url = `http://localhost:57360/api/1.0/products/women`;
    const res = http.get(url);

    check(res, { "status was 200": (r) => r.status == 200 });
    sleep(1);
}
