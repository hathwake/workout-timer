

export type SoundBoardState<Keys extends string> = {
    ctx: AudioContext,
    buffers: Record<Keys, AudioBuffer>,
}

export class SoundBoard<Keys extends string> {

    initializing = false;

    state: SoundBoardState<Keys> | undefined;

    constructor(private sounds: Record<Keys, ArrayBuffer>) {}

    async createState(): Promise<SoundBoardState<Keys>> {
        console.log("Creating SoundBoard");
        const ctx = new AudioContext();

        const buffers: Record<string, AudioBuffer> = {};

        for(const [key, arrayBuffer] of Object.entries<ArrayBuffer>(this.sounds)) {
            const uint8Buffer = new Uint8Array(arrayBuffer);
            
            const arrayBufferCopy = new ArrayBuffer(arrayBuffer.byteLength);
            const uint8BufferCopy = new Uint8Array(arrayBufferCopy);
            uint8BufferCopy.set(uint8Buffer);

            buffers[key] = await ctx.decodeAudioData(arrayBufferCopy);
        }

        return {
            ctx,
            buffers,
        };
    }

    async initialize(): Promise<void> {
        this.state = await this.createState();
    }

    async playSound(key: Keys, volume = 1): Promise<void> {
        if(this.state === undefined) {
            return;
        }

        const {ctx, buffers} = this.state;

        const source = ctx.createBufferSource();
        source.buffer = buffers[key];
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        source.connect(gain);
        gain.connect(ctx.destination);

        source.start(ctx.currentTime);
    }
}
