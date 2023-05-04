#include <iostream>
#include <chrono>
#include <unordered_map>

using namespace std;

unordered_map<int, double> heavy_task();

int main() {
    // 生成一个包含大量数据的数组
    double arr[1000000];
    for (int i = 0; i < 1000000; i++) {
        arr[i] = (double)rand() / RAND_MAX;
    }

    // 记录程序开始运行的时间
    chrono::steady_clock::time_point start_time = chrono::steady_clock::now();

    // 循环调用该函数以占用更多内存
    unordered_map<int, double> heavy_map;
    for (int i = 0; i < 10; i++) {
        unordered_map<int, double> temp = heavy_task();
        heavy_map = temp;
    }

    // 记录程序结束运行的时间，并输出程序总运行时间
    chrono::steady_clock::time_point end_time = chrono::steady_clock::now();
    chrono::milliseconds total_time = chrono::duration_cast<chrono::milliseconds>(end_time - start_time);
    cout << "程序总耗时：" << total_time.count() << "毫秒" << endl;

    return 0;
}

// 定义一个占用大量内存的函数
unordered_map<int, double> heavy_task() {
    unordered_map<int, double> map;
    for (int i = 0; i < 1000000; i++) {
        map[i] = (double)rand() / RAND_MAX;
    }
    return map;
}
