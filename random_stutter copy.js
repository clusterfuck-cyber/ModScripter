// Random Stutter Effect Modulation
// This script creates a quantized random stutter effect for track volume modulation

// Script name and description
name = "Random Stutter";
description = "Applies a quantized random stutter effect";

// Parameter definitions
param1 = {
    name: "Rate",
    type: "list",
    defaultValue: 3,
    values: ["1/1", "1/2", "1/4", "1/8", "1/16", "1/32"],
    valueStrings: ["1/1", "1/2", "1/4", "1/8", "1/16", "1/32"]
};

param2 = {
    name: "Depth",
    type: "float",
    defaultValue: 1.0,
    minValue: 0.0,
    maxValue: 1.0
};

param3 = {
    name: "Probability",
    type: "float",
    defaultValue: 0.5,
    minValue: 0.0,
    maxValue: 1.0
};

param4 = {
    name: "Pulse Width",
    type: "float",
    defaultValue: 0.5,
    minValue: 0.1,
    maxValue: 0.9
};

// Internal state variables
var currentValue = 1.0;
var stutterActive = true;  // Always keep stutter active

// Rate value mapping
var rateValues = [1/5, 1/4, 1/3, 1/2, 1, 3/2, 4/3, 2];

// Variables for random rate changes
var lastRateChangeTime = 0;
var currentRateIndex = 3; // Start with a default rate
var previousRateIndex = -1; // Store the previous rate to avoid repeats

/**
 * processModulation: Process the stutter effect modulation
 * 
 * @param {number} inputValue - the normalized value of the input value [0..1]
 * @param {number} numSamples - the number of samples the modulation value should advance [0..]
 * @param {number} sampleOffsetInAudioBlock - the offset in number of samples inside the current audio block [0..]
 * @param {number} audioBlockSize - number of samples of the current audio block [0..]
 * @return {number} - the output modulation value [0..1]
 */
processModulation = function(inputValue, numSamples, sampleOffsetInAudioBlock, audioBlockSize) {
    // Get current beat position
    var beat = getProjectTimeMusic();
      // Check if we should change the rate (every 1/8 bar = 0.5 beats)
    // A bar is typically 4 beats, so 1/8 of a bar is 0.5 beats
    var rateChangeCycle = Math.floor(beat / 0.5);
    if (rateChangeCycle > Math.floor(lastRateChangeTime / 0.5)) {
        // Store the current rate index before changing it
        previousRateIndex = currentRateIndex;
        
        // Time to change the rate - randomly select a new rate
        var newRateIndex;
        do {
            newRateIndex = Math.floor(Math.random() * rateValues.length);
        } while (newRateIndex === previousRateIndex); // Ensure we don't pick the same rate twice
        
        currentRateIndex = newRateIndex;
        lastRateChangeTime = beat;
    }
    
    // Safety check: If the beat position jumps backward (like when playback is restarted),
    // reset our timing variables to prevent the modulation from getting stuck
    if (beat < lastRateChangeTime) {
        lastRateChangeTime = beat;
    }
    
    // Get parameter values
    var rateIndex = Math.floor(param1.value); // This is for UI display, but we'll use our random rate
    var rate = rateValues[currentRateIndex]; // Use the randomly selected rate
    var depth = param2.value;
    var probability = param3.value;
    var pulseWidth = param4.value;
    
    // Always have the effect active
    var beatInterval = 4 / rate; // Convert rate to beat interval
    
    // Calculate reference points for our timing
    var currentBeatCycle = Math.floor(beat / beatInterval) * beatInterval;
    
    // Always use continuous stutter effect
    // Create rapid volume changes at the specified rate
    var microRate = rate * 4; // Faster rate for the stutter effect
    var microBeat = (beat * microRate) % 1;
    
    // Simple square wave pattern
    if (microBeat < 0.5) {
        currentValue = 1.0; // On
    } else {
        // Apply depth to control how much the volume drops during stutter
        currentValue = 1.0 - depth;
    }
    
    // Apply the input value as a multiplier
    return currentValue * inputValue;
}