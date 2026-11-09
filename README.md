# PayIt Project Workspace — Interactive Proof of Concept

Open index.html through GitHub Pages. Select the client from the sidebar. Project edits stay in this tab’s session, survive refresh, and do not update the owner’s workspace or Jira. Reset My Changes restores the published project snapshot. Browser session restoration may retain a restored session. Jira sync is owner-managed.

The latest UI release includes Configuration Journey settings and filters, bulk adding, Not Needed progress, the Data Migration menu and Data Mapping, and Change Log notifications. Change Log acknowledgments are browser-local across client selection on this origin. Current browsers with DecompressionStream support are required.

Keep index.html, poc-loader.js, workspace-release.json, missouri.html and new-hampshire.html together. The self-contained HTML files supply retained source datasets. workspace-release.json supplies the current application, shared configuration inventory, styles and owner snapshots. No Jira credentials, server or local database is included. The site is public, with real Missouri and New Hampshire snapshots published at the owner’s request. noindex is not access control.

Rebuild the current release with python3 work/build_github_release.py in the owner’s workspace, then update workspace-release.json, poc-loader.js and index.html in this repository. Source-dataset changes require refreshing the base HTML snapshots. Do not upload runtime folders or credentials.
