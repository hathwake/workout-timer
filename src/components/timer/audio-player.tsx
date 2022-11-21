import { useEffect, useMemo, useRef } from "react";

type AudioState = {
    audio: HTMLAudioElement;
    audioCtx: AudioContext;
    source: MediaElementAudioSourceNode;
}


export const useAudioPlayer = (file: string) => {

    const audio = useRef<AudioState | undefined>(undefined);

    const createAudio = (): AudioState => {
        const audioCtx = new AudioContext();
        const audio = new Audio(file);
        const source = audioCtx.createMediaElementSource(audio);
        
        source.connect(audioCtx.destination);

        return {audio, audioCtx, source};
    };

    return {
        play: async (time: number) => {
            if(!audio.current) {
                audio.current = createAudio();
            }
            if(audio.current.audioCtx.state === "suspended") {
                await audio.current.audioCtx.resume();
            }
            audio.current.audio.currentTime = time;
            audio.current.audio.play();
        },
        pause: () => {
            audio.current?.audio.pause();
        }
    };
};