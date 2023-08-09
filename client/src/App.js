import { useState, useEffect } from 'react'
import './App.css'
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import User from './components/User/User';

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch('/api/people');
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPeople();
  }, []);

  return (
    // <div className="App">
    //   <h1>List of People</h1>
    //   <ul>
    //     {people.map((person) => (
    //       <li key={person.id}>{person.name}</li>
    //     ))}
    //   </ul>
    // </div>
    <div className='App'>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
      {/* <User></User> */}
    </div>
  );
}

export default App;