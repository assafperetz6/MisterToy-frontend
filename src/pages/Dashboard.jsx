// import React from 'react'
// import {
// 	Chart as ChartJS,
// 	LinearScale,
// 	PointElement,
// 	LineElement,
// 	Tooltip,
// 	Legend,
// } from 'chart.js'
// import { Scatter } from 'react-chartjs-2'
// import { faker } from '@faker-js/faker'
// import { toyService, labels } from '../services/toy.service'
// import { useSelector } from 'react-redux'

// ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

// export function Dashboard() {
// 	const toys = useSelector((storeState) => storeState.toyModule.toys)
// 	const data = {
// 		datasets: [
// 			{
// 				label: 'A dataset',
// 				data: Array.from({ length: 100 }, () => ({
// 					x: faker.number.bigInt({ min: -100, max: 100 }),
// 					y: faker.number.bigInt({ min: -100, max: 100 }),
// 				})),
// 				backgroundColor: 'rgba(255, 99, 132, 1)',
// 			},
// 		],
// 	}
    
//     const options = {
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     }

// 	return (
// 		<div className="chart-container">
// 			<Scatter options={options} data={data} />
// 		</div>
// 	)
// }
