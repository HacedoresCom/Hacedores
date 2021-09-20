// Add your code here
enum UltrasonicUnits {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * Ultrasonic sensor HC-SR04
 * Made for Hacedores
 * 20-09-21
 */

//% color="#390099" weight=80 icon="\uf0ad"
namespace Hacedores {
    /**
     * Send a trigger singnal and receive an echo signal to calculate distances
     * in centimeters or inches
     */
    //% block="HC-RS04 trigger %trigger|echo %echo|unit %unit"
    export function ultrasonicSensor(trigger: DigitalPin, echo: DigitalPin, unit: UltrasonicUnits, maxDistance = 400): number {
        // Sending a pulse
        pins.setPull(trigger, PinPullMode.PullNone);
        pins.digitalWritePin(trigger, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trigger, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trigger, 0);

        // Receiving a pulse
        const distance = pins.pulseIn(echo, PulseValue.High, maxDistance * 58);

        switch (unit) {
            case UltrasonicUnits.Centimeters: return Math.idiv(distance, 58);
            case UltrasonicUnits.Inches: return Math.idiv(distance, 148);
        }
    }
}
