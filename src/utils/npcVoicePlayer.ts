export function playBeep(ctx: AudioContext) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = 200 + Math.random() * 1000;

    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc.connect(gain).connect(ctx.destination);

    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
}
