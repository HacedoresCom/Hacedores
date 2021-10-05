input.onButtonPressed(Button.A, function () {
    hacedores.runMP3Functions(Mp3Command.UNMUTE)
})
input.onButtonPressed(Button.AB, function () {
    hacedores.runMP3Functions(Mp3Command.INCREASE_VOLUME)
})
input.onButtonPressed(Button.B, function () {
    hacedores.runMP3Functions(Mp3Command.MUTE)
})
hacedores.connectMP3(SerialPin.P1, SerialPin.P0)
hacedores.setMP3Volume(20)
hacedores.playMP3TrackFromFolder(1, 1)
