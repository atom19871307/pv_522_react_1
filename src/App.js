import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Nav from './components/Nav.js'
import Article from './components/Article.js';
import Footer from './components/Footer.js';

import db from './db.json';

function App() {
 
let nav =
{
  "Главная" : "/index",
  "Новости" : "/news",
  "Магазин" : "/shop",
  "About" : "/about",
  "Контакты" : "/contacts",
  
};
   
  return (
    <div className="App">
      <Header />
      <Nav menu={nav} />
      <Article  db = {db} />
      <Footer />
    </div>
  );
}

export default App;
