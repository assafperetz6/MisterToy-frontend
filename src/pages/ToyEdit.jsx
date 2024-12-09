import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import { useEffect, useState } from 'react'

export function ToyEdit() {
	const navigate = useNavigate()
	const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
	const { toyId } = useParams()

	useEffect(() => {
		if (toyId) loadToy()
	}, [])

	async function loadToy() {
		try {
			const toy = await toyService.getById(toyId)
			setToyToEdit(toy)
		} catch (err) {
			console.log('Had issues in toy edit', err)
			navigate('/toy')	
		}
	}

	function handleChange({ target }) {
		let { value, type, name: field } = target
		value = type === 'number' ? +value : value
		setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
	}

	async function onDeleteToy(ev) {
        ev.preventDefault()

		try {
			await toyService.remove(toyId)
			showSuccessMsg('Toy removed!')
			navigate('/toy')
		} catch (err) {
			console.log('Had issues removing toy', err)
			showErrorMsg('Had issues removing toy')
		}
	}

	async function onSaveToy(ev) {
		ev.preventDefault()
		if (!toyToEdit.price) toyToEdit.price = 1000

		debugger
		try {
			await saveToy(toyToEdit)
			showSuccessMsg('Toy Saved!')
			navigate('/toy')
		} catch (err) {
			console.log('Had issues in toy details', err)
			showErrorMsg('Had issues in toy details')
		}
	}

	return (
		<section className="toy-edit">
			<h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

			<form onSubmit={onSaveToy}>
				<label htmlFor="vendor">name : </label>
				<input
					type="text"
					name="vendor"
					id="vendor"
					placeholder="Enter name..."
					value={toyToEdit.name}
					onChange={handleChange}
				/>
				<label htmlFor="price">Price : </label>
				<input
					type="number"
					name="price"
					id="price"
					placeholder="Enter price"
					value={toyToEdit.price ? toyToEdit.price : ''}
					onChange={handleChange}
				/>

				<div>
					<button>{toyToEdit._id ? 'Save' : 'Add'}</button>
					<button onClick={ev => onDeleteToy(ev)}>Delete</button>
					<Link to="/toy">Cancel</Link>
				</div>
			</form>
		</section>
	)
}
