// tests go here; this will not be compiled when this package is used as an extension.
basic.forever(function () {
    let distance = hacedores.ultrasonicSensor(
        DigitalPin.P0,
        DigitalPin.P1,
        UltrasonicUnits.Centimeters
    )
    //basic.showNumber(distance)
    basic.pause(1000)
})
