# 50 · AdminQueueV3: one moderation queue for every submission

**State:** open · **Milestone:** M4 · Pitch calls and moderation · **Labels:** frontend, backend

---

**Design:** AdminQueueV3

## Backend

- [ ] A `submissions` table:
  - type (join, map, job, internship, contact, consulting, document suggestion, research topic, concern, sponsor interest, speaker recommendation, volunteer, programme interest)
  - status, reference, assignee, internal notes
  - the payload, as JSON validated per type
- [ ] Each type gets a reference prefix (for example MSG-1093, MAP-0457, JOB-0219)
- [ ] Status changes email the sender and appear in My VRC
- [ ] Reports of concern are visible only to admins and are never included in exports

## Frontend

- [ ] Queue list with counts per type, filters and assignment
- [ ] A detail panel with actions per type: approve, reject with a reason, ask for changes, close

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #42, #14, #15
