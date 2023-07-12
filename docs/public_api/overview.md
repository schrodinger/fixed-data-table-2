Public API - Overview
==========================

Public API refers to a set of APIs that exposes a simple and abstract view over FDT's state and methods.
This enables users to create clean and powerful plugins over FDT without actually having to bake code into the FDT codebase.

As requests for new functionality come in, we intend to address them by exposing the proper hooks in the API, and allowing things to be built on top of FDT, rather than extending FDT directly.

<div class="note">
<b>Note:</b>
<br>The current set of Public APIs are minimal, following the idea that we'll only expose more based on requests.
<br>These are also somewhat prone to change, but we'll try our best to keep them non-breaking across releases.
</div>
