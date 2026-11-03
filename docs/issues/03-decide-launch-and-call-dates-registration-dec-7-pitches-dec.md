# 3 · Decide: launch and call dates (registration Dec 7, pitches Dec 8, or Jan 11)

**State:** closed · **Milestone:** M0 · Decisions · **Labels:** decision

---

> **Decided Oct 29:** registration on Mon Dec 7 and the startup pitch call on Tue Dec 8 for now, with every date editable in the admin (#39, #51). On the one-developer plan registration is ready around Jan 8. Decide at the end of M1: open on Jan 11 by changing the dates in the admin, or build registration before the redesign.

The V3 designs announce registration on **Mon Dec 7, 2026** and the startup pitch call on **Tue Dec 8**. That leaves six weeks from today for M1 to M3.

## Options

1. **Keep both dates.** Requires two developers (#2) and no slip in M1. Decide at the M1 checkpoint on Nov 13.
2. **Launch the site on Dec 7, but open registration and pitches on Mon Jan 11.** The page copy says "opens Jan 11" until then.

## Done when

- [x] An option is chosen, with a checkpoint date for re-deciding
- [ ] The edition seed in #39 uses the chosen dates

---

**Comment — lanterno, 2026-10-28**

**Decision (Oct 29):** keep registration on Mon Dec 7 and the startup pitch call on Tue Dec 8 for now.

**Requirement added:** these dates must be changeable in the database later, without a code change:
- The edition's dates and registration window are edited in AdminEditionV3 (#39).
- The pitch call's open and close dates are a call record edited in the admin (#51).
- The seed only supplies the starting values.

**Checkpoint:** with one developer (#2), re-check this at the end of M1. If registration isn't ready, the fallback is to launch the site on Dec 7 and open both on Jan 11 by changing the dates in the admin.
