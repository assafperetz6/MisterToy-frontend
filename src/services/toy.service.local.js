import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getRandomToy,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
            {
                return regExp.test(toy.vendor) &&
                toy.price <= filterBy.maxPrice

            }
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        }
}

function getRandomToy() {
    const labelOptions = [
        'On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered'
    ]
    
    const toy = {
        name: `toy-${utilService.makeId(3)}`,
        price: 123,
        labels: [labelOptions[utilService.getRandomIntInclusive(0, 7)], labelOptions[utilService.getRandomIntInclusive(0, 7)]],
        createdAt: Date.now(),
        inStock: true,
    }

    return toy
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = [
        {
            _id: 't101',
            name: 'Talking Doll',
            price: 123,
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: 1631031801011,
            inStock: true,
        },
        {
            _id: 't102',
            name: 'Jigsaw Puzzle',
            price: 80,
            labels: ['Box game', 'Art', 'puzzle'],
            createdAt: 16310313453411,
            inStock: true,
        },
        {
            _id: 't103',
            name: 'Remote Controlled Car',
            price: 250,
            labels: ['On Wheels', 'Outdoor', 'Battery Powered'],
            createdAt: 1631035672011,
            inStock: true,
        },
    ]
    utilService.saveToStorage(STORAGE_KEY, toys)
}