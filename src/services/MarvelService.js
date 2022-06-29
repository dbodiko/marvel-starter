class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=0c3ac07c8639617a58aeb82b028a9b83'

    getResource = async (url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async () => {
        debugger

        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=351&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: (char.name.length > 22) ? `${char.name.slice(0, 18)}...` : char.name,
            description: char.description.length > 100 ? (`${char.description.slice(0,150)}...`) : char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService