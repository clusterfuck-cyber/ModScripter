
/* ----------------------------------------------------------------------------------
The functions a script can call anytime:
 
 function log (...) -> {void}
	log something to the log console
 
 function getSampleRate () -> {Number}
	get the current sample rate
 
 function normalizedToPlain(min, max, normValue) -> {Number}
	convert a normalized value to a plain value
 
 function plainToNormalized(min, max, plainValue) -> {Number}
	convert a plain value to a normalzied value
 
 function normalizedToSteps(normValue, numSteps, stepStart) -> {Number}
	convert a normalized value to a step value
 
 function stepsToNormalized (plainValue, numSteps, stepStart) -> {Number}
	convert a step value to a normalized value
---------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------------
The functions a script can only call inside of the following functions
	- processModulation
	- processSidechain
	- onNoteOnEvent
	- onNoteOffEvent
	- onParamChange
	- onTransportStateChanged

 function getTempo() -> {Number}
	returns the current tempo
 	
 function getProjectTimeMusic() -> {Number}
	returns the current musical position in quarter notes (1. equals 1 quarter note)

 function getBarPositionMusic() -> {Number}
	returns the last bar start position, in quarter notes
---------------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------------- */
/* ----- Below are the functions a script can implement for custom behaviour ----- */
/* ------------------------------------------------------------------------------- */

/**
 * processModulation: process modulation function [required]
 *
 * @param  {number} inputValue - the normalized value of the input value [0..1]
 * @param  {number} numSamples - the number of samples the modulation value should advance [0..]
 * @param  {number} sampleOffsetInAudioBlock - the offset in number of samples inside the current audio block [0..]
 * @param  {number} audioBlockSize - number of samples of the current audio block [0..]
 * @return {number} - the output modulation value [0..1]
 */
processModulation = function (inputValue, numSamples, sampleOffsetInAudioBlock, audioBlockSize) {
	return inputValue;
}

/**
 * processSidechain: process side-chain function [optional]
 *
 * @param  {number} minSample - the minimum sample in the side-chain buffer [-1..1]
 * @param  {number} maxSample - the maximum sample in the side-chain buffer [-1..1]
 * @param  {number} minAbsSample - the minimum absolute sample in the side-chain buffer [0..1]
 * @param  {number} maxAbsSample - the maximum absolute sample in the side-chain buffer [0..1]
 * @param  {number} numSamples - number of samples in the side-chain buffer [0..]
 * @return {void}
 */
processSidechain = function (minSample, maxSample, absMinSample, absMaxSample, numSamples) {
}

/**
 * onNoteOnEvent: process note-on function [optional]
 *
 * @param  {number} channel - the channel of the note-on [0..]
 * @param  {number} pitch - the pitch of the note [0..127] = [C-2, G8] with A3=440Hz (12-TET: twelve-tone equal temperament)
 * @param  {number} velocity - the velocity of the note-on [0..1]
 * @param  {number} tuning - the tuning of the note-on: 1.0 = +1 cent, -1.0 = -1 cent
 * @param  {number} noteID - the unique note identifier
 * @return {void}
 */
onNoteOnEvent = function (channel, pitch, velocity, tuning, noteID) {
}

/**
 * onNoteOffEvent: process note-off function [optional]
 *
 * @param  {number} channel - the channel of the note-off [0..]
 * @param  {number} pitch - the pitch of the note [0..127] = [C-2, G8] with A3=440Hz (12-TET: twelve-tone equal temperament)
 * @param  {number} velocity - the velocity of the note-off [0..1]
 * @param  {number} tuning - the tuning of the note-off: 1.0 = +1 cent, -1.0 = -1 cent
 * @param  {number} noteID - the unique note identifier
 * @return {void}
 */
onNoteOffEvent = function (channel, pitch, velocity, tuning, noteID) {
}

/**
 * onParamChange: process parameter change function [optional]
 *
 * @param  {number} paramIndex - the index of the parameter [1..8]
 * @param  {number} newValue - the new value for the parameter [0..1]
 * @return {void}
 */
onParamChange = function (paramIndex, newValue) {
}

/**
 * onTransportStateChanged: transport state changed function [optional]
 *
 * @param  {number} projectTimeInSamples
 * @param  {number} playing
 * @param  {number} recording
 * @param  {number} cycleActive
 * @param  {number} timeJump
 * @return {void}
 */
onTransportStateChanged = function (projectTimeInSamples, playing, recording, cycleActive, timeJump) {
}

/**
 * paramValueToString: convert parameter value to string function [optional]
 *
 * @param  {number} paramIndex - the index of the parameter [1..8]
 * @param  {number} paramValue - the value for which to generate a string [0..1]
 * @return {string} - the value as a user readable string
 */
paramValueToString = function (paramIndex, paramValue) {
}

/**
 * stringToParamValue: convert a string to a parameter value function [optional]
 *
 * @param  {number} paramIndex - the index of the parameter [1..8]
 * @param  {string} string - the string the user has entered and should be converted to a parameter value
 * @return {number} - the value represented by the string [0..1]
 */
stringToParamValue = function (paramIndex, string) {
}

/**
 * getParamTitle: get parameter title function [optional]
 *
 * @param  {number} paramIndex - the index of the parameter [1..8]
 * @return {string} - the name of the parameter
 */
getParamTitle = function (paramIndex) {
	if (paramIndex == 1)
		return "";
	if (paramIndex == 2)
		return "";
	if (paramIndex == 3)
		return "";
	if (paramIndex == 4)
		return "";
	if (paramIndex == 5)
		return "";
	if (paramIndex == 6)
		return "";
	if (paramIndex == 7)
		return "";
	if (paramIndex == 8)
		return "";
}

/**
 * getParamStepCount: get the step count of a parameter function [optional]
 *
 * @param  {number} paramIndex - the index of the parameter [1..8]
 * @return {number} - the number of discrete steps for the parameter, zero means no steps at all
 */
getParamStepCount = function (paramIndex) {
	return 0;
}

/**
 * getDescription: get description function [optional]
 *
 * @return {string} - the name of this script that is shown in the UI if set
 */
getDescription = function () {
	return "";
}

/* ----------------------------------------------------------------------------------
You can control the parameters via MIDI-CC messages:

Mod Wheel                    -> Input Parameter
General Purpose Controller 1 -> Parameter 1
General Purpose Controller 2 -> Parameter 2
General Purpose Controller 3 -> Parameter 3
General Purpose Controller 4 -> Parameter 4
General Purpose Controller 5 -> Parameter 5
General Purpose Controller 6 -> Parameter 6
General Purpose Controller 7 -> Parameter 7
General Purpose Controller 8 -> Parameter 8

---------------------------------------------------------------------------------- */