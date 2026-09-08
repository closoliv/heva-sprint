# Portable Record Prototype — Handoff Spec
### Provider Console (hybrid chat) → Patient WhatsApp
**Procedure used for this demo:** ACL reconstruction

---

## 1. What this is

A structured, AI-native way for a heva provider to complete a post-visit record right after a visit, inside the heva console — replacing today's informal, ad hoc handoff. The provider interacts with a chat-style flow that blends free text with tap-to-answer quick-select chips. Once the provider confirms, heva assembles a formatted record and sends it to the patient over WhatsApp.

This spec covers one procedure (ACL reconstruction) as the demo case. It's meant to be illustrative of the pattern, not a final clinical protocol — ACL rehab protocols vary by surgeon and graft type, which is exactly why every quick-select default below should remain editable rather than fixed.

**Scope for this prototype:** provider-side record creation only. Consent-gated sharing with a receiving provider is a stretch addition if time allows — not required for this pass.

---

## 2. Interaction model

- Triggered when the provider marks a visit complete for a patient who had ACL reconstruction (or manually, via "Create post-visit record").
- Each system prompt appears as a chat bubble with 2–4 quick-select chips. A free-text field is always available alongside the chips — tapping a chip fills the field, but the provider can edit or type instead.
- Once graft type is selected, later defaults (weight-bearing, brace) pre-fill to match — but stay editable, since protocols vary.
- Ends with a preview of the assembled record and an explicit "Send to [Patient]" action — nothing goes to the patient without that confirmation.

---

## 3. Script

**System →** "Nice work finishing up with [Patient]'s ACL reconstruction. Let's get their post-visit record ready — takes about a minute."

**System →** "Which graft did you use?"
Chips: `Hamstring autograft` · `Patellar tendon autograft` · `Allograft` · `Other`

**System →** "How did the procedure go?"
Chips: `As planned` · `Noted a complication`
→ If "Noted a complication": free-text prompt — "What should the patient know?"

**System →** "Weight-bearing status for the next couple of weeks?"
Chips (default shown depends on graft type; typical default for an isolated ACL reconstruction): `Weight-bearing as tolerated, with crutches` · `Non-weight-bearing` · `Partial weight-bearing` · `Custom`
*(Note: extend restriction if a meniscus repair or other procedure was done alongside the ACL reconstruction.)*

**System →** "Brace instructions?"
Chips: `Locked in extension, remove around 2 weeks` · `Functional brace, unlocked` · `No brace`

**System →** "Here's the standard list of things that should prompt [Patient] to contact you or seek care right away — edit as needed:"
Pre-populated list (editable, remove/add via chip or free text):
- Fever, or redness/warmth/drainage spreading from the incision (possible infection)
- Increasing calf pain, swelling, or tenderness — contact us immediately (possible blood clot)
- Chest pain or shortness of breath — seek emergency care immediately (possible clot reaching the lung)
- Numbness, tingling, or the foot turning pale or cold

**System →** "When should [Patient] check back in?"
Chips: `2 weeks – suture check` · `Custom`

**System →** *shows assembled record preview* → "Send to [Patient]?" `Edit` · `Send`

---

## 4. Patient-facing output (WhatsApp)

```
Hi [Patient first name], here's a summary from your ACL reconstruction
with Dr. [Provider last name] today:

🦵 Procedure: ACL reconstruction ([graft type])
✅ How it went: [as planned / complication note]

What to do:
- [weight-bearing instruction]
- [brace instruction]

⚠️ Contact us right away if you notice:
- [red-flag list, as edited by provider]

📅 Next check-in: [follow-up timeframe]

Questions? Message us here anytime.
```

---

## 5. Implementation notes for Claude Code

- Data model: one record per visit — `patient_name`, `procedure`, `graft_type`, `outcome_note`, `weight_bearing`, `brace_instructions`, `red_flags[]`, `follow_up`, `status` (draft/sent).
- Quick-select chips should be editable/removable, not locked choices — the defaults are a starting point, not a constraint, since real protocols vary by surgeon.
- The "Noted a complication" branch and the red-flag list are the two points where free text most naturally supplements the chips — build those as chat bubbles with an open text field, not a fixed dropdown.
- Preview-before-send is a hard requirement, not optional — nothing should reach the patient without explicit provider confirmation.
- Delivery channel for the patient-facing message should be configurable (WhatsApp shown here, but this should not be hardcoded to WhatsApp only, given patients also reach heva via Instagram).

---

## 6. Design compliance (per `STYLE_GUIDE.md` / `design/heva.md`)

This flow should look like it belongs on the same product as the profile/store/chat pages already measured — not a new visual system. Concretely, for Claude Code:

- **Layout:** mobile/portrait-first, single column, working width ~480-800px — this is a phone-shaped console flow, not a wide desktop dashboard.
- **Surface:** use the chat background `#F8FAFC` for this flow (it's conversational), not the plain white `#FFFFFF` used on non-chat surfaces.
- **Text:** primary `#2F2F30`, muted/secondary `#8C8D91` (e.g., for the "editable" hint text under chips).
- **One lime CTA, no exceptions:** `#C3FB11` goes on exactly one button per screen — that's the final **"Send to [Patient]"** action on the preview screen, and nowhere else. `Edit` on that same screen should be a secondary/blue treatment, not lime. Quick-select chips are not CTAs and must not use lime either.
- **Chips:** the pill radius (`9999px`/full) that heva already uses for chips/pills is a natural fit for the quick-select options — brand blue `#0056D6` outline or fill for selected state, not lime.
- **Cards/bubbles:** 1px border + 16px radius by default, no drop shadow. The one exception is the assembled record preview — as the single "expanded/active" element in this flow, it's the one place a subtle shadow (`rgba(16,24,40,0.06)`) is earned, per heva's existing pattern of reserving elevation for exactly one element.
- **Type:** single family (`madeCarvingSoft`, with `Quicksand` as the scaffold's placeholder), weights 300/400/600 only — no bold, no second typeface. System chat bubbles and body copy at 14-15px/400; the patient-facing WhatsApp message doesn't need to follow this (it renders as plain WhatsApp text on the patient's end).
- **Spacing:** everything on the 4px grid, dominant values 8/16/24px, matching the rest of the product.

This keeps the prototype visually indistinguishable from a real heva surface, which matters for a live demo — the panel should be evaluating the idea, not getting distracted by a UI that doesn't match what they already know as heva.

---

## Sources (clinical grounding for defaults above)

- [ACL Reconstruction Post-operative Rehabilitation Protocol — UVA Orthopaedic Surgery](https://med.virginia.edu/orthopaedic-surgery/wp-content/uploads/sites/242/2021/06/ACL-Reconstruction-1.pdf)
- [Rehab Timeline Expectations — Emory ACL Program](https://www.emoryhealthcare.org/centers-programs/acl-program/recovery/rehab-timeline)
- [ACL Post Operative Patient Instructions — OrthoBethesda](https://www.orthobethesda.com/physical-therapy/post-op-patient-instructions/acl/)
