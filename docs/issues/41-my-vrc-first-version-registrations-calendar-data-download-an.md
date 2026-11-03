# 41 · My VRC, first version: registrations, calendar, data download and delete

**State:** open · **Milestone:** M3 · Registration and the admin core · **Labels:** frontend, backend

---

**Route:** `/me` · **Design:** MyVRCV3

- [ ] Backend: endpoints to view, cancel and re-confirm a registration; an `.ics` file; download all my data as JSON; delete everything (with a confirmation step)
- [ ] Frontend: the My VRC shell with the Registrations section, and empty states for the sections that come later
- [ ] Every deletion is written to a deletion log that holds no personal data. This issue creates it, and #64 extends deletion to every submission type

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #40
