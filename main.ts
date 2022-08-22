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
let level3 = 40
let level2 = 20
let gameLength = 60
let enemySpeed = 25
let faster_level_3 = false
let faster_level_2 = false
let faster_level_1 = false
executed = false
let tempo = 140
info.startCountdown(gameLength)
game.splash("Have a Heart")
game.onUpdateInterval(1000, function () {
    if (game.runtime() / 1000 >= level3 && faster_level_3 == false) {
        picture.replace(4, 1)
        enemySpeed += 30
        faster_level_3 = true
    } else if (game.runtime() / 1000 >= level2 && faster_level_2 == false) {
        picture.replace(3, 4)
        enemySpeed += 30
        faster_level_2 = true
    } else if (game.runtime() / 1000 >= 0 && faster_level_1 == false) {
        faster_level_1 = true
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
