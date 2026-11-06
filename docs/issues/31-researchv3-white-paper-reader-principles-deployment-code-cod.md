# 31 · ResearchV3: white paper reader, principles, deployment code, code of conduct

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend, content

---

**Routes:** `/research`, `/research/white-paper/2025`, `/principles`, `/deployment-code`, `/code-of-conduct` · **Design:** ResearchV3

- [x] A chaptered reader with a table of contents, deep links to sections and a "How to cite" block (APA and BibTeX)
- [x] The documents are Markdown files in the repo (#26) until #45 moves them into Postgres
- [x] "Suggest an edit" on each section shows "coming soon" until #59
- [x] Phone layout
- [x] Add the 2025 white paper and the three codes as Markdown, read through the content layer (moved from #26)

Needs the white paper source text from #7.

**Depends on:** #25, #26

## Done

In 0ee0e35, 2aaa083, 761ff28 and 1916a4b.

- **The documents are Markdown** in `src/content/documents`, read
  through an Astro content collection, with their citations in the
  front matter. #45 moves them into Postgres.
- **The source text is still the canvas's.** #31 notes the paper's
  text comes from #7; the body is "[PAPER TEXT]" and the citation
  "[CITATION DETAILS / DOI]", kept as the canvas has them rather than
  written. The structure, chapter titles and the codes are real.
- **Deep links** come from the headings themselves, so the contents
  and the chapter cards can never point at a section that isn't
  there, and a test asserts it.
- **The BibTeX block is focusable,** because it scrolls sideways on a
  narrow screen and a keyboard user has to be able to scroll it.
- **Coming later:** "Suggest an edit" with #59, the PDF with #68, and
  "Ask the authors" with the contact form in #54.
