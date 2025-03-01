<!-- markdownlint-disable MD033 -->
# <img src="logo.svg" alt="" style="display:inline; height:1em; position:relative; top: 4px"> YAPL - Yet Another PreLoader
The simplest JavaScript preloader I could think of. Probably too simple. Actually, definitely too simple, you probably don't want to use this. But you can try!

Made for [Crazy Chrimble Catastrophy](https://chrimble.commenter.cc/), because everything else I found looked complicated and scary, so I just made my own thing because I'm insane. Released as I felt others might find it useful. Or interesting. Or something. Besides the rest of that game, this is my first JavaScript project, so it sucks. This requires ES6, but it's so basic I think it could be refactored for ES3. I won't, because if you want that, I think you're probably more insane than me.

Every file will be added to the DOM as a 1x1 pixel with 0.01 opacity, all within a div the script creates for you, which is fixed to the bottom left of the viewport. Everything is technically always visible and therefore the browser should always load and cache it, but it should be imperceivable to any human. If anyone spots it, say it's a reference to CRAM dots, because it is ;D

## Basic usage
All you have to do is pass two parameters to `YAPLload()`.

The first is the folder which contains every link you want to pass to. This could be `""` to just use the current page, `"/"` for root, or something like `"/assets"` to avoid restating that folder over and over.

The second is an array of file paths, relative to the first parameter. It can look something like the following code block:

```javascript
const assets = [
  "img/cool-img.webp",
  "snd/wacky-sound.ogg"
];
```

These parameters will be combined to make a full path, like `"/assets/img/cool-img.webp"` and `"/assets/snd/wacky-sound.ogg"`.

If you use this ANYWHERE besides your own machine, ***KEEP YOUR LIST AS SHORT AS POSSIBLE!*** It will request all files in parallel at once, and HTTP requests add up fast. Spritesheets recommended!

## Using functions

You can optionally pass 4 functions in order: one for after all files are parsed, one for every time a file's parsed, one for every time a file fails to load, and one if YAPL completely fails. For the third function, if you want to stop loading if one file is inaccessible, you can `return true`. Two variables are also accessible, `YAPLloaded`, `YAPLfailed`. You can add these together to get the total number of files processed. There is also `YAPLtag` to access the element which files are loaded into.

I personally loaded YAPL with defer, then contained my assets and functions in a `DOMContentLoaded` listener. For each file, it updated a loading indicator in a disabled button. Then when done, it'd add a new `<script>` tag to `<head>`, loading a script contained all my actual code, which I only wanted to run once everything was loaded. In my new script, I activated the button to allow starting the game. If anything failed, I wouldn't tolerate it, I'd simply shut everything down. Here's an code block showing that usage:

```javascript
document.addEventListener("DOMContentLoaded", ()=> {
  const folder = "/assets";
  const assets = [
    "img/cool-img.webp",
    "snd/wacky-sound.ogg"
  ];

  function done() {
    const tag = document.createElement('script');
    tag.src = "assets/js/main.js";
    document.head.appendChild(tag);
  }

  function incr() {
    document.getElementById("loadbutton").innerHTML = `Loading... ${YAPLloaded + "/" + assets.length}`;
  }

  function fail() {
    document.getElementById("loadbutton").innerHTML = "Something has gone horribly wrong!";
    return true;
  }

  YAPLload(folder, assets, done, incr, fail, fail);
});
```
