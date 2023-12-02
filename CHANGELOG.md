# Changelog

This changelog is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

Past versions will link to their respective commit. Current versions will not due to temporal paradoxes.

## 2023-12-02 - 2.0.0
### Added:
  - Recognizes JXL files
  - YAPLtag variable
  - whenErr runs when a file fails to download
### Changed:
  - onFail is now totalFail, return false to stop loading
  - Console logs are now commented out (except errors)
### Removed:
  - getExtension function
  - jshint comments

## 2023-01-10 - 1.0.1
### Fixed:
  - Only counts files once if multiple events are fired from one asset
  - Assets are no longer shown in accessibility tree
  - Assets are no longer focusable

## 2023-01-07 - [1.0.0](https://github.com/Commenter25/YAPL/blob/cc3600cc1c7ed7c3f2eac171fceb687a1e11dfff/yapl.js)
Initial release
