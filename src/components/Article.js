import './Article.css';
import Card from './Card.js';

function Article(props)
{
    return(
        <article>
            {
                //console.log(props)  
                Object.keys(props.db).map
                (
                    index =>
                    {
                       //return (console.log(props.db[index]));
                       return(<Card human={props.db[index]} />)
                    }
                )    
            }
        </article>
    )
}
export default Article;