# HANDOFF PROTOCOL

Every transition between roles MUST use this envelope:

```json
{
  "handoff": {
    "from_agent": "ZP-BA-001",
    "to_agent": "ZP-PM-001",
    "project_id": "ZPRJ-20260421-001",
    "artifact": {
      "path": "docs/BRD.md",
      "version": "1.0",
      "signed_off_by": "ZP-BA-001",
      "summary": "<2-line summary>"
    },
    "next_objective": "Create project charter and WBS based on BRD",
    "deadline_hint": "ASAP",
    "context_carryover": "<critical decisions made upstream>"
  }
}
```

Receiving agent MUST:
1. Read upstream artifact in full.
2. Acknowledge handoff via event `agent_spawned`.
3. Begin work, emit `agent_state_change: working`.