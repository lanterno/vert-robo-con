# 64 · Data export, deletion and retention jobs

**State:** open · **Milestone:** M7 · After the summit · **Labels:** backend

---

## Scope

- [ ] "Download my data" covers every table that holds the visitor's address, as one JSON file. This extends what #41 built for registrations
- [ ] "Delete everything" removes or anonymises it all, including topic subscriptions, and writes an entry to a deletion log that holds no personal data
- [ ] A nightly job deletes data past its retention period (periods from #5) and logs the counts
- [ ] Backups age out on their own schedule, and the Privacy page says so

**Depends on:** #50
