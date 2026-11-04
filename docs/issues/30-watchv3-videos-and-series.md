# 30 · WatchV3: videos and series

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Routes:** `/watch`, `/watch/[slug]` · **Design:** WatchV3

- [x] Recordings grouped by edition, and the "Robots in the Field" series
- [x] The video facade, with the 2025 placeholders until real recordings exist
- [x] Filters by edition, topic and speaker
- [x] Phone layout
- [x] Add the "Robots in the Field" series and its episodes to the content layer (moved from #26)

**Depends on:** #25, #26

## Done

In cc2c979, a1970a9, be01845 and ab50037.

- **The videos came from the board.** `src/data/videos.ts` holds the
  twelve 2025 recordings, the four Robots in the Field episodes, the
  explainer and the 2024 recap, with topics and summaries.
- **Left out:** the board's three 2024 sessions, which are
  placeholders down to their titles and ids. Adding three rows of
  "[2024 SESSION TITLE]" would be noise; the real recap stays.
- **Thumbnails:** the board uses stand-in avatar art for talks with no
  picture. The repo's portraits are initials on a square, which crop
  badly at 16:9, so those videos show their title on a tile instead,
  as the board does elsewhere. The play mark moves to the corner there
  so it never sits over the words.
- **Filters** work on a page that already holds every video, so the
  library is complete without JavaScript.
- **Coming later:** "Notify me when videos land" waits for #65, the
  2027 recordings for #71, and transcripts for M7.
