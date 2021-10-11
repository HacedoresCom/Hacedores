
> Open this page at [https://hacedorescom.github.io/Hacedores/](https://hacedorescom.github.io/Hacedores/)

## Usage

Instructions how to use the Hacedores's blocks for Micro:Bit

### Ultrasonic sensor #hacedores-ultrasonicSensor

Calculate the distance either centimeters or inches from HC-SR04 sensor to any object

```sig
hacedores.ultrasonicSensor(
        DigitalPin.P0,
        DigitalPin.P1,
        UltrasonicUnits.Centimeters
    )
```
###Serial MP3 Player 

This extension was based on the library of Makerbit MP3 (https://github.com/1010Technologies/pxt-makerbit-mp3) and was modified in some functions.

This library was designed to communicate the MicroBit with the Serial MP3 Player by using blocks. This device has high-quality in audio, so that also supports MP3 and WAV file formats.

Before you can communicate whit this module, the microSD card needs to be formatted as FAT16 or FAT32. The files inside of this microSD card needs following the next pattern:

- First, the folder should be created and named using two-digit numbers as `01`, `02` and so on until `99` that is the maximum value.
- Second, the track should be named by using three-digit number as `001` followed for a point and the file extension as `001.mp3`,`002.wav` and so on. Maximum number to name the track is `255`, e.g either `255.wav` or `255.mp3`.

Also, you can put some tracks out of folders following the corresponding pattern, so you can reproduce them, too. 

The structure for files are:
```
|--001.mp3       
|--002.mp3
|--01/
|-----|-- 001.mp3
|-----|__ 002.mp3
|--02/
|-----|-- 001.mp3
|-----|-- 002.mp3
|-----|-- ...
|-----|__ 010.mp3
```
### MP3 connectMP3

Connects serially the Micro:Bit with the Serial MP3 Player. The first pin needs to attach the Serial MP3 Player receiver pin (RX) and the second pin needs to attach to Serial MP3 PLayer transmitter pin (RX).
```
hacedores.connectMP3(SerialPin.P0, SerialPin.P1)
```

### MP3 playTrack

Plays a track out of a folder

```
hacedores.playTrack(1)
```
### MP3 playMP3TrackFromFolder

Play a track from folder

```
hacedores.playMP3TrackFromFolder(1,1)
```
### Mp3 setMP3Volume

Set the volume

```
hacedores.setMP3Volume(20)
```
### Mp3 repeatMP3CurrentTrack

Repeat a track from folder

```
hacedores.repeatMP3CurrentTrack()
```
### Mp3 runMP3Functions

Dispatches a command to the Serial MP3 Player.

```
hacedores.runMP3Functions(Mp3Command.PLAY_NEXT_TRACK)
```

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/hacedorescom/Hacedores** and import

## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/hacedorescom/Hacedores/raw/master/.github/makecode/blocks.png)

## License

MIT

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
