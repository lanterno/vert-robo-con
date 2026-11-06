# 34 · NewsV3: news list, posts and RSS

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Routes:** `/news`, `/news/[slug]`, `/news/rss.xml` · **Design:** NewsV3

- [x] A list with type filters (essay, announcement, video, summit)
- [x] Post pages with author, date, reading time and related links
- [x] An RSS feed
- [x] Phone layout
- [x] The board's "Elsewhere" cross-post card is placeholders throughout, including its address, so it is left out of the news data (#26)

**Depends on:** #25, #26

## Done

In 589e968, 9e62b74, 98a06fb, 3dffefb and 6807495.

- **Authors:** NewsV3 credits every post it shows to the founder and
  has no per-post author, so each post names her. The field is per
  post, so a later one can name someone else.
- **The feed** holds only posts with a date; an undated post is a
  placeholder a reader has nowhere to put. Its links are absolute and
  point at the real site.
- **Content type:** a static host picks it from the file extension, so
  the feed is served as `text/xml` rather than the endpoint's
  `application/rss+xml`. Readers accept either; Caddy can set it
  properly once the site is on the server (#19).
- **Redirects from `/blog/`** are #38's, which covers every old URL in
  one place.
- **Coming later:** the monthly digest sign-up waits for #65, and the
  team writes posts in the admin from M7 (#45).
