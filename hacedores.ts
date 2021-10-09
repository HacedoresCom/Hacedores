enum UltrasonicUnits {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches,
}

const enum Mp3Command {
    //% block="play next track"
    PLAY_NEXT_TRACK,
    //% block="play previous track"
    PLAY_PREVIOUS_TRACK,
    //% block="increase volume"
    REPEAT_FOLDER,
    //% block="repeat folder"
    REPEART_CURRENT_TRACK,
    //% block="repeat current track"
    INCREASE_VOLUME,
    //% block="decrease volume"
    DECREASE_VOLUME,
    //% block="pause"
    PAUSE,
    //% block="play"
    PLAY,
    //% block="stop"
    STOP,
    //% block="mute"
    MUTE,
    //% block="unmute"
    UNMUTE,
}

/**
 * Custom blocks made for Hacedores
 * 20-09-21
 */

//% color="#FF0000" weight=80 icon="\uf0ad"
//% category="Hacedores"

namespace hacedores {

    /***************************************************************************************
     * BLOCK TO COMMUNICATE WITH THE HC-SR04 ULTRASONIC MODULE
     **************************************************************************************/
    /**
     * Send a trigger singnal and receive an echo signal to calculate distances
     * to any objects in centimeters or inches
     */
    //% subcategory="Sensor ultrasónico"
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

    /***************************************************************************************
     * BLOCK TO COMMUNICATE WITH SERVOMOTOR SG-90
     **************************************************************************************/
    /**
     * Control servos
     */

    /***************************************************************************************
     * BLOCK TO COMMUNICATE WITH SERVOMOTOR SG-90
     **************************************************************************************/
    /**
     * Control servos
     */

    /***************************************************************************************
     *  BLOCKS TO COMMUNICATE WITH THE YX5300 MP3 DEVICE. ONLY SEND COMMANDS, NOT RECEIVE
     ***************************************************************************************/
    // The data high bytes contains the file store (TF is 2).
    // The data low byte contains the playback status: stopped=0, playing=1, paused=2.
    // Microbit - Hacedores

    function readUntilResponseStart(): void {
        let startFound = false;
        while (true) {
            while (serial.available() > 0) {
                const c = serial.read();
                if (c == MP3Command.ResponseType.RESPONSE_START_BYTE) {
                    startFound = true;
                } else if (startFound && c == MP3Command.ResponseType.RESPONSE_VER_BYTE) {
                    return;
                } else {
                    startFound = false;
                }
            }
            basic.pause(200);
        }
    }

    function readSerial() {
        serial.setRxBufferSize(32)
<<<<<<< HEAD

        const buffer: Buffer = pins.createBuffer(10);

        buffer.setNumber(
            NumberFormat.UInt8LE,
            0,
            MP3Command.ResponseType.RESPONSE_START_BYTE
        );
        buffer.setNumber(
            NumberFormat.UInt8LE,
            1,
            MP3Command.ResponseType.RESPONSE_VER_BYTE
        );
        let cont = 0;
        while (true) {
            readUntilResponseStart();

            let bufferIndex = 2;
            while (serial.available() > 0 && bufferIndex < 10) {
                const c = serial.read();
                buffer.setNumber(NumberFormat.UInt8LE, bufferIndex, c);
                bufferIndex++;
            }

            const response = MP3Command.decodeResponse(buffer);
            handleResponse(response);
        }
    }

    function handleResponse(response: MP3Command.Response) {
        switch (response.type) {
            case MP3Command.ResponseType.TRACK_NOT_FOUND:
                basic.showNumber(0);
                break;
            case MP3Command.ResponseType.FOLDER_TRACK_COUNT:
                informationDevice.max_tracks_folder = response.payload;
                break;
            case MP3Command.ResponseType.FOLDER_COUNT:
                informationDevice.max_folder = response.payload;
                break;
            case MP3Command.ResponseType.CURRENT_TRACK:
                informationDevice.current_track = response.payload;
            default:
                break;
        }
    }

    interface informationDevice{
        current_track: uint16;
        current_folder: uint8;
        playFolder: boolean;
        max_folder: uint8;
        max_tracks_folder: uint16;
    }

    let informationDevice : informationDevice = undefined;
=======

        const buffer: Buffer = pins.createBuffer(10);

