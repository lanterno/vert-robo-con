# 74 · Plan: from today's site to the V3 designs

**State:** open · **Milestone:** — · **Labels:** plan

---

The work to take the site from today's static Astro build to the V3 designs. The architecture is in #1 and [`ARCHITECTURE.md`](../../ARCHITECTURE.md), and the plan is in [`docs/ROADMAP.md`](../ROADMAP.md). One developer builds it, one milestone at a time (#2).

How the issues are written:
- Each issue names the boards it implements, from the "Vert Robo Con redesign" canvas.
- Issues with both a Backend and a Frontend part are labelled with both. The two parts go in separate commits, and tests follow in their own commit.
- All fixtures and seed data are synthetic. Credentials and 2FA secrets never go into the repo, issues, logs or CI output.
- A box is ticked when its issue is closed.

## M0 · Decisions
Choices that block the build. Only #5 (privacy) is still open, and it must be settled before registration opens.

- [x] #1
- [x] #2
- [x] #3
- [x] #4
- [ ] #5
- [x] #6
- [x] #7
- [x] #8

## M1 · Public site without a database
Every public page rebuilt from the V3 boards, reading data files in the repo and still on GitHub Pages. Ends with the new public site live.

- [x] #75
- [x] #76
- [x] #24
- [x] #25
- [x] #26
- [x] #27
- [x] #28
- [x] #29
- [ ] #30
- [ ] #31
- [ ] #32
- [ ] #33
- [ ] #34
- [ ] #35
- [ ] #36
- [ ] #37
- [ ] #38

## M2 · Foundations
App server, database, sign-in, email, jobs, servers, CI and backups, running on staging.

- [ ] #9
- [ ] #10
- [ ] #11
- [ ] #12
- [ ] #13
- [ ] #14
- [ ] #15
- [ ] #16
- [ ] #17
- [ ] #18
- [ ] #19
- [ ] #20
- [ ] #21
- [ ] #22
- [ ] #23

## M3 · Registration and the admin core
Editions, registration, My VRC and the core admin screens. The site moves to its own server, and registration for the next summit opens.

- [ ] #39
- [ ] #40
- [ ] #41
- [ ] #42
- [ ] #43
- [ ] #44
- [ ] #46
- [ ] #47
- [ ] #48
- [ ] #49
- [ ] #77

## M4 · Pitch calls and moderation
The startup and research pitch calls, one moderation queue, joining the network, and the contact form.

- [ ] #50
- [ ] #51
- [ ] #52
- [ ] #53
- [ ] #54

## M5 · Program and summit emails
The 2027 program published, the reminder and join-link emails, the full dashboard, and a passed rehearsal.

- [ ] #61
- [ ] #62
- [ ] #66
- [ ] #67
- [ ] #69

## M6 · Summit
A buffer for late changes, a change freeze in the run-up, and the summit itself.

- [ ] #70

## M7 · After the summit
Recordings, the features nothing in the 2027 edition depends on, and switching off the old tools.

- [ ] #71
- [ ] #45
- [ ] #55
- [ ] #56
- [ ] #57
- [ ] #58
- [ ] #59
- [ ] #60
- [ ] #63
- [ ] #64
- [ ] #65
- [ ] #68
- [ ] #72
- [ ] #73
