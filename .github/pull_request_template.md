## What changed and why

<!-- Who is this for, and what should they now be able to do? -->

## Accessibility checks

The Lighthouse workflow's job summary lists automated WCAG failures by criterion, page
and element. Automated rules catch only part of WCAG, so also check pages you changed:

- [ ] Keyboard only: every control can be reached and used with Tab, Enter and arrows, in a sensible order, with focus always visible and not hidden behind the nav pill
- [ ] 320px wide and 200% zoom: nothing cut off, no sideways scrolling of the page
- [ ] Screen reader (VoiceOver or NVDA): headings, links and buttons make sense when read out
- [ ] Alt text, captions and transcripts describe the content for its purpose here
- [ ] Nothing relies on colour alone; motion respects reduced-motion settings
