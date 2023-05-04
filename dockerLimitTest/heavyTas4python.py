import random
import time

# 10萬次亂數陣列
arr = [random.random() for i in range(1000000)]

# 負載測試
def heavy_task():
    d = {}
    for i, value in enumerate(arr):
        d[i] = value
    return d

# 記錄開始時間
start_time = time.time()

# 重複10次
for i in range(10):
    heavy_task()

# 結算時間
end_time = time.time()
total_time = end_time - start_time
print("耗費時間:", total_time, "秒")
