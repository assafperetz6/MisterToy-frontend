import { useDispatch, useSelector } from 'react-redux'

import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {
    return (
        <footer className='app-footer'>
            <h5>
                Currently 0 toys in the shop
            </h5>
            <p>
                Coffeerights to all
            </p>
            <h5>
                <span>{0}</span> Products in your Cart
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: TOGGLE_CART_IS_SHOWN })
                }}>
                    ({(false) ? 'hide' : 'show'})
                </a>
            </h5>
            <UserMsg />
        </footer>
    )
}
