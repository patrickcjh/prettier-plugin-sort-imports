import { parsers as babelParsers } from 'prettier/plugins/babel';
import { parsers as flowParsers } from 'prettier/plugins/flow';
import { parsers as htmlParsers } from 'prettier/plugins/html';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';
import { defaultPreprocessor } from './preprocessors/default-processor';
import { vuePreprocessor } from './preprocessors/vue-preprocessor';

const svelteParsers = createSvelteParsers();

function createSvelteParsers() {
    try {
        var { parsers } = require('prettier-plugin-svelte');
        var { sveltePreprocessor } = require('./preprocessors/svelte-preprocessor');
    } catch {
        return {};
    }
    return {
        svelte: {
            ...parsers.svelte,
            preprocess: sveltePreprocessor,
        },
    };
}

const options = {
    importOrder: {
        type: 'path',
        category: 'Global',
        array: true,
        default: [{ value: [] }],
        description: 'Provide an order to sort imports.',
    },
    importOrderCaseInsensitive: {
        type: 'boolean',
        category: 'Global',
        default: false,
        description: 'Provide a case sensitivity boolean flag',
    },
    importOrderParserPlugins: {
        type: 'path',
        category: 'Global',
        array: true,
        // By default, we add ts and jsx as parsers but if users define something
        // we take that option
        default: [{ value: ['typescript', 'jsx'] }],
        description: 'Provide a list of plugins for special syntax',
    },
    importOrderSeparation: {
        type: 'boolean',
        category: 'Global',
        default: false,
        description: 'Should imports be separated by new line?',
    },
    importOrderGroupNamespaceSpecifiers: {
        type: 'boolean',
        category: 'Global',
        default: false,
        description:
            'Should namespace specifiers be grouped at the top of their group?',
    },
    importOrderSortSpecifiers: {
        type: 'boolean',
        category: 'Global',
        default: false,
        description: 'Should specifiers be sorted?',
    },
};

module.exports = {
    parsers: {
        babel: {
            ...babelParsers.babel,
            preprocess: defaultPreprocessor,
        },
        flow: {
            ...flowParsers.flow,
            preprocess: defaultPreprocessor,
        },
        typescript: {
            ...typescriptParsers.typescript,
            preprocess: defaultPreprocessor,
        },
        vue: {
            ...htmlParsers.vue,
            preprocess: vuePreprocessor,
        },
        ...svelteParsers,
    },
    options,
};
