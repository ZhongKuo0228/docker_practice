import { exec } from "child_process";

const createCommand = `docker network ls --filter name=-network`;

const child = exec(createCommand);

child.stdin.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
});

let output = "";

child.stdout.on("data", (data) => {
    // console.log(`stdout: ${data}`);
    //將結果串在一起
    output += data;
});

child.stderr.on("data", async (data) => {
    //回傳運行結果
    console.log("stderr", data);
    output += data;
});

child.stdout.on("close", async () => {
    const network = output.trim();
    console.log(`Total network lists: ${network}`);

    const networkCount = output.trim().split("\n").length - 1;
    console.log(`Total network count: ${networkCount}`);
});
