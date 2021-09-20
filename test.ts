// tests go here; this will not be compiled when this package is used as an extension.
basic.forever(function () {
    let distance = Hacedores.ultrasonicSensor(
        DigitalPin.P0,
        DigitalPin.P0,
        UltrasonicUnits.Centimeters
    )
    basic.showNumber(distance)
    basic.pause(1000)
})
