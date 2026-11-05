# PayIt Project Workspace — Read-Only Proof of Concept

This public proof of concept includes real Missouri and New Hampshire project snapshots with the owner's approval. It is not restricted to PayIt employees. Jira links still require Jira access, but the included snapshots are public. `noindex` requests search-engine exclusion; it does not provide access control.

The site is made of three self-contained files: `index.html`, `missouri.html`, and `new-hampshire.html`. Publish the repository root using GitHub Settings → Pages → Deploy from a branch → main → / (root).

Visitors can browse, search, sort, expand sections, view recorded details and export tables. Editing and Jira sync remain owner-managed in the original local workspace. Original workbook attachments are omitted from this lightweight proof of concept; table/document exports still work.

To refresh, finish your local edits and Jira sync, then ask Codex to rebuild the GitHub snapshot. Replace these three HTML files with the contents generated in `outputs/payit-github-pages/github-upload/`. Publication is a deliberate separate step; local edits do not automatically appear here. Source dates may precede the publication date.

No Python server, local database, plugin, Jira token or Keychain data is included. Browser preferences may persist locally; project records always load from the published snapshot.
