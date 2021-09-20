let distance = 0
basic.forever(function () {
    distance = hacedores.ultrasonicSensor(
    DigitalPin.P0,
    DigitalPin.P1,
    UltrasonicUnits.Centimeters
    )
    basic.showNumber(distance)
    basic.pause(1000)
})
