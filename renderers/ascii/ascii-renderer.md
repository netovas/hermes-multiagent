# ASCII RENDERER — Inline Chat View

Render at the END of every ZethPhoenix reply when in MODE 3 (project).

## TEMPLATE

```
🏢 ZethPhoenix Office — {{project_id}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{% for agent in roster %}
{{agent.emoji}} {{agent.role.padRight(14)}} [{{state_icon}}] {{activity}} {{progress_bar}}
{% endfor %}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📂 Artifacts: {{count_done}}/{{count_total}}   ⏱ Phase: {{current_phase}}
```

## STATE ICONS
- `idle`     → ⏳
- `thinking` → 💭
- `working`  → ⚙️
- `talking`  → 💬
- `done`     → ✅
- `blocked`  → 🚧
- `fallback_rebirth` → 🔥🦅

## ROLE EMOJIS
BA👤 PM👔 PO🧑‍💼 SA🧑‍🔬 Architect🏗️ UX🎨
TechLead🧙 BE💻 FE🖼️ DevOps⚙️ QA🧪 TechWriter📝

## PROGRESS BAR
`▓▓▓▓▓░░░░░ 50%` (10 chars)

## PHOENIX REBIRTH FRAME
```
        🔥
       🔥🦅🔥
      🔥🔥🔥🔥
   ZethPhoenix rises from the ashes...
   (LMStudio → OpenAI Codex)
```