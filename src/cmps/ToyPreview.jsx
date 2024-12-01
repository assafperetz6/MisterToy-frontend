import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <img src={`https://robohash.org/${toy._id}`} alt="" />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>} */}
            <hr />
            <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
            <button><Link to={`/toy/${toy._id}`}>Details</Link></button>

        </article>
    )
}