# 45 · AdminContentV3: news, videos, people, partners and documents

**State:** open · **Milestone:** M7 · After the summit · **Labels:** frontend, backend

---

**Design:** AdminContentV3

- [ ] Move news posts, videos and series, partners and documents from the repo data files into Postgres, and switch their #26 functions to queries
- [ ] Editors for news posts, videos and series, people, partners and documents (the white paper and the codes)
- [ ] A Markdown editor with preview, drafts and scheduled publishing
- [ ] Image upload: resized and stored on the server's upload volume, which is included in backups
- [ ] Publishing clears the cache, and every change is audited

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #42, #26
