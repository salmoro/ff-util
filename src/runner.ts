import { spawn } from "child_process";
import { PassThrough } from "stream";

interface RunnerProps {
    args: string[];
    binPath?: string;
    outputStream?: PassThrough;
    logger?: (output: string) => void;
}

interface RunnerRet {
    code: number;
    signal: string;
}

const defaultRunnerProps = {
    binPath: 'ffmpeg',
    logger: console.log,
    outputStream: new PassThrough(),
};

/**
 * Runs an ffmpeg process
 *
 * @param {RunnerProps} props
 * @returns {Promise<RunnerRet>}
 */
function run(props: RunnerProps): Promise<RunnerRet> {
    const {
        binPath,
        args,
        outputStream,
        logger,
    } = {
        ...defaultRunnerProps,
        ...props,
    };

    return new Promise<RunnerRet>(async (resolve, reject) => {
        const ffmpegProcess = spawn(
            binPath,
            args,
        );

        ffmpegProcess.stderr.on('data', (data) => {
            logger(data.toString());
        });

        ffmpegProcess.stdout.pipe(outputStream);

        ffmpegProcess.on('close', (code, signal) => {
            if (code === 0) {
                resolve({ code, signal });
            } else {
                reject({ code, signal });
            }
        });
    });
}

export {
    run,
};
