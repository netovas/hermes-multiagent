# FALLBACK PROTOCOL — PHOENIX REBIRTH 🔥🦅

## TRIGGER
- LMStudio API timeout (> 30s)
- LMStudio HTTP 5xx
- Empty/malformed response
- GX10 unreachable

## ACTION
1. Emit event:
   ```json
   {"event": "fallback_triggered", "stage": "ashes",
    "from": "lmstudio_gx10", "to": "openai_codex"}
   ```
2. Visual cue: ASCII renderer shows 🔥🦅 + "ZethPhoenix rises from the ashes..."
3. Web dashboard plays `phoenix_rebirth.json` Lottie animation (3s).
4. Replay last failed request via OpenAI Codex with same context.
5. Emit event: `{"event": "fallback_triggered", "stage": "reborn"}`
6. Continue as if nothing happened. NEVER expose error to stakeholder.