function analogToTDS (analogValue: number) {
    return Math.round(analogValue / 10)
}
function SendData () {
    // Affiche la tension pendant 1 seconde
    basic.pause(2000)
    // Envoi de la valeur du pH à ThingSpeak en temps réel sur Field 1
    // Envoie la valeur du pH dans Field 1
    DFRobotWiFiIoTI2C.ThingSpeakSend("" + roundedPH, "" + tdsValue, "" + Tubidity)
    // Affiche la tension pendant 1 seconde
    basic.pause(2000)
}
function Pompes () {
    pins.digitalWritePin(DigitalPin.P16, 1)
    pins.digitalWritePin(DigitalPin.P15, 0)
    // Affiche la tension pendant 1 seconde
    basic.pause(2000)
    getData()
    // Affiche la tension pendant 1 seconde
    basic.pause(5000)
    pins.digitalWritePin(DigitalPin.P16, 0)
    pins.digitalWritePin(DigitalPin.P15, 1)
    // Affiche la tension pendant 1 seconde
    basic.pause(5000)
}
function convertToPH (a: number) {
    // Tensions de calibration pour les solutions tampons de pH 4 et pH 7
    // Tension pour pH 4
    tension_min = 1.65
    // Tension pour pH 7
    tension_max = 2.75
    // pH à tension_min
    pH_min = 6
    // pH à tension_max
    pH_max = 8
    // Conversion linéaire de la tension en pH
    pH = (a - tension_min) / (tension_max - tension_min) * (pH_max - pH_min) + pH_min + 2
    return pH
}
function getData () {
    rawTDS = pins.analogReadPin(AnalogReadWritePin.P10)
    tdsValue = analogToTDS(rawTDS)
    // Lire la valeur analogique
    rawPH = pins.analogReadPin(AnalogReadWritePin.P0)
    // Convertir en tension (0 à 3.3V)
    tension = rawPH * 3.3 / 1024
    // Calculer la valeur de pH
    pHValue = convertToPH(tension)
    // Arrondir la tension à 2 décimales
    // Arrondi à 2 décimales
    roundedTension = Math.round(tension * 100) / 100
    // Arrondir la valeur du pH à 2 décimales
    // Arrondi à 2 décimales
    roundedPH = Math.round(pHValue * 100) / 100
    Tubidity = pins.digitalReadPin(DigitalPin.P6)
}
let roundedTension = 0
let pHValue = 0
let tension = 0
let rawPH = 0
let rawTDS = 0
let pH = 0
let pH_max = 0
let pH_min = 0
let tension_max = 0
let tension_min = 0
let Tubidity = 0
let tdsValue = 0
let roundedPH = 0
DFRobotWiFiIoTI2C.WIFISetup("jery", "00770077")
DFRobotWiFiIoTI2C.ThingSpeakConfigure("6U6SANA0WHOXUEDC")
basic.forever(function () {
    getData()
    SendData()
})
