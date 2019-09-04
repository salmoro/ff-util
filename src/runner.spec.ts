import { run } from "./runner";

it('should resolve with code 0', async () => {
    const { code } = await run({ args: ['-version'] });
    expect(code).toBe(0);
});

it('should throw with code 1', async () => {
    return run({ args: [''] })
        .catch(({ code }) => expect(code).toBe(1));
});
