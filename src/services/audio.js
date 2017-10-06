// adapted from: https://code.tutsplus.com/tutorials/the-web-audio-api-adding-sound-to-your-web-app--cms-23790

const context = new AudioContext()

const playNote = (frequency, startTime, duration) => {
  const osc1 = context.createOscillator(),
    osc2 = context.createOscillator(),
    volume = context.createGain()

  // Set oscillator wave type
  osc1.type = 'triangle'
  osc2.type = 'triangle'

  volume.gain.value = 0.1

  // Set up node routing
  osc1.connect(volume)
  osc2.connect(volume)
  volume.connect(context.destination)

  // Detune oscillators for chorus effect
  osc1.frequency.value = frequency + 1
  osc2.frequency.value = frequency - 2

  // Fade out
  volume.gain.setValueAtTime(0.1, startTime + duration - 0.05)
  volume.gain.linearRampToValueAtTime(0, startTime + duration)

  // Start oscillators
  osc1.start(startTime)
  osc2.start(startTime)

  // Stop oscillators
  osc1.stop(startTime + duration)
  osc2.stop(startTime + duration)
}

export const playSuccessSound = () => {
  // Play a 'B' now that lasts for 0.116 seconds
  playNote(493.883, context.currentTime, 0.116)
  // Play an 'E' just as the previous note finishes, that lasts for 0.232 seconds
  playNote(659.255, context.currentTime + 0.116, 0.232)
}