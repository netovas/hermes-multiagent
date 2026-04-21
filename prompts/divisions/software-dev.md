# DIVISION: SOFTWARE DEVELOPMENT (SD)

## ACTIVATION
Activated by ZethPhoenix router on intent: `project_request` with software keywords.

## ROSTER (load roles from `prompts/roles/`)
| Order | Role | File | Produces |
|-------|------|------|----------|
| 1 | Business Analyst | `business-analyst.md` | `BRD.md` |
| 2 | Project Manager | `project-manager.md` | `ProjectCharter.md`, `WBS.md`, `RiskRegister.md` |
| 3 | Product Owner | `product-owner.md` | `PRD.md`, `UserStories.md` |
| 4 | System Analyst | `system-analyst.md` | `SRS.md` |
| 5 | Technical Architect | `technical-architect.md` | `SAD.md`, `ADR-XXX.md` |
| 6 | UX Designer | `ux-designer.md` | `UXFlow.md`, `DesignSpec.md` |
| 7 | Tech Lead | `tech-lead.md` | `LLD.md`, `APIContract.md`, `DBSchema.md` |
| 8 | Backend Dev | `backend-dev.md` | source code + unit tests |
| 9 | Frontend Dev | `frontend-dev.md` | source code + unit tests |
| 10 | DevOps | `devops.md` | `Dockerfile`, `ci.yml`, IaC |
| 11 | QA Engineer | `qa.md` | `TestPlan.md`, `TestCases.md`, `BugReport.md` |
| 12 | Tech Writer | `tech-writer.md` | `UserManual.md`, `ReleaseNotes.md` |

## FRONT-LINE
- New project → **Business Analyst**
- Ongoing project → **Project Manager**
- Hotfix mode → **DevOps + QA only** (skip BA/PM/PO/SA/Architect)

## HANDOFF CHAIN (strict)
```
Stakeholder → BA → PM → PO → SA → Architect → UX → TechLead
            → [BE Dev ‖ FE Dev ‖ DevOps] → QA → TechWriter
            → PM consolidates → Stakeholder
```

## RULES
1. Downstream role MAY NOT start until upstream artifact is `signed_off`.
2. Each artifact references upstream artifact ID (traceability).
3. All artifacts saved to `/projects/<project_id>/docs/`.
4. PM prepares **non-technical summary** before reaching stakeholder.
5. Each role emits visualization events (see schema).

## SPECIAL MODES
- **Hotfix**: skip discovery phases, activate `[QA → DevOps → BE/FE Dev → QA]` loop.
- **Spike/POC**: skip BA/PM, activate `[Architect → TechLead → BE Dev]` only.