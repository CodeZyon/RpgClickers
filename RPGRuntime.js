// Player and boss health, level, XP, gold, damage, health points, critical chance, and boss health increase data
let playerHealth = 100;
let bossHealth = 100;
let level = 1;
let xp = 0;
let gold = 10;
let damagePoints = 0;
let healthPoints = 0;
let criticalChance = 0;
let bossHealthIncrease = 100;
let bossDamage = 5;

// HTML element references
const playerHealthBar = document.querySelector("#player-health");
const bossHealthBar = document.querySelector("#boss-health");
const xpBar = document.querySelector("#player-xp");
const levelText = document.querySelector("#level");
const goldText = document.querySelector("#gold-count");
const damagePointsText = document.querySelector("#damage-points");
const healthPointsText = document.querySelector("#health-points");
const criticalChanceText = document.querySelector("#critical-chance");
const increaseDamageButton = document.querySelector("#increase-damage-btn");
const increaseHealthButton = document.querySelector("#increase-health-btn");
const increaseCriticalButton = document.querySelector("#increase-critical-btn");
const playButton = document.querySelector("#play-btn");
const autoAttackButton = document.querySelector("#auto-attack-btn");

// Function to update health bar
function updateHealthBar(healthBar, health) {
    healthBar.style.width = health + "%";
}

// Function to update XP bar
function updateXPBar(xpBar, xp) {
    xpBar.style.width = xp + "%";
}

// Function to update damage points
function updateDamagePoints(points) {
    damagePointsText.textContent = "Damage Points: " + points;
}

// Function to update health points
function updateHealthPoints(points) {
    healthPointsText.textContent = "Health Points: " + points;
}

// Function to update critical chance
function updateCriticalChance(chance) {
    criticalChanceText.textContent = "Critical Chance: " + chance + "%";
}

// Function to perform an attack
function performAttack() {
    const playerDamage = Math.floor(Math.random() * 10) + 1 + damagePoints;

    // Check for critical hit
    if (Math.random() < (criticalChance / 100)) {
        bossHealth -= playerDamage * 2; // Double the damage on critical hit
    } else {
        bossHealth -= playerDamage;
    }

    playerHealth -= bossDamage;

    // Update health bars
    updateHealthBar(playerHealthBar, playerHealth);
    updateHealthBar(bossHealthBar, bossHealth);

    // Check for game over
    if (playerHealth <= 0) {
        //alert("Game Over! You lost!");
        resetGame();
    } else if (bossHealth <= 0) {
        //alert("Boss defeated! You won!");
        gainXP();
    }
}

// Function to perform auto-attack every second
function autoAttack() {
    autoAttackButton.disabled = true; // Disable auto-attack button during auto-attack

    const intervalId = setInterval(() => {
        performAttack();

        if (playerHealth <= 0 || bossHealth <= 0) {
            clearInterval(intervalId);
            autoAttackButton.disabled = false; // Enable auto-attack button after auto-attack ends
        }
    }, 1000);
}

if (level >= 10) {
bossDamage += 2;
bossHealth += bossHealthIncrease;
        bossHealthIncrease += 50;
        bossHealthBar.style.width = bossHealth + "%";
}

// Function to gain XP and level up the player
function gainXP() {
    xp += 20;
    if (xp >= 100) {
        level++;
        xp = 0;
        gold += level * 5;
        levelText.textContent = "Level: " + level;
        goldText.textContent = "Gold: " + gold;

        bossDamage += 3; // Increase boss damage on level up

        //alert("Level up! You reached Level " + level + " and gained " + (level * 5) + " gold!");
        bossHealth += bossHealthIncrease;
        bossHealthIncrease += 50;
        bossHealthBar.style.width = bossHealth + "%";
    }

    updateXPBar(xpBar, xp);
    resetHealth();
}

// Function to increase damage points
function increaseDamage() {
    if (gold >= 5) {
        damagePoints++;
        gold -= 5;
        goldText.textContent = "Gold: " + gold;
        updateDamagePoints(damagePoints);
    } else {
        //alert("Not enough gold to increase damage points!");
    }
}

// Function to increase health points
function increaseHealth() {
    if (gold >= 5) {
        healthPoints++;
        gold -= 5;
        goldText.textContent = "Gold: " + gold;
        updateHealthPoints(healthPoints);
    } else {
        //alert("Not enough gold to increase health points!");
    }
}

// Function to increase critical chance
function increaseCriticalChance() {
    if (gold >= 10) {
        criticalChance += 5;
        gold -= 10;
        goldText.textContent = "Gold: " + gold;
        updateCriticalChance(criticalChance);
    } else {
        alert("Not enough gold to increase critical chance!");
    }
}

// Function to reset health
function resetHealth() {
    playerHealth = 100; //+ healthPoints * 10
    bossHealth = 100;

    updateHealthBar(playerHealthBar, playerHealth);
    updateHealthBar(bossHealthBar, bossHealth);
}

// Function to reset the game
function resetGame() {

    updateXPBar(xpBar, xp);
    resetHealth();
}

// Event listener for attack button
playButton.addEventListener("click", performAttack);

// Event listener for increase damage button
increaseDamageButton.addEventListener("click", increaseDamage);

// Event listener for increase health button
increaseHealthButton.addEventListener("click", increaseHealth);

// Event listener for increase critical chance button
increaseCriticalButton.addEventListener("click", increaseCriticalChance);

// Event listener for auto-attack button
autoAttackButton.addEventListener("click", autoAttack);
