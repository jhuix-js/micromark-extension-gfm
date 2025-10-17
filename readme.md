# [**@jhuix/micromark-extension-gfm**](https://github.com/jhuix-js/micromark-extension-gfm)

[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[micromark][] extensions to support [GitHub flavored markdown][gfm] (GFM).
This extension is based on the [micromark-extension-gfm][] extension.
It support the table syntax of headless, multiline head, rowspan marker,
colspan (left or right) marker.

## Contents

* [What is this?](#what-is-this)
* [When to use this](#when-to-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`gfm(options?)`](#gfmoptions)
  * [`gfmHtml(options?)`](#gfmhtmloptions)
  * [`Options`](#options)
  * [`HtmlOptions`](#htmloptions)
* [Bugs](#bugs)
* [Authoring](#authoring)
* [HTML](#html)
* [CSS](#css)
* [Syntax](#syntax)
* [Types](#types)
* [Compatibility](#compatibility)
* [Security](#security)
* [License](#license)

## What is this?

This package contains extensions that add support for all features enabled by
GFM to [`micromark`][micromark].
It supports autolink literals, footnotes, strikethrough, tables, tagfilter, and
tasklists.

## When to use this

This project is useful when you want to support GFM in markdown.

You can use these extensions when you are working with [`micromark`][micromark].
Alternatively, you can also use the underlying features separately:

* [`micromark-extension-gfm-autolink-literal`][gfm-autolink-literal]
  — support GFM [autolink literals][]
* [`micromark-extension-gfm-footnote`][gfm-footnote]
  — support GFM [footnotes][]
* [`micromark-extension-gfm-strikethrough`][gfm-strikethrough]
  — support GFM [strikethrough][]
* [`@jhuix/micromark-extension-gfm-table`][gfm-table]
  — support GFM [tables][] and headless table
* [`micromark-extension-gfm-tagfilter`][gfm-tagfilter]
  — support GFM [tagfilter][]
* [`micromark-extension-gfm-task-list-item`][gfm-task-list-item]
  — support GFM [tasklists][]

When you need a syntax tree, combine this package with
[`@jhuix/mdast-util-gfm`][mdast-util-gfm].

All these packages are used in [`@jhuix/remark-gfm`][jhuix-remark-gfm], which
focuses on making it easier to transform content by abstracting these internals
away.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install @jhuix/micromark-extension-gfm
```

In Deno with [`esm.sh`][esmsh]:

```js
import {gfm, gfmHtml} from 'https://esm.sh/@jhuix/micromark-extension-gfm@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {gfm, gfmHtml} from 'https://esm.sh/@jhuix/micromark-extension-gfm@4?bundle'
</script>
```

## Use

Say our document `example.md` contains:

```markdown
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tag filter

<plaintext>

## Tasklist

* [ ] to do
* [x] done
```

…and our module `example.js` looks as follows:

```js
import fs from 'node:fs/promises'
import {micromark} from 'micromark'
import {gfm, gfmHtml} from '@jhuix/micromark-extension-gfm'

const output = micromark(await fs.readFile('example.md'), {
  allowDangerousHtml: true,
  extensions: [gfm()],
  htmlExtensions: [gfmHtml()]
})

console.log(output)
```

…now running `node example.js` yields:

```html
<h1>GFM</h1>
<h2>Autolink literals</h2>
<p><a href="http://www.example.com">www.example.com</a>, <a href="https://example.com">https://example.com</a>, and <a href="mailto:contact@example.com">contact@example.com</a>.</p>
<h2>Footnote</h2>
<p>A note<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup></p>
<h2>Strikethrough</h2>
<p><del>one</del> or <del>two</del> tildes.</p>
<h2>Table</h2>
<table>
<thead>
<tr>
<th>a</th>
<th align="left">b</th>
<th align="right">c</th>
<th align="center">d</th>
</tr>
</thead>
</table>
<h2>Tag filter</h2>
&lt;plaintext>
<h2>Tasklist</h2>
<ul>
<li><input type="checkbox" disabled="" /> to do</li>
<li><input type="checkbox" disabled="" checked="" /> done</li>
</ul>
<section data-footnotes="" class="footnotes"><h2 id="footnote-label" class="sr-only">Footnotes</h2>
<ol>
<li id="user-content-fn-1">
<p>Big note. <a href="#user-content-fnref-1" data-footnote-backref="" class="data-footnote-backref" aria-label="Back to content">↩</a></p>
</li>
</ol>
</section>
```

## API

This package exports the identifiers [`gfm`][api-gfm] and
[`gfmHtml`][api-gfm-html].
There is no default export.

The separate extensions support the [`development` condition][development].
Run `node --conditions development module.js` to get instrumented dev code.
Without this condition, production code is loaded.

### `gfm(options?)`

Create an extension for `micromark` to enable GFM syntax.

###### Parameters

* `options` ([`Options`][api-options], optional)
  — configuration; passed to
  [`micromark-extens-gfm-strikethrough`][gfm-strikethrough-options] and
  [`@jhuix/micromark-extens-gfm-table`][gfm-table]

###### Returns

Extension for `micromark` that can be passed in `extensions` to enable GFM
syntax ([`Extension`][micromark-extension]).

### `gfmHtml(options?)`

Create an extension for `micromark` to support GFM when serializing to HTML.

###### Parameters

* `options` ([`HtmlOptions`][api-html-options], optional)
  — configuration; passed to
  [`micromark-extens-gfm-footnote`][gfm-footnote-html-options]

###### Returns

Extension for `micromark` that can be passed in `htmlExtensions` to support GFM
when serializing to HTML ([`HtmlExtension`][micromark-html-extension]).

### `Options`

Configuration for syntax (TypeScript type).

###### Type

```ts
export type {Options as gfmStrikethroughOptions} from 'micromark-extension-gfm-strikethrough'
export type {Options as gfmTableOptions} from '@jhuix/micromark-extension-gfm-table'
```

[See `gfmStrikethroughOptions`][gfm-strikethrough-options].

[See `gfmTableOptions`][gfm-table-options].

### `HtmlOptions`

Configuration for HTML (TypeScript type).

###### Type

```ts
export type {HtmlOptions} from 'micromark-extension-gfm-footnote'
```

[See `HtmlOptions`][gfm-footnote-html-options].

## Bugs

For bugs present in GFM but not here, or other peculiarities that are
supported, see each corresponding readme:

* [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#bugs)
* [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#bugs)
* strikethrough: n/a
* [table](https://github.com/jhuix-js/micromark-extension-gfm-table#bugs)
* tagfilter: n/a
* tasklists: n/a

## Authoring

For recommendations on how to author GFM, see each corresponding readme:

* [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#authoring)
* [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#authoring)
* [strikethrough](https://github.com/micromark/micromark-extension-gfm-strikethrough#authoring)
* [table](https://github.com/jhuix-js/micromark-extension-gfm-table#authoring)
* tagfilter: n/a
* [tasklists](https://github.com/micromark/micromark-extension-gfm-task-list-item#authoring)

## HTML

For info on what HTML features GFM relates to, see each corresponding readme:

* [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#html)
* [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#html)
* [strikethrough](https://github.com/micromark/micromark-extension-gfm-strikethrough#html)
* [table](https://github.com/jhuix-js/micromark-extension-gfm-table#html)
* [tagfilter](https://github.com/micromark/micromark-extension-gfm-tagfilter#html)
* [tasklists](https://github.com/micromark/micromark-extension-gfm-task-list-item#html)

## CSS

For info on how GitHub styles these features, see each corresponding readme:

* [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#css)
* [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#css)
* [strikethrough](https://github.com/micromark/micromark-extension-gfm-strikethrough#css)
* [table](https://github.com/jhuix-js/micromark-extension-gfm-table#css)
* tagfilter: n/a
* [tasklists](https://github.com/micromark/micromark-extension-gfm-task-list-item#css)

## Syntax

For info on the syntax of these features, see each corresponding readme:

* [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#syntax)
* [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#syntax)
* [strikethrough](https://github.com/micromark/micromark-extension-gfm-strikethrough#syntax)
* [table](https://github.com/jhuix-js/micromark-extension-gfm-table#syntax)
* tagfilter: n/a
* [tasklists](https://github.com/micromark/micromark-extension-gfm-task-list-item#syntax)

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`HtmlOptions`][api-html-options] and
[`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line,
`@jhuix/micromark-extension-gfm@^4`, compatible with Node.js 16.

This package works with `micromark` version `3` and later.

## Security

This package is safe.
Setting `clobberPrefix = ''` is dangerous, it opens you up to DOM clobbering.
The `labelTagName` and `labelAttributes` options are unsafe when used with user
content, they allow defining arbitrary HTML.

## License

[MIT][license], Updated by [Jhuix][author] (Hui Jin)

<!-- Definitions -->

[downloads-badge]: https://img.shields.io/npm/dm/@jhuix/micromark-extension-gfm.svg

[downloads]: https://www.npmjs.com/package/@jhuix/micromark-extension-gfm

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=@jhuix/micromark-extension-gfm

[size]: https://bundlejs.com/?q=@jhuix/micromark-extension-gfm

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[license]: license

[author]: mailto:jhuix0117@gmail.com

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[development]: https://nodejs.org/api/packages.html#packages_resolving_user_conditions

[typescript]: https://www.typescriptlang.org

[gfm]: https://github.github.com/gfm/

[strikethrough]: https://github.github.com/gfm/#strikethrough-extension-

[tables]: https://github.github.com/gfm/#tables-extension-

[tasklists]: https://github.github.com/gfm/#task-list-items-extension-

[autolink literals]: https://github.github.com/gfm/#autolinks-extension-

[tagfilter]: https://github.github.com/gfm/#disallowed-raw-html-extension-

[footnotes]: https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/

[micromark]: https://github.com/micromark/micromark

[micromark-extension]: https://github.com/micromark/micromark#syntaxextension

[micromark-extension-gfm]: https://github.com/micromark/micromark-extension-gfm

[micromark-html-extension]: https://github.com/micromark/micromark#htmlextension

[gfm-strikethrough]: https://github.com/micromark/micromark-extension-gfm-strikethrough

[gfm-strikethrough-options]: https://github.com/micromark/micromark-extension-gfm-strikethrough#options

[gfm-autolink-literal]: https://github.com/micromark/micromark-extension-gfm-autolink-literal

[gfm-footnote]: https://github.com/micromark/micromark-extension-gfm-footnote

[gfm-footnote-html-options]: https://github.com/micromark/micromark-extension-gfm-footnote#htmloptions

[gfm-table]: https://github.com/jhuix-js/micromark-extension-gfm-table

[gfm-table-options]: https://github.com/jhuix-js/micromark-extension-gfm-table#gfmtableoptions-options

[gfm-tagfilter]: https://github.com/micromark/micromark-extension-gfm-tagfilter

[gfm-task-list-item]: https://github.com/micromark/micromark-extension-gfm-task-list-item

[jhuix-remark-gfm]: https://github.com/jhuix-js/remark-gfm

[mdast-util-gfm]: https://github.com/jhuix-js/mdast-util-gfm

[api-gfm]: #gfmoptions

[api-gfm-html]: #gfmhtmloptions

[api-options]: #options

[api-html-options]: #htmloptions
