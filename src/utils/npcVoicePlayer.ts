export function playBeep(ctx: AudioContext) {
    const start = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "triangle";

    const gain = ctx.createGain();

    const baseFreq = 150 + Math.random() * 120;

    osc.frequency.setValueAtTime(baseFreq * 0.9, start);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, start + 0.04);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 6;
    lfoGain.gain.value = 1.5;

    lfo.connect(lfoGain).connect(osc.frequency);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(0.2, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);

    osc.connect(gain).connect(ctx.destination);

    osc.start(start);
    lfo.start(start);
    osc.stop(start + 0.22);
    lfo.stop(start + 0.22);
}
