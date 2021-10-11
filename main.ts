input.onButtonPressed(Button.A, function () {
    hacedores.runMP3Functions(Mp3Command.PLAY_PREVIOUS_TRACK)
})
input.onButtonPressed(Button.AB, function () {
    hacedores.runMP3Functions(Mp3Command.INCREASE_VOLUME)
})
input.onButtonPressed(Button.B, function () {
    hacedores.runMP3Functions(Mp3Command.PLAY_NEXT_TRACK)
})
hacedores.connectMP3(SerialPin.P0, SerialPin.P1)
hacedores.setMP3Volume(20)
hacedores.playMP3TrackFromFolder(1, 1)
