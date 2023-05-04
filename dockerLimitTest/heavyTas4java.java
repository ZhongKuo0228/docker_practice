import java.util.HashMap;
import java.util.Map;

public class heavyTas4java {

    public static void main(String[] args) {
        // 10萬次亂數陣列
        double[] arr = new double[1000000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = Math.random();
        }

        // 負載測試
        Map<Integer, Double> heavyTask = new HashMap<>();
        for (int i = 0; i < arr.length; i++) {
            heavyTask.put(i, arr[i]);
        }

        // 記錄開始時間
        long startTime = System.currentTimeMillis();

        // 重複10次
        for (int i = 0; i < 10; i++) {
            heavyTask();
        }

        // 結算時間
        long endTime = System.currentTimeMillis();
        long totalTime = endTime - startTime;
        System.out.println("程序总耗时：" + totalTime + "毫秒");
    }

    // 執行
    public static Map<Integer, Double> heavyTask() {
        Map<Integer, Double> map = new HashMap<>();
        for (int i = 0; i < 1000000; i++) {
            map.put(i, Math.random());
        }
        return map;
    }
}
