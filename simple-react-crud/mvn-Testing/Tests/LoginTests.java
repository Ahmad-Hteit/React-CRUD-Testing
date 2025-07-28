package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginTests {

    WebDriver driver;

    @BeforeClass
    public void setUp(){
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/");
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
    }

    private void login(String username, String password){
        WebElement userInput = driver.findElement(By.xpath("//input[@placeholder='Username']"));
        WebElement passwordInput = driver.findElement(By.xpath("//input[@placeholder='Password']"));
        WebElement loginBtn = driver.findElement(By.xpath("//button[text()='Login']"));

        userInput.clear();
        userInput.sendKeys(username);
        passwordInput.clear();
        passwordInput.sendKeys(password);
        loginBtn.click();
    }

    @Test
    public void testInvalidLogin(){
        login("Ahmad Hoteit", "123");
        WebElement message = driver.findElement(By.className("login-message"));
        Assert.assertEquals(message.getText(), "Login failed");
        System.out.println("Invalid Login Test Passed");
    }

    @Test
    public void testValidLogin(){
        login("admin", "Ahmad12354%#@#");
        WebElement message = driver.findElement(By.className("login-message"));
        Assert.assertEquals(message.getText(), "Login successful");
        System.out.println("Valid Login Test Passed");
    }

    @AfterClass
    public void tearDown() throws InterruptedException{
        Thread.sleep(3000); // optional, for demo purposes
        driver.quit();
    }
}
