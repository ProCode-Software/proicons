import MiniSearch, { SearchResult } from 'minisearch'
type IconList = Record<string, Object>

export function searchResultsToIcons(results: SearchResult[]): IconList {
    const newDict = {}
    for (const result of results) {
        newDict[result.name] = result
    }
    return newDict
}

export function filterIcons(icons: IconList, query: string): IconList {
    const dic = Object.entries(icons).map(([name, icon]) => {
        icon.name = name
        icon.id = name
        return icon
    })
    const searcher = new MiniSearch({
        fields: ['name', 'description'],
        storeFields: ['name', 'description', 'icon', 'category'],
        searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { name: 4, description: 2 }
        }
    })
    searcher.addAll(dic)
    const results = searcher.search(query)

    return searchResultsToIcons(results)
}