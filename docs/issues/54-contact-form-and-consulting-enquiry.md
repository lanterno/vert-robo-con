# 54 · Contact form and consulting enquiry

**State:** open · **Milestone:** M4 · Pitch calls and moderation · **Labels:** frontend, backend

---

**Design:** ContactV3

- [ ] A contact form routed by topic, and a 2-step consulting enquiry
- [ ] Sends to the topic's address with `Reply-To` set to the sender, and a receipt to the sender with a reference like `MSG-1093`
- [ ] The message also lands in the queue, so nothing is lost if a mailbox misses it

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #50
