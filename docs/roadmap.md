Roadmap
==========================

As the core maintainers of FixedDataTable have changed, we want to provide a roadmap for the future of FDT.  This document provides a timeline and some goals for a v2.0 release.

Core Goals
---------------
Here is a quick list of our goals and philosophy for FDT and how we'd like to grow the project moving forward.

### Philosophy
We'd like FDT to remain focused on providing a simple grid for handling large amounts of data.  As such we intend to focus providing a good experience around basic functionality, and leaving it to our users to extend the library for specific use cases.  

As requests for new functionality come in, we intend to address them by exposing the proper hooks in the API and allowing things to be built on top of FDT, rather than extending FDT directly.  To facilitate adoption, we will also create examples for implementing frequently requested features such as filtering and sorting, tooltips, or context menus.  In time we may enhance these examples into a plugin system or a more advanced library which uses FDT as it's core renderer.

### Supported Functionality
FDTs focus will be on providing a Table with these features
* Scroll handling
* Infinite scroll / rendering of windowed rows
* Dynamic / Flex column widths
* Frozen columns
* Resizable columns
* Reorderable columns
* Dynamic row heights

### Other Functionality
While we don't intend to break existing functionality, we will likely deprecate or change how these work at some point in the future.
* Column groups
* Default styling

### Future Features
We're exploring how to support these improvements
* Column Virtualization (v2.0)
* Frozen rows (v2.0)
* Flexible styling / themes (v2.0)
* Multi-row / multi-column cells (later)

### Other Improvements
* Additional unit testing
* ES6 & styling improvements
* Cleanup build system
* More examples demonstrating common use cases

Timeline and dependencies
---------------

### v2.0
Targeted for Q3 2019  
Our major focus will be making FDT reusable through composability.  At Schrodinger we've had great success implementing frozen rows, more flexible column groups, and more performant column reordering on top of FDT.  We'd like to improve FDTs examples and demonstrate these capabilities.

We'll also release a new API for specifying row heights and give a stronger commitment to supporting dynamic row heights.  Our top priority following this release will be patching any bugs found by users depending on rowHeightGetter.
We've also had many requests for improved styling.  We'd like to develop an easily extensible plugin system for styling.  This will involve trimming down our default styles and creating easy to build and share themes for styling the grid as an alternative to the headaches of the current system.

Targeted Items
* Strong support for dynamic row heights
* Column Virtualization
* Frozen rows
* Flexible styling & themes
