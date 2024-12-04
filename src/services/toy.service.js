import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'

const labelOptions = [
	'On wheels',
	'Box game',
	'Art',
	'Baby',
	'Doll',
	'Puzzle',
	'Outdoor',
	'Battery Powered',
]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {    
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: false,
    }
}

function getRandomToy() {
	const toy = {
		name: `toy-${utilService.makeId(3)}`,
		price: 123,
		labels: [
			labelOptions[utilService.getRandomIntInclusive(0, 7)],
			labelOptions[utilService.getRandomIntInclusive(0, 7)],
		],
		createdAt: Date.now(),
		inStock: utilService.getRandomBoolean(),
	}

	return toy
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', isStock: null, labels: [] }
}