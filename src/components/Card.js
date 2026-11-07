import './Card.css';

function Card(props)
{
    return(
        <div className="card">
            {props.human.name}
            {props.human.surname}
            {props.human.age}

        </div>
    )
}
export default Card;