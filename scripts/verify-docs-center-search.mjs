import assert from 'node:assert/strict'
import {
  filterSectionsForLeafKeyword,
  filterSectionsForCatalogDirectory,
  itemMatchesKeyword,
} from '../src/utils/docsCenterSearch.js'

const fixture = [
  {
    title: 'Writer',
    sourceTitle: 'Writer',
    blocks: [
      {
        title: 'Quick Start',
        sourceTitle: 'Quick Start',
        items: [
          { label: 'Create Document', sourceLabel: 'Create Document' },
          { label: 'Open File', sourceLabel: 'Open File' },
        ],
      },
      {
        title: 'Review & Comments',
        sourceTitle: 'Review & Comments',
        items: [
          { label: 'AI Read Aloud', sourceLabel: 'AI Read Aloud' },
          { label: 'Share as File', sourceLabel: 'Share as File' },
        ],
      },
    ],
  },
]

const keyword = 'a'

assert.equal(itemMatchesKeyword(fixture[0].blocks[0].items[0], keyword), true)
assert.equal(itemMatchesKeyword(fixture[0].blocks[0].items[1], keyword), false)

const catalogFiltered = filterSectionsForCatalogDirectory(fixture, keyword)
assert.ok(
  catalogFiltered.some((section) =>
    section.blocks.some((block) => block.title === 'Quick Start'),
  ),
  'catalog directory filter should match level-2 titles such as Quick Start',
)
assert.ok(
  !catalogFiltered.some((section) =>
    section.blocks.some((block) => block.title === 'Review & Comments'),
  ),
  'catalog directory filter should not include blocks whose titles do not match',
)

const catalogSectionFiltered = filterSectionsForCatalogDirectory(fixture, 'writer')
assert.equal(catalogSectionFiltered.length, 1)
assert.equal(catalogSectionFiltered[0].title, 'Writer')
assert.equal(catalogSectionFiltered[0].blocks.length, 2)

const catalogLeafOnlyKeyword = filterSectionsForCatalogDirectory(fixture, 'create')
assert.equal(
  catalogLeafOnlyKeyword.length,
  0,
  'catalog directory filter should not match leaf-only keywords',
)

const leafFiltered = filterSectionsForLeafKeyword(fixture, keyword)
assert.equal(leafFiltered.length, 1)
assert.equal(leafFiltered[0].blocks.length, 2)
assert.deepEqual(
  leafFiltered[0].blocks.flatMap((block) => block.items.map((item) => item.label)),
  ['Create Document', 'AI Read Aloud', 'Share as File'],
)
assert.ok(
  !leafFiltered[0].blocks.some((block) => block.items.some((item) => item.label === 'Open File')),
  'non-matching leaf items should be removed',
)

const heroSectionOnlyKeyword = filterSectionsForLeafKeyword(fixture, 'writer')
assert.equal(
  heroSectionOnlyKeyword.length,
  0,
  'hero leaf filter should not match level-1 directory titles',
)

const heroBlockOnlyKeyword = filterSectionsForLeafKeyword(fixture, 'quick')
assert.equal(
  heroBlockOnlyKeyword.length,
  0,
  'hero leaf filter should not match level-2 directory titles',
)
assert.deepEqual(filterSectionsForLeafKeyword(fixture, 'zzz'), [])

const sidebarCatalog = filterSectionsForLeafKeyword(fixture, 'create')
assert.equal(sidebarCatalog.length, 1)
assert.deepEqual(
  sidebarCatalog[0].blocks.map((block) => block.title),
  ['Quick Start'],
  'hero sidebar should only keep level-2 blocks with matching features',
)

console.log('docs-center-search verification passed')
