export function FilterByLabel({ labels, selected = [], toggleLabel }) {
	return (
		<ul className="label-list clean-list">
			{labels.map((label) => (
				<li key={label}>
                    <label htmlFor={label}>{label}</label>
					<input
						type="checkbox"
						name={label}
						id={label}
						onChange={toggleLabel}
                        checked={selected.includes(label) ? true : false}
					/>
				</li>
			))}
		</ul>
	)
}
