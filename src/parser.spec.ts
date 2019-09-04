import { isFfmpegProgressLine, parse, ParserRet } from './parser';

const mockProgressLine = 'frame= 3840 fps=1517 q=-1.0 size=  413696kB time=00:02:40.61 bitrate=21099.8kbits/s dup=0 drop=0 speed=63.5x';
const mockNoneProgressLine = 'ffmpeg version 4.1.3 Copyright (c) 2000-2019 the FFmpeg developers';

const mockProgressExpectedObject: ParserRet = {
    bitrate: '21099.8',
    drop: '0',
    dup: '0',
    fps: '1517',
    frame: '3840',
    q: '-1.0',
    size: '413696',
    speed: '63.5',
    time: '00:02:40.61',
};

it('Should accurate parse ffmpeg progress string', () => {
    const parsed = parse({
        ffProgressLine: mockProgressLine,
    });

    expect(parsed)
        .toMatchObject(mockProgressExpectedObject);
});

it('Should return false for non-progress string', () => {
    const isProgressLine = isFfmpegProgressLine(mockNoneProgressLine);

    expect(isProgressLine).toBeFalsy();
});
