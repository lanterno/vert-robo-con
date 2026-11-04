# 33 · PeopleV3: team, advisors, speakers and authors

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Routes:** `/people`, `/people/[slug]` · **Design:** PeopleV3

- [x] Sections for team, advisors, speakers by edition, and white paper authors
- [x] Person pages with "Appears in" links to sessions and videos
- [x] People without a photo get an initials avatar, never a broken image
- [x] Phone layout
- [x] Add the advisors, white paper authors, bios and links from PeopleV3 to the content layer (moved from #26)

**Depends on:** #25, #26

## Done

In 8d020f5, b511554, 398bd89 and 1c03d3d.

- **No advisors section.** #33 lists one, but PeopleV3 has only team,
  speakers by edition and authors, and there are no advisors in the
  data. The `advisor` role exists in the content layer for when there
  are.
- **Authors** are credited as the 2025 paper credits them, such as
  "Dr. Mireille Vos", while their name stays their own everywhere
  else.
- **Initials** come from one place, used by the card and the drawer,
  and skip a title or a placeholder's punctuation. Everyone in the
  data has a portrait today, so the initials are unit-tested rather
  than through a page.
- **Found on the way:** Mireille Vos speaks in a 2026 session but is
  not on that edition's speaker list, so the program and the people
  pages disagreed. Anyone who speaks in a session is now a speaker at
  that edition.
