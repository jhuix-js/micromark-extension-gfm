import type {HtmlOptions as GfmFootnoteHtmlOptions} from 'micromark-extension-gfm-footnote'
import type {Options as GfmStrikethroughOptions} from 'micromark-extension-gfm-strikethrough'
import type {Options as GfmTableOptions} from '@jhuix/micromark-extension-gfm-table'

export {gfm, gfmHtml} from './lib/index.js'

/**
 * Configuration for `gfmHtml` of `micromark-extension-gfm`.
 */
export interface HtmlOptions extends GfmFootnoteHtmlOptions {}

/**
 * Configuration for `gfm` of `micromark-extension-gfm`.
 */
export interface Options extends GfmStrikethroughOptions,GfmTableOptions {}
