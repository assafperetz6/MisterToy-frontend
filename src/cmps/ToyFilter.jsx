import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { FilterByLabel } from "./FilterByLabel.jsx"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const labels = [
		'On wheels',
		'Box game',
		'Art',
		'Baby',
		'Doll',
		'Puzzle',
		'Outdoor',
		'Battery Powered',
	]
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)            
    }, [filterByToEdit])
    

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        
    }

    function toggleLabel({ target }) {
        const { checked, name: label } = target
        
        if (checked) setFilterByToEdit((prevFilter) => {
            if (prevFilter.labels.includes(label)) return prevFilter
            else return ({ ...prevFilter, labels: [...prevFilter.labels, label] })
        })
        else setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: prevFilter.labels.filter(currLabel => currLabel !== label) }))
    }

    function clearFilter() {
        setFilterByToEdit({
            txt: '',
            maxPrice: '',
            inStock: '',
            labels: []
        })
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <button className="btn" onClick={clearFilter}>Clear</button>
            <form >
                <label htmlFor="title">Title:</label>
                <input type="text"
                    id="title"
                    name="txt"
                    placeholder="By title"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />


                <select name="inStock" id="inStock" onChange={handleChange} value={filterByToEdit.inStock} >
                    <option value=''>All</option>
                    <option value={true}>In stock</option>
                    <option value={false}>Not in stock</option>
                </select>

                <FilterByLabel labels={labels} selected={filterByToEdit.labels} toggleLabel={toggleLabel}/>
            </form>
        </section>
    )
}