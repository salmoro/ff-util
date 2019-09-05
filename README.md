# FF Util
A set of useful utilities for running ffmpeg with node

[![Build Status](https://dev.azure.com/shlomorosow/ffmpeg-utils/_apis/build/status/salmoro.ff-util?branchName=master)](https://dev.azure.com/shlomorosow/ffmpeg-utils/_build/latest?definitionId=1&branchName=master)

## Installation
First make sure you have the ffmpeg binary [downloaded](https://ffmpeg.org/download.html) and globally accessible on your machine.

Next, install FF Util via NPM:
```sh
npm install ff-util
```

## Usage
```ts
import { run } from 'ff-util';

const args = [
    '-i', './video.mov',
    './video.mp4'
]

run({args})
    .then(() => console.log('process complete!'))
```
With parsed progress:

```ts
import { run, parse } from 'ff-util';

const args = [
    '-i', './video.mov',
    './video.mp4'
]

const logger = (stdOut: string) => {
    const parsed = parse({ffProgressLine: stdOut})
    console.log({parsed})
}

run({args, logger})
    .then(() => console.log('process complete!'))
```

## Planned features

| Feature                            | Status
| ------------------------           | ---------------------------------------- |
| Simple Runner                      | ✅                                       | 
| Progress Parser                    | ✅                                       |
| Progress Percent & ETA             | ❌                                       |
| Pause/Resume process               | ❌                                       |
| Structured & typed ffmpeg args     | ❌                                       |
| Process splitter and restitcher for parallel encoding \*     | ❌  |
(\*) Useful for blazing-fast transcoding in a distributed infrastructure like Kubernetes, AWS Lambda, etc.