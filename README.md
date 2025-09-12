# CUDO Plays game grid

## Getting started

`npm install`

`npm run dev`

## Technology

Content is stored in [Sanity](https://www.sanity.io/).

This widget uses Preact instead of React.

Zod is used to parse the content from Sanity into something typed.

## Build

`npm run build`

The output is in `dist`. The script and css can be copied or uploaded where ever you desire.

## Usage

For usage on Squarespace, you must host the script and css on another server.
You cannot host any random files on Squarespace.

Where ever you host them, you must make sure the `Access-Control-Allow-Origin` header is set to `*` so they
can be used cross-domain in browsers.

The files you upload will begin with `index` and then have random characters append. For example, `index-DUSFmbyG.js`.
This is convenient because it will bust user's browser cache if you rebuild the files.

You can then embed them into a Squarespace page using an "Embed Scripts" block with the following:

```
<div id="cudo-game-grid"></div>
<script type="module" crossorigin src="https://yourhost.net/index-DUSFmbyG.js"></script>
<link rel="stylesheet" crossorigin href="https://yourhost.net/index-CuVbqRIk.css">
```