        buffer.setNumber(
            NumberFormat.UInt8LE,
            0,
            MP3Command.ResponseType.RESPONSE_START_BYTE
        );
        buffer.setNumber(
            NumberFormat.UInt8LE,
            1,
            MP3Command.ResponseType.RESPONSE_VER_BYTE
        );
        let cont = 0;
        while (true) {
            readUntilResponseStart();

            let bufferIndex = 2;
            while (serial.available() > 0 && bufferIndex < 10) {
                const c = serial.read();
                buffer.setNumber(NumberFormat.UInt8LE, bufferIndex, c);
                bufferIndex++;
            }

            const response = MP3Command.decodeResponse(buffer);
            handleResponse(response);
        }
    }

    function handleResponse(response: MP3Command.Response) {
        switch (response.type) {
            case MP3Command.ResponseType.TRACK_NOT_FOUND:
                basic.showNumber(0);
                break;
            case MP3Command.ResponseType.FOLDER_TRACK_COUNT:
                informationDevice.max_tracks_folder = response.payload;
                break;
            case MP3Command.ResponseType.FOLDER_COUNT:
                informationDevice.max_folder = response.payload;
                break;
            case MP3Command.ResponseType.CURRENT_TRACK:
                informationDevice.current_track = response.payload;
            default:
                break;
        }
    }

    interface informationDevice {
        current_track: uint16;
        current_folder: uint8;
        playFolder: boolean;
        max_folder: uint8;
        max_tracks_folder: uint16;
    }

    let informationDevice: informationDevice = undefined;
>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
    let max_tracks_folder: number = 0;
    /**
     * Connect to the serial MP3 device
     * @params tx (P0) is the transmitter pin (TX) on Microbit
     * @params rx (P1) is the receiver pin (RX) on Microbit
     */
    //% subcategory="MP3"
    //% block="MP3 device RX to %tx|TX to %rx"
