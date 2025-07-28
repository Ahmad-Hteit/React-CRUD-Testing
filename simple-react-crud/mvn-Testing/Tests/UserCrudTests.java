package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Duration;

public class UserCrudTests {
    WebDriver driver;

    @BeforeClass
    public void setUp(){
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/");
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

        driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("admin");
        driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("Ahmad12354%#@#");
        driver.findElement(By.xpath("//button[text()='Login']")).click();
    }

    @Test(priority = 1)
    public void testAddUser(){
        String name = "Ahmad";
        String email = "ahmadHoteit@gmail.com";
        String role = "User";

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));

        WebElement nameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("inputName")));
        WebElement EmailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("inputEmail")));
        WebElement RoleField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("inputRole")));
        nameField.sendKeys(name);
        EmailField.sendKeys(email);
        RoleField.sendKeys(role);
        driver.findElement(By.id("addUserBtn")).click();

        WebElement lastUserItem = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//li[@class='user-item'])[last()]")
        ));

        // Assert the content of the last user
        String actualText = lastUserItem.getText();
        Assert.assertTrue(actualText.contains(name), "Name not found in the list item!");
        Assert.assertTrue(actualText.contains(email), "Email not found in the list item!");
        Assert.assertTrue(actualText.contains(role), "Role not found in the list item!");
        System.out.println("User Added Successfully!");
    }

    @Test(priority = 2)
    public void testUpdateUser(){
        String NewName = "Ahmad Hoteit";
        String NewEmail = "ahmadQA@gmail.com";
        String NewRole = "Admin";

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));

        driver.findElement(By.xpath("(//div[@class='action-buttons'])[last()]/button[normalize-space(text())='Edit']\n")).click();

        WebElement nameInput = driver.findElement(By.xpath("//div[@class='modal-content']//input[@placeholder='Name']"));
        WebElement emailInput = driver.findElement(By.xpath("//div[@class='modal-content']//input[@placeholder='Email']"));
        WebElement roleInput = driver.findElement(By.xpath("//div[@class='modal-content']//input[@placeholder='Role']"));

        JavascriptExecutor js = (JavascriptExecutor) driver;

        js.executeScript("arguments[0].value=''; arguments[0].dispatchEvent(new Event('input', { bubbles: true }));", nameInput);
        nameInput.sendKeys(NewName);

        js.executeScript("arguments[0].value=''; arguments[0].dispatchEvent(new Event('input', { bubbles: true }));", emailInput);
        emailInput.sendKeys(NewEmail);

        js.executeScript("arguments[0].value=''; arguments[0].dispatchEvent(new Event('input', { bubbles: true }));", roleInput);
        roleInput.sendKeys(NewRole);

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        driver.findElement(By.xpath("//div[@class='modal-content']//button[@class='updateBtn']")).click();

        WebElement lastUserItem = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//li[@class='user-item'])[last()]")
        ));

        String actualText = lastUserItem.getText();

        Assert.assertTrue(actualText.contains(NewName), "Name not updated!");
        Assert.assertTrue(actualText.contains(NewEmail), "Email not updated!");
        Assert.assertTrue(actualText.contains(NewRole), "Role not updated!");

        System.out.println("User Updated Successfully!");
    }

    @Test(priority = 3)
    public void testDeleteUser(){
        WebElement lastUserText = driver.findElement(By.xpath("(//button[@class='deleteBtn'])[last()]"));
        String DeletedText = lastUserText.getText();
        lastUserText.click();

        WebElement UserValues = driver.findElement(By.xpath("(//li[@class='user-item'])[last()]"));
        String actualText = UserValues.getText();

        Assert.assertNotEquals(UserValues, DeletedText, "User still exists after deletion!");
        System.out.println("User Deleted Successfully!");
    }




    @AfterClass
    public void TearDown() throws InterruptedException{
        Thread.sleep(3000);
        driver.quit();
    }


}
