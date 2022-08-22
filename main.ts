info.onCountdownEnd(function () {
    game.over(true)
    effects.confetti.endScreenEffect()
})
info.onLifeZero(function () {
    mySprite.destroy()
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (executed == false) {
        info.changeLifeBy(-1)
        music.buzzer.play()
        animation.runMovementAnimation(
        mySprite,
        animation.animationPresets(animation.shake),
        500,
        false
        )
        pause(500)
        executed = true
        pause(1000)
        executed = false
    }
})
let enemies: Sprite = null
let executed = false
let level3 = 0
let level2 = 0
let level1 = 0
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . c c c c c c c . . . . . 
    . . . . c 4 c c c 4 c . . . . . 
    . . . . c c c c c c c . . . . . 
    . . . . c c c c c c c . . . . . 
    . . . . c . . . . . c . . . . . 
    . . . . c . . . . . c . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let picture = sprites.background.autumn
scene.setBackgroundImage(picture)
mySprite.setPosition(74, 71)
mySprite.setStayInScreen(true)
info.setLife(3)
let gameLength = 60
let level3Time = 40
let level2Time = 20
let enemySpeed = 25
let levels = [level1, level2, level3]
let currentLevel = level1
let splashed_1 = false
let splashed_2 = false
let splashed_3 = false
executed = false
let tempo = 140
info.startCountdown(gameLength)
let gameStart = true
game.splash("Have a Heart")
game.onUpdateInterval(1000, function () {
    if (game.runtime() / 1000 >= level3Time && splashed_3 == false) {
        currentLevel = level3
        picture.replace(4, 1)
        game.splash("Level 3")
        enemySpeed += 30
        splashed_3 = true
    } else if (game.runtime() / 1000 >= level2Time && splashed_2 == false) {
        currentLevel = level2
        picture.replace(3, 4)
        game.splash("Level 2")
        enemySpeed += 30
        splashed_2 = true
    } else if (game.runtime() / 1000 < level2Time && splashed_1 == false) {
        currentLevel = level1
        game.splash("Level 1")
        splashed_1 = true
    }
})
forever(function () {
    music.playMelody("C G B E C5 A F D ", tempo)
    tempo += 10
})
game.onUpdateInterval(500, function () {
    enemies = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 2 2 2 . . . 2 2 2 . . . . 
        . . 2 2 2 2 2 . 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 2 2 2 2 2 2 . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemies.setPosition(randint(0, scene.screenWidth()), scene.screenHeight())
    enemies.setVelocity(0, 0 - enemySpeed)
})
