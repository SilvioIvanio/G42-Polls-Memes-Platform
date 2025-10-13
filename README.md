# G42-Polls-Memes-Platform

## CSS modularization

The global stylesheet `styles.css` now acts as an entry point that imports modular files from the `styles/` folder:

- `styles/base.css` — base elements and typography
- `styles/layout.css` — layout, container and navigation styles
- `styles/components.css` — reusable UI components (cards, nav-actions)
- `styles/forms.css` — form controls and buttons
- `styles/utilities.css` — small utility classes

HTML pages keep referencing the top-level `styles.css` link, so no changes are required in the HTML files. To customize or include only some modules, update the link or replace it with individual module links.
