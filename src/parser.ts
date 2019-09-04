interface ParserProps {
    ffProgressLine: string;
}

interface ParserRet {
    frame: string;
    fps: string;
    q: string;
    size: string;
    time: string;
    bitrate: string;
    dup: string;
    drop: string;
    speed: string;
}

/**
 * Parses an ffmpeg progress line.
 *
 * @param {ParserProps} props
 * @returns {(ParserRet | undefined)}
 */
function parse(props: ParserProps): ParserRet | undefined {
    if (!isFfmpegProgressLine(props.ffProgressLine)) {
        return;
    }

    const fields: Array<keyof ParserRet> = [
        'frame',
        'fps',
        'q',
        'size',
        'time',
        'bitrate',
        'dup',
        'drop',
        'speed',
    ];

    const parsed = fields.reduce(
        (acc, field) => ({
            ...acc,
            [field]: findProgressLineField(props.ffProgressLine, field),
        }),
        {} as ParserRet);

    return parsed;
}

function findProgressLineField(line: string, field: string) {
    /**
     * Typical progress line: 'frame= 3840 fps=1517 q=-1.0 size=  413696kB
     * time=00:02:40.61 bitrate=21099.8kbits/s dup=0 drop=0 speed=63.5x'
     */
    const regExp = new RegExp(field + '[\\s=]+([\\d.:-]+)');
    const found = line.match(regExp);

    if (found) {
        return found[1];
    }
}

/**
 * Tests whether the string is an ffmpeg progress line.
 *
 * @param {string} ffmpegLogChunk
 * @returns {boolean}
 */
function isFfmpegProgressLine(ffmpegLogChunk: string) {
    return /^frame=/.test(ffmpegLogChunk);
}

export {
    isFfmpegProgressLine,
    ParserProps,
    ParserRet,
    parse,
};
