import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const DoomPlayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "running" | "error"
  >("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const wasmInstance = useRef<WebAssembly.Instance | null>(null);
  const memoryRef = useRef<WebAssembly.Memory | null>(null);

  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [lastKey, setLastKey] = useState<string>("");

  // Constants from doom.js
  const DOOM_SCREEN_WIDTH = 320 * 2;
  const DOOM_SCREEN_HEIGHT = 200 * 2;

  useEffect(() => {
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const addConsoleLine = (line: string) => {
    setConsoleLines((prev) => [...prev.slice(-4), line]);
  };

  const startDoom = async () => {
    setStatus("loading");
    try {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      // Initialize memory
      const memory = new WebAssembly.Memory({ initial: 108 });
      memoryRef.current = memory;

      // Helper functions
      const getMilliseconds = () => performance.now();

      const drawCanvas = (ptr: number) => {
        if (!memoryRef.current || !canvasRef.current) return;
        const doomScreen = new Uint8ClampedArray(
          memoryRef.current.buffer,
          ptr,
          DOOM_SCREEN_WIDTH * DOOM_SCREEN_HEIGHT * 4
        );
        const renderScreen = new ImageData(
          doomScreen,
          DOOM_SCREEN_WIDTH,
          DOOM_SCREEN_HEIGHT
        );
        ctx.putImageData(renderScreen, 0, 0);
      };

      const readWasmString = (offset: number, length: number) => {
        const bytes = new Uint8Array(memory.buffer, offset, length);
        return new TextDecoder("utf8").decode(bytes);
      };

      const consoleLog = (offset: number, length: number) => {
        const string = readWasmString(offset, length);
        console.log("[DOOM]", string);
        addConsoleLine(string);
      };

      const importObject = {
        js: {
          js_console_log: consoleLog,
          js_stdout: consoleLog,
          js_stderr: consoleLog,
          js_milliseconds_since_start: getMilliseconds,
          js_draw_screen: drawCanvas,
        },
        env: {
          memory: memory,
        },
      };

      // Instantiate WASM
      const response = await fetch("/assets/doom.wasm");
      const { instance } = await WebAssembly.instantiateStreaming(
        response,
        importObject
      );
      wasmInstance.current = instance;

      // Start Doom
      // @ts-expect-error - main is not typed in exports
      instance.exports.main();
      setStatus("running");

      // Game Loop
      const step = () => {
        // @ts-expect-error - doom_loop_step is not typed in exports
        instance.exports.doom_loop_step();
        requestRef.current = requestAnimationFrame(step);
      };
      requestRef.current = requestAnimationFrame(step);

      // Input Handling - MOVED TO useEffect
      // const getDoomKeyCode = (code: string): number => { ... }; // Removed
      // const handleKeyDown = (e: KeyboardEvent) => { ... }; // Removed
      // const handleKeyUp = (e: KeyboardEvent) => { ... }; // Removed
      // handleKeyDownRef.current = handleKeyDown; // Removed
      // handleKeyUpRef.current = handleKeyUp; // Removed
      // window.addEventListener("keydown", handleKeyDown); // Removed
      // window.addEventListener("keyup", handleKeyUp); // Removed
    } catch (e) {
      console.error("Failed to start Doom", e);
      setStatus("error");
    }
  };

  // Input Handling Effect
  useEffect(() => {
    if (status !== "running") return;

    const getDoomKeyCode = (code: string): number => {
      switch (code) {
        case "Backspace":
          return 127;
        case "ArrowLeft":
          return 0xac;
        case "ArrowUp":
          return 0xad;
        case "ArrowRight":
          return 0xae;
        case "ArrowDown":
          return 0xaf;
        case "Enter":
          return 13;
        case "Space":
          return 32;
        case "ControlLeft":
        case "ControlRight":
          return 0x80 + 0x1d;
        case "AltLeft":
        case "AltRight":
          return 0x80 + 0x38;
        default:
          if (code.startsWith("Key")) {
            const charCode = code.charCodeAt(3);
            if (charCode >= 65 && charCode <= 90) {
              return charCode + 32;
            }
          }
          return 0;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const doomCode = getDoomKeyCode(e.code);
      setLastKey(`${e.code} (${doomCode})`);
      if (doomCode !== 0 && wasmInstance.current) {
        // @ts-expect-error - add_browser_event is not typed in exports
        wasmInstance.current.exports.add_browser_event(0 /*KeyDown*/, doomCode);
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const doomCode = getDoomKeyCode(e.code);
      if (doomCode !== 0 && wasmInstance.current) {
        // @ts-expect-error - add_browser_event is not typed in exports
        wasmInstance.current.exports.add_browser_event(1 /*KeyUp*/, doomCode);
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [status, wasmInstance]); // Added wasmInstance to dependencies to ensure it's available

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Courier New', Courier, monospace",
        outline: "none",
        position: "relative",
      }}
      tabIndex={0}
      ref={(ref: HTMLDivElement | null) => ref?.focus()}
    >
      {status === "idle" && (
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ mb: 2, color: "red", fontWeight: "bold" }}
          >
            DOOM
          </Typography>
          <Typography sx={{ mb: 4 }}>WebAssembly Port</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={startDoom}
            sx={{ fontFamily: "inherit", fontSize: "1.2rem", px: 4, py: 1 }}
          >
            LANCER DOOM
          </Button>
        </Box>
      )}

      {status === "loading" && (
        <Typography>Chargement du moteur de l'enfer...</Typography>
      )}

      {status === "error" && (
        <Box sx={{ textAlign: "center" }}>
          <Typography color="error" sx={{ mb: 2 }}>
            Erreur de chargement
          </Typography>
          <Button onClick={onClose} sx={{ color: "white" }}>
            Fermer
          </Button>
        </Box>
      )}

      <canvas
        ref={canvasRef}
        width={DOOM_SCREEN_WIDTH}
        height={DOOM_SCREEN_HEIGHT}
        style={{
          display: status === "running" ? "block" : "none",
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
        }}
      />

      {status === "running" && (
        <>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0,0,0,0.7)",
              color: "#0f0",
              fontSize: "10px",
              p: 0.5,
              pointerEvents: "none",
              fontFamily: "monospace",
            }}
          >
            {consoleLines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            <div style={{ color: "yellow" }}>Input: {lastKey}</div>
          </Box>

          <Button
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              zIndex: 1000,
            }}
          >
            Fermer
          </Button>
        </>
      )}
    </Box>
  );
};

export default DoomPlayer;
