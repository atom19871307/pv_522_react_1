import './Nav.css'

function Nav(props)
{
    console.log(props)
return(
    <nav>
        <ul>
            {
                Object.keys(props.menu).map
                (
                    element =>
                    {
                        return(
                             <li key={element}>
                            <a href={props.menu[element]}>{element}</a>
                        </li>
                        )
                    }
                )
            }
        </ul>
    </nav>
)
}
export default Nav;