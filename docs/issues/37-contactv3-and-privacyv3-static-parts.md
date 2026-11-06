# 37 · ContactV3 and PrivacyV3: static parts

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Routes:** `/contact`, `/privacy` · **Design:** ContactV3, PrivacyV3

- [x] Contact: the FAQ, topic routing, and a `mailto:hello@vert-robo-con.example` fallback with "replies within 24–48 hours". The form comes in #54
- [x] Privacy: the draft page structure, including Cloudflare Web Analytics (#38). The final text comes from #5
- [x] Phone layout

**Depends on:** #25

## Done

In ac271d8, 122a24e, 3028498 and 468c4f5.

- **Contact:** each topic says who picks it up. One a page already
  answers links there; one waiting on the form (#54) opens an email
  with the topic as the subject, so no one is left without a way to
  write. A test asserts the page links nowhere but the site or an
  email address.
- **Privacy** is marked a draft, names Cloudflare Web Analytics as #8
  decided, and mentions none of the tools that were dropped. Every
  value #5 has yet to settle — the entity, the legal basis, the
  retention periods — is shown as the canvas's bracketed placeholder
  rather than a guess, and a test asserts that.
- **Found on the way:** PeopleV3's team has seven people and the
  summit data six. The consulting coordinator was missing entirely, so
  the contact page had no coordinator card. She is added, and a test
  now checks all 39 people the boards name are present.

**Still needed before registration (#5):** the final privacy text. No
form collects anything until then.
