
enum UltrasonicUnits {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches,
}

/**
 * Custom blocks made for Hacedores
 * 20-09-21
 */

//% color="#390099" weight=80 icon="\uf0ad"
//% category="Hacedores"
namespace hacedores {
    /**
     * Send a trigger singnal and receive an echo signal to calculate distances
     * to any objects in centimeters or inches
     */
    //% subcategory="Ultrasonic sensor"
    //% block="HC-SR04 trigger %trigger|echo %echo|unit %unit"
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
    
    // The data high bytes contains the file store (TF is 2).
    // The data low byte contains the playback status: stopped=0, playing=1, paused=2.

    interface DeviceState {
        track: uint16; //maximum value is 255
        folder: uint8; //maximum value is 127
        maxTrackInFolder: uint8;
        volume: uint8;
        isPlaying: boolean;
    }

    let deviceState: DeviceState;

    /**
     * Connect to the serial MP3 device
     * @params tx (P0) is the transmitter pin (TX) on MP3 device
     * @params rx (P1) is the receiver pin (TX) on MP3 device 
     */
    //% subcategory="MP3"
    //% block="MP3 device TX to %tx|RX to %rx"
    export function connectMP3(tx: SerialPin, rx: SerialPin): void{
        serial.redirect(tx,rx,BaudRate.BaudRate9600);

        deviceState = {
            track: 1,
            folder: 1,
            maxTrackInFolder: 255,
            volume: 15,
            isPlaying: false
        }

        basic.pause(500);
        sendCommand(MP3Command.selectDevice());
        basic.pause(500);
        sendCommand(MP3Command.playTrack(1))
    }

    /**
     * Plays a track from a Folder
     * @params track track index, eg:1
     * @params folder folder index, eg:1
     */
    //%subcategory="MP3"
    //%block="play MP3 track %track | from folder %folder | %repeat"
    //%track.min=1 track.max=255
    //%folder.min=1 folder.max=99
    export function playMP3TrackFromFolder(track: number, folder: number): void{
        //connectMP3(SerialPin.P0,SerialPin.P1)

       deviceState.folder = Math.min(Math.max(folder,1),99);
       deviceState.track = Math.min(Math.max(track,1), 255);

       sendCommand(MP3Command.playTrackFromFolder(track,folder))
    }

    /**
     * Play a track
     * @param track index
     */
    //%subcategory="MP3"
    //%block="play MP3 track %track"
    //%track.min=1 track.max=255
    export function playMP3Track(track: number): void {
        sendCommand(MP3Command.playTrack(track))
    }

    /**
     * Next track 
     */
    //%subcategory="MP3"
    //%block="next MP3 track %track"
    //%track.min=1 track.max=255
    export function nextMP3Track(): void {
        sendCommand(MP3Command.nextTrack())
    }
    
    /**
     * Previous track 
     */
    //%subcategory="MP3"
    //%block="previous MP3 track %track"
    //%track.min=1 track.max=255
    export function previousMP3Track(): void {
        sendCommand(MP3Command.previousTrack())
    }

    function sendCommand(command: Buffer): void{
        serial.writeBuffer(command)
    }

    export namespace MP3Command {

        export const enum CommandCode {
            PLAY_NEXT_TRACK = 0x01,
            PLAY_PREV_TRACK = 0x02,
            PLAY_TRACK = 0x03,
            INCREASE_VOLUME = 0x04,
            DECREASE_VOLUME = 0x05,
            SET_VOLUME = 0x06,
            REPEAT_TRACK = 0x08,
            SELECT_DEVICE = 0x09,
            RESET = 0x0c,
            RESUME = 0x0d,
            PAUSE = 0x0e,
            PLAY_TRACK_FROM_FOLDER = 0x0f,
            STOP = 0x16,
            REPEAT_FOLDER = 0x17,
            PLAY_RANDOM = 0x18,
            MUTE = 0x1a
        }

        let commandBuffer: Buffer = undefined;

        export function composeSerialCommand(command: CommandCode,dataHigh: number,dataLow: number): Buffer {
            if (!commandBuffer) {
                commandBuffer = pins.createBuffer(8);
                commandBuffer.setNumber(NumberFormat.UInt8LE, 0, 0x7e);
                commandBuffer.setNumber(NumberFormat.UInt8LE, 1, 0xff);
                commandBuffer.setNumber(NumberFormat.UInt8LE, 2, 0x06);
                commandBuffer.setNumber(NumberFormat.UInt8LE, 4, 0x00);
                commandBuffer.setNumber(NumberFormat.UInt8LE, 7, 0xef);
            }
            commandBuffer.setNumber(NumberFormat.UInt8LE, 3, command);
            commandBuffer.setNumber(NumberFormat.UInt8LE, 5, dataHigh);
            commandBuffer.setNumber(NumberFormat.UInt8LE, 6, dataLow);
            return commandBuffer;
        }

        export function nextTrack(): Buffer {
            return composeSerialCommand(CommandCode.PLAY_NEXT_TRACK, 0x00, 0x00);
        }

        export function previousTrack(): Buffer {
            return composeSerialCommand(CommandCode.PLAY_PREV_TRACK, 0x00, 0x00);
        }

        export function playTrack(track: number): Buffer {
            return composeSerialCommand(CommandCode.PLAY_TRACK, 0x00, track);
        }

        export function increaseVolume(): Buffer {
            return composeSerialCommand(CommandCode.INCREASE_VOLUME, 0x00, 0x00);
        }

        export function decreaseVolume(): Buffer {
            return composeSerialCommand(CommandCode.DECREASE_VOLUME, 0x00, 0x00);
        }

        export function setVolume(volume: number): Buffer {
            const adjustVolume = Math.min(Math.max(volume, 0), 30);
            return composeSerialCommand(CommandCode.SET_VOLUME, 0x00, adjustVolume);
        }

        export function repeatTrack(track: number): Buffer {
            return composeSerialCommand(CommandCode.REPEAT_TRACK, 0x00, track);
        }

        export function selectDevice(): Buffer {
            return composeSerialCommand(CommandCode.SELECT_DEVICE, 0x00, 0x02);
        }

        export function resume(): Buffer {
            return composeSerialCommand(CommandCode.RESUME, 0x00, 0x00);
        }

        export function pause(): Buffer {
            return composeSerialCommand(CommandCode.PAUSE, 0x00, 0x00);
        }

        export function stop(): Buffer {
            return composeSerialCommand(CommandCode.STOP, 0x00, 0x00);
        }

        export function playTrackFromFolder(track: number, folder: number): Buffer {
            return composeSerialCommand(CommandCode.PLAY_TRACK_FROM_FOLDER, folder, track);
        }

        export function repeatFolder(folder: number): Buffer {
            return composeSerialCommand(CommandCode.REPEAT_FOLDER, folder, 0x02);
        }

        export function mute(): Buffer {
            return composeSerialCommand(CommandCode.MUTE, 0x00, 0x01);
        }

        export function unmute(): Buffer {
            return composeSerialCommand(CommandCode.MUTE, 0x00, 0x00);
        }
    }
}
