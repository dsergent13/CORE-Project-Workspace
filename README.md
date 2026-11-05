# PayIt Project Workspace — Interactive Proof of Concept

The shared link opens directly to the Project Dashboard. Use the Project dropdown in the sidebar to switch Missouri and New Hampshire.

Start Setup and the add/edit/delete, validation and confirmation controls operate on a copy of the published records in your tab’s browser session. Changes survive refresh but do not update the owner’s workspace, other visitors, or Jira. Each project keeps separate demo changes. Reset My Changes discards the current project’s demo changes and reloads its published snapshot. Browser session restoration may retain a restored tab’s session.

The owner continues editing and syncing Jira in the original local workspace. Publishing a refreshed snapshot is a separate rebuild/upload step. Jira connection and project creation are not exposed in the public demo. Downloaded backups and exports can be retained outside the session.

This public proof of concept includes real Missouri and New Hampshire snapshots with the owner’s approval. No login is required. No Jira credentials, server or local database is included. `noindex` is not access control. Original workbook attachments are omitted; table/document exports are available.

Keep index.html, poc-loader.js, missouri.html and new-hampshire.html together in the repository root. Publish main / (root) through GitHub Pages. Rebuild with work/build_github_pages.py in the owner’s original project folder, then publish the generated files from outputs/payit-github-pages/github-upload/.
