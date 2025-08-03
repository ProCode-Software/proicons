import MiniSearch, { type SearchResult } from 'minisearch'
import { Icon } from './types'
type IconList = Record<string, Icon>

export function searchResultsToIcons(results: SearchResult[]): IconList {
    return Object.fromEntries(results.map(({ name, ...result }) => [name, result]))
}

export function filterIcons(icons: IconList, query: string): IconList {
    const dic: (Icon & { name: string; id: string })[] = Object.entries(icons).map(
        ([name, icon]) => {
            return { ...icon, name, id: name }
        }
    )
    const searcher = new MiniSearch({
        fields: ['name', 'description'],
        storeFields: ['name', 'description', 'icon', 'category'],
        searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { name: 4, description: 2 },
        },
    })
    searcher.addAll(dic)
    const results = searcher.search(query)

    return searchResultsToIcons(results)
}
