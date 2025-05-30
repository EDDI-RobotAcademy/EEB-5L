package utility;

import java.util.Scanner;

public class KeyboardInput {
    private static Scanner scanner = new Scanner(System.in);

    // KeyboardInput을 생성자로 만드는 것을 금함
    private KeyboardInput() {}

    public static String getStringInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine();
    }
}