<<<<<<< HEAD
    export function connectMP3(tx: SerialPin, rx: SerialPin): void{
        serial.redirect(tx,rx,BaudRate.BaudRate9600);
=======
    export function connectMP3(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(tx, rx, BaudRate.BaudRate9600);
>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98

        informationDevice = {
            current_track: 1,
            current_folder: 0,
            max_folder: 99,
            playFolder: false,
            max_tracks_folder: 255
        };

        basic.pause(500);
        sendCommand(MP3Command.selectDevice());
        basic.pause(500);
        sendCommand(MP3Command.stop());
    }

    /**microbit-Hacedores
    */
<<<<<<< HEAD
    
=======

>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
    /**
     * Play track
     * @params track 
     */
    //%subcategory="MP3"
    //%block="play MP3 track %track"
    //%track.min=1 track.max=255
    export function playTrack(track: number): void {
        informationDevice.current_track = track;
        informationDevice.playFolder = false;
        basic.pause(500);
        sendCommand(MP3Command.playTrack(track));
    }

    /** Plays a track from a Folder
     * @params track track index, eg:1
     * @params folder folder index, eg:1
     */
    //%subcategory="MP3"
    //%block="play MP3 track %track | from folder %folder"
    //%track.min=1 track.max=255
    //%folder.min=1 folder.max=99
<<<<<<< HEAD
    export function playMP3TrackFromFolder(track: number, folder: number): void{;
=======
    export function playMP3TrackFromFolder(track: number, folder: number): void {
        ;
>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
        informationDevice.current_folder = folder;
        informationDevice.current_track = track;
        informationDevice.playFolder = true;
        basic.pause(500);
        sendCommand(MP3Command.playTrackFromFolder(track, folder));
        basic.pause(500);
        sendCommand(MP3Command.queryFolderTrackCount(folder));
        readSerial();
    }

    /**
     * Sets the volume
     * @param volume is in range from 0 to 30
     */
    //%subcategory="MP3"
    //%block="set MP3 volume to %volume"
    //%volume.min=0 volume.max=30
    export function setMP3Volume(volume: number): void {
        if (volume < 0 || volume > 30) {
            return;
        }
        basic.pause(500);
        sendCommand(MP3Command.setVolume(volume));
    }

    /**
     * Repeat tracks on specific folder
     * @param folder is in range from 0 to 99 
    */
    //%subcategory="MP3"
    //%block="repeat MP3 folder"
    /*export function repeatMP3Folder(): void {
        let folder = informationDevice.current_folder;
        if (folder < 0 || folder > 30) {
            return;
        }
        basic.pause(500);
        sendCommand(MP3Command.repeatFolder(folder));
    }*/

    /**
     * Repeat current track 
     * @param track is in range from 0 to 255 
    */
    //%subcategory="MP3"
    //%block="repeat MP3 current track from folder"
    export function repeatMP3CurrentTrack(): void {
<<<<<<< HEAD
        if(informationDevice.playFolder == true){
=======
        if (informationDevice.playFolder == true) {
>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
            let track = informationDevice.current_track;
            if (track < 0 || track > 255) {
                return;
            }
            basic.pause(500);
            sendCommand(MP3Command.stop());
            basic.pause(500);
            sendCommand(MP3Command.playTrack(track));
<<<<<<< HEAD
        }else{
=======
        } else {
>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
            return;
        }
    }

    /**
     * Sets of important functions to interact with the tracks MP3
     * @param increase volume to set up the volume
     * @param decrease volume to set down the volume
     * @param next track to play the next track
     * @param previous track to play the previous track
     * @param stop to stop the track
     * @param resume to resume the track
     * @param mute to mute the track
     * @param unmute to unmute the track
     */
    //%subcategory="MP3"
    //%block="MP3 functions %command"
    //%track.min=1 track.max=255
    export function runMP3Functions(command: Mp3Command): void {
<<<<<<< HEAD
        
=======

>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
        switch (command) {
            case Mp3Command.INCREASE_VOLUME:
                basic.pause(500);
                sendCommand(MP3Command.increaseVolume());
                break;
            case Mp3Command.DECREASE_VOLUME:
                basic.pause(500);
                sendCommand(MP3Command.decreaseVolume());
                break;
            case Mp3Command.PLAY_NEXT_TRACK:
<<<<<<< HEAD
                if(informationDevice.current_track < informationDevice.max_tracks_folder && informationDevice.playFolder == true){
                    basic.pause(500);
                    sendCommand(MP3Command.nextTrack());
                    informationDevice.current_track += 1;
                }else{
=======
                if (informationDevice.current_track < informationDevice.max_tracks_folder && informationDevice.playFolder == true) {
                    basic.pause(500);
                    sendCommand(MP3Command.nextTrack());
                    informationDevice.current_track += 1;
                } else {
>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
                    basic.pause(500);
                    sendCommand(MP3Command.nextTrack());
                }
                break;
            case Mp3Command.PLAY_PREVIOUS_TRACK:
                if (informationDevice.current_track > 1 && informationDevice.playFolder == true) {
                    basic.pause(500);
                    sendCommand(MP3Command.previousTrack());
                    informationDevice.current_track -= 1;
<<<<<<< HEAD
                }else{
=======
                } else {
>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
                    basic.pause(500);
                    sendCommand(MP3Command.previousTrack());
                }
                break;
            case Mp3Command.PAUSE:
                basic.pause(500);
                sendCommand(MP3Command.pause());
                break;
            case Mp3Command.STOP:
                basic.pause(500);
                sendCommand(MP3Command.stop());
                break;
            case Mp3Command.PLAY:
                basic.pause(500);
                sendCommand(MP3Command.resume());
                break;
            case Mp3Command.MUTE:
                basic.pause(500);
                sendCommand(MP3Command.mute());
                break;
            case Mp3Command.UNMUTE:
                basic.pause(500);
                sendCommand(MP3Command.unmute());
                break;
        }
    }

    /**
     * Function writes a buffer into serial communication
     * @param command command is a buffer
     */
    function sendCommand(command: Buffer): void {
        serial.writeBuffer(command)
    }

    export namespace MP3Command {

        export interface Response {
            type: ResponseType;
            payload?: number;
        }

        export const enum ResponseType {
            RESPONSE_INVALID = 0x00,
            RESPONSE_START_BYTE = 0x7e,
            RESPONSE_VER_BYTE = 0xff,
            RESPONSE_ENDING_BYTE = 0xef,
            TF_CARD_INSERT = 0x3a,
            TRACK_COMPLETED = 0x3d,
            TRACK_NOT_FOUND = 0x40,
            ACK = 0x41,
            PLAYBACK_STATUS = 0x42,
            VOLUME = 0x43,
            CURRENT_TRACK = 0x4c,
            FOLDER_TRACK_COUNT = 0x4e,
            FOLDER_COUNT = 0x4f,
        }

        export const enum CommandCode {
            PLAY_NEXT_TRACK = 0x01,
            PLAY_PREV_TRACK = 0x02,
            PLAY_TRACK = 0x03,
            INCREASE_VOLUME = 0x04,
            DECREASE_VOLUME = 0x05,
            SET_VOLUME = 0x06,
            REPEAT_TRACK = 0x08,
            SELECT_DEVICE = 0x09,
            RESET = 0x0C,
            PLAY = 0x0D,                          //Broadcast
            PAUSE = 0x0E,                           //Time Out
            PLAY_TRACK_FROM_FOLDER = 0x0F,
            STOP = 0x16,
            REPEAT_FOLDER = 0x17,
            REPEART_CURRENT_TRACK = 0x19,
            MUTE = 0x1A,
            QUERY_STATUS = 0x42,
            QUERY_VOLUME = 0x43,
            QUERY_TOTAL_TRACK_COUNT = 0x48,
            QUERY_TRACK = 0x4c,
            QUERY_FOLDER_TRACK_COUNT = 0x4e,
            QUERY_FOLDER_COUNT = 0x4f,
        }

        let commandBuffer: Buffer = undefined;

        export function composeSerialCommand(command: CommandCode, dataHigh: number, dataLow: number): Buffer {
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
        /**********************************************************************************/
        /*                         COMMAND FUNCTION CONFIG                                */
        /**********************************************************************************/

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

        export function selectDevice(): Buffer {
            return composeSerialCommand(CommandCode.SELECT_DEVICE, 0x00, 0x02);
        }

        export function resume(): Buffer {
            return composeSerialCommand(CommandCode.PLAY, 0x00, 0x00);
        }

        export function pause(): Buffer {
            return composeSerialCommand(0x0E, 0x00, 0x00);
        }

        export function stop(): Buffer {
            return composeSerialCommand(CommandCode.STOP, 0x00, 0x00);
        }

        export function playTrackFromFolder(track: number, folder: number): Buffer {
            return composeSerialCommand(CommandCode.PLAY_TRACK_FROM_FOLDER, folder, track);
        }

        export function queryStatus(): Buffer {
            return composeSerialCommand(CommandCode.QUERY_STATUS, 0x00, 0x00);
        }

        export function queryVolume(): Buffer {
            return composeSerialCommand(CommandCode.QUERY_VOLUME, 0x00, 0x00);
        }

        export function queryTrack(): Buffer {
            return composeSerialCommand(CommandCode.QUERY_TRACK, 0x00, 0x00);
        }

        export function queryFolderTrackCount(folder: number): Buffer {
            return composeSerialCommand(
                CommandCode.QUERY_FOLDER_TRACK_COUNT,
                0x00,
                folder
            );
        }

        export function queryFolderCount(): Buffer {
            return composeSerialCommand(CommandCode.QUERY_FOLDER_COUNT, 0x00, 0x00);
        }

        export function repeatFolder(folder: number): Buffer {
            return composeSerialCommand(CommandCode.REPEAT_FOLDER, folder, 0x02);
        }

        export function repeatTrack(track: number): Buffer {
            return composeSerialCommand(CommandCode.REPEART_CURRENT_TRACK, 0x00, track);
        }

        export function mute(): Buffer {
            return composeSerialCommand(CommandCode.MUTE, 0x00, 0x01);
        }

        export function unmute(): Buffer {
            return composeSerialCommand(CommandCode.MUTE, 0x00, 0x00);
        }
<<<<<<< HEAD
        
=======

>>>>>>> 18d50bac4456f9e04be494081ebc4bfa24aa3b98
        export function decodeResponse(response: Buffer): Response {
            if (response.length != 10) {
                return { type: ResponseType.RESPONSE_INVALID };
            }

            if (
                response.getNumber(NumberFormat.UInt8LE, 0) !=
                ResponseType.RESPONSE_START_BYTE
            ) {
                return { type: ResponseType.RESPONSE_INVALID };
            }

            if (
                response.getNumber(NumberFormat.UInt8LE, 1) !=
                ResponseType.RESPONSE_VER_BYTE
            ) {
                return { type: ResponseType.RESPONSE_INVALID };
            }

            if (
                response.getNumber(NumberFormat.UInt8LE, 9) !=
                ResponseType.RESPONSE_ENDING_BYTE
            ) {
                return { type: ResponseType.RESPONSE_INVALID };
            }

            const type = response.getNumber(NumberFormat.UInt8LE, 3);
            const payload =
                (response.getNumber(NumberFormat.UInt8LE, 5) << 8) |
                response.getNumber(NumberFormat.UInt8LE, 6);

            return { type: type, payload: payload };
        }

        /**
         * Example: If we would like first song play, the MP3 response with:
         *  7E FF 06 03 00 00 01 FF E6 EF = 10 bits
         *  7E -- Start command
         *  FF -- Version information
         *  06 -- Data length
         *  03 -- Item selection
         *  00 -- whether to answer[0x01: need answer, 0x00: not return answer]
         *  00 -- [DH Track] Remember that track's range is 0-255
         *  01 -- [DL Track]
         *  FF -- High byte checksum
         *  E6 -- Low byte checksum
         *  EF -- End command
         */
    }
}
