import { exec } from "child_process";

const createCommand = `docker stats --no-stream $(docker ps --filter name=-1 -q)`;

const child = exec(createCommand);

child.stdin.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
});

let output = "";

child.stdout.on("data", (data) => {
    output += data;
});

child.stderr.on("data", async (data) => {
    console.log("stderr", data);
    output += data;
});

child.stdout.on("close", async () => {
    const stats = output.trim().split("\n");
    const header = stats.shift();
    const headerParts = header.trim().split(/\s{2,}/);

    const cpuIndex = headerParts.indexOf("CPU %");
    const memoryIndex = headerParts.indexOf("MEM USAGE / LIMIT");
    const memoryPercentageIndex = headerParts.indexOf("MEM %");

    const totalCpu = stats.reduce((total, stat) => {
        const statParts = stat.trim().split(/\s{2,}/);
        const cpu = parseFloat(statParts[cpuIndex]);
        return total + cpu;
    }, 0);

    const totalMemory = stats.reduce((total, stat) => {
        const statParts = stat.trim().split(/\s{2,}/);
        const memory = parseFloat(statParts[memoryIndex].split(" / ")[0]);
        return total + memory;
    }, 0);

    console.log(`Total CPU usage: ${totalCpu.toFixed(2)}%`);
    console.log(`Total memory usage: ${totalMemory.toFixed(2)} MiB`);

    child.kill();
});
