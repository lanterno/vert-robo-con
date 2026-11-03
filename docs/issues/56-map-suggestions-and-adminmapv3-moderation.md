# 56 · Map suggestions and AdminMapV3 moderation

**State:** open · **Milestone:** M7 · After the summit · **Labels:** frontend, backend

---

**Design:** MapV3, PhoneV3, AdminMapV3

- [ ] Frontend: "Suggest an organisation" and "Suggest an edit", with contributor terms (CC BY 4.0), and references like `MAP-0457`
- [ ] Admin: review a suggestion with a field-by-field diff, edit before approving, and nudge the pin
- [ ] Geocode once, on approval, with Photon and then Nominatim, at most one request a second, behind the Settings off switch
- [ ] Approving updates the downloads and the map stats

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #55, #50
