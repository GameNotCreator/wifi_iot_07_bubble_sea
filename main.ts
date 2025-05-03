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
let roundedPH = 0
let roundedTension = 0
let pHValue = 0
let tension = 0
let rawValue = 0
let pH = 0
let pH_max = 0
let pH_min = 0
let tension_max = 0
let tension_min = 0
DFRobotWiFiIoTI2C.WIFISetup("jery", "00770077")
DFRobotWiFiIoTI2C.ThingSpeakConfigure("6U6SANA0WHOXUEDC")
basic.forever(function () {
    // Lire la valeur analogique
    rawValue = pins.analogReadPin(AnalogPin.P0)
    // Convertir en tension (0 à 3.3V)
    tension = rawValue * 3.3 / 1024
    // Calculer la valeur de pH
    pHValue = convertToPH(tension)
    // Arrondir la tension à 2 décimales
    // Arrondi à 2 décimales
    roundedTension = Math.round(tension * 100) / 100
    // Arrondir la valeur du pH à 2 décimales
    // Arrondi à 2 décimales
    roundedPH = Math.round(pHValue * 100) / 100
    // Afficher la tension mesurée et la valeur du pH sur le micro:bit
    // Afficher la tension mesurée
    basic.showNumber(roundedTension)
    // Affiche la tension pendant 1 seconde
    basic.pause(1000)
    // Effacer l'écran avant d'afficher le pH
    basic.clearScreen()
    // Afficher le pH calculé
    basic.showNumber(roundedPH)
    // Envoi de la valeur du pH à ThingSpeak en temps réel sur Field 1
    // Envoie la valeur du pH dans Field 1
    DFRobotWiFiIoTI2C.ThingSpeakSend("" + roundedPH)
    // Envoi chaque 2 secondes (ajuste cette valeur si nécessaire)
    basic.pause(2000)
})
