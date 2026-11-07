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
                    (
                        <li>
                            <a href={props.menu[element]}>{element}</a>
                        </li>
                    )
                )
            }
        </ul>
    </nav>
)
}
export default Nav;