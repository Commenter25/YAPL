/*! @license Yet Another PreLoader v1.0.1 | Copyright (c) 2023 Commenter25 | MIT License  */
/* @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt MIT License */
/* jshint esversion: 6, browser: true, devel: true, strict: global */ "use strict";

let YAPLloaded = 0, YAPLfailed = 0; 

/**
 * @param {string} filename - String ending with a file extension, like "cool-img.webp" or "wacky-sound.ogg"
 * @returns {string} Returns the file extension at the end of a string.
 * @author Tomalak // https://stackoverflow.com/a/680982
 */
function getExtension(string) {
	return /(?:\.([^.]+))?$/.exec(string)[1];
}

/**
 * Adds a series of files to the DOM so the browser caches them
 * @param {string} location - Path containing all files, relative to the current page
 * @param {array} files - Array of strings with file paths relative to folder param - If using in ANY non-localhost context, KEEP AS SHORT AS POSSIBLE!!!!
 * @param {function} whenDone - Optional - Runs when all files have been parsed
 * @param {function} whenIncr - Optional - Runs every time a file is parsed, useful for progress indication
 * @param {function} onFail - Optional - For the event of complete failure - Using the phrase "Something has gone horribly wrong!" somewhere is recommended
 * @returns {Promise} Promise resolving when all files have been parsed
 * @throws Returns false and logs an exception to console if not given an array
 */ 
function YAPLload(location, files, whenDone = false, whenIncr = false, onFail = false) {
try { return new Promise( (resolve)=> {
	if (files === undefined || !Array.isArray(files)) {
		throw "Was not given an array in the files parameter!";
	}

	// always have folder end in a slash, unless blank, so it makes a file path
	let folder = location;
	if (folder !== "" && folder.slice(-1) !== "/") folder = folder + '/';

	const tagLoader = document.createElement("div");
	tagLoader.id = "yet-another-preloader";
	tagLoader.style = "position: fixed; top: 99.9vh; left: 0; display: flex; opacity: 0.01; user-select: none; pointer-events: none";
	tagLoader.setAttribute('aria-hidden', 'true');
	document.body.prepend(tagLoader);

	const increment = worked => {
		worked ? YAPLloaded++ : YAPLfailed++; // jshint ignore:line
		if (whenIncr) whenIncr();
		
		if (YAPLloaded + YAPLfailed === files.length) {
			console.log(`YAPL: Execution complete! ${YAPLloaded} successful, ${YAPLfailed} failed`);
			if (whenDone) whenDone(); 
			resolve();
		}
	};

	const loadTag =(tag, file)=> {
		let done = false;
		function good() {
			if (done) return;
			// console.log(`YAPL: ${file} loaded successfully!`);
			tagLoader.appendChild(tag);
			increment(true); done = true;
		}
		function bad() {
			if (done) return;
			console.error(`YAPL: ${file} couldn't load!`);
			increment(false); done = true;
		}
	
		tag.src = file;
		tag.style.width = "1px"; tag.style.height = "1px";
		tag.tabIndex = -1;
		tag.setAttribute('aria-hidden', 'true');
		tag.alt = "";
		tag.controls = true;
		tag.addEventListener("load", good);
		tag.addEventListener("canplay", good);
		tag.addEventListener("error", bad);
		return true; // returns loadFile as true
	};

	const loadFile =(file, type)=> {
		let tag;
		switch (type) {
			// images
			case "webp": case "png": case "gif":
			case "jpg": case "jpeg": case "avif":
				tag = new Image();
				return loadTag(tag, file);
			// sounds
			case "ogg": case "mp3": case "wav":
				tag = new Audio();
				return loadTag(tag, file);
			// videos
			case "webm": case "mp4":
				tag = document.createElement("video");
				return loadTag(tag, file);
			default:
				console.error(`YAPL: ${file} is unrecognized file type ${type}!`);
				return false;
		}
	};

	for (let i of files) loadFile(folder + i, getExtension(i));
	
	console.log(`YAPL: Attempting to load all files...`);
});} catch (e) {
	console.error("YAPL: Execution failure! " + e);
	if (onFail) onFail(); 
	return false;
}}

/* @license-end */
