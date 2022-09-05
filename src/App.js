
import './App.css';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Basic Initialization of Sweet Alert 2.
const MySwal = withReactContent(Swal)

function App() {
  const [output, setOutput] = useState('');
  const [marco, setMarco] = useState([]);
  const [letters, setLetters ] = useState('');
  
  const handleMarco = () => {
    console.log('marco Online');
    function createGrid(size) {
      var grid = [],
        row = [],
        x, y, t;
      for (x = size; x > 0; x--)
        row.push(x);

      addRows:
      while (grid.length < size) {
        t = row.slice();
        row = [];
        while (t.length > 0)
          row.push(t.splice(Math.floor(Math.random() * t.length), 1)[0]);

        for (y = 0; y < grid.length; y++)
          for (x = 0; x < size; x++)
            if (row[x] === grid[y][x])
              continue addRows;

        grid.push(row);
      }

      return grid;
    }

    let move = createGrid(5);
    move = move[Math.floor(Math.random() * move.length)];
    let randomMoveBegin = Math.floor(Math.random() * move.length);
    let randomMoveEnd = Math.floor(Math.random() * move.length * randomMoveBegin);
    
    move = move.slice(randomMoveBegin, randomMoveEnd);
    if(move.length >= 3) {
      
      let compass = "NESW".split('');
      move.pop();
      compass = compass[Math.floor(Math.random() * compass.length)];
      compass = compass.slice(0,1);
      console.log(compass);
      console.log(move);
      let moving = [move, compass];
      moving.flat();
      setMarco(moving);
      
      Swal.fire('Hurray You found Marco', `He is at ${moving}`, 'success')
      .then(() => {

      })
      .catch(err => {
        console.log('Problem with the Alert... ', err);
      });
    }
    
    const randomizeLetters = array => array[Math.floor(Math.random() * array.length)];
    const marcoLetters = 'LRF'.split('');
    let result = '';

    for (let i = 0; i < 9; i++) {
      result += randomizeLetters(marcoLetters);
    }
    setLetters(result);
  };

  useEffect(() => {
    document.addEventListener('keypress', onKeyPress);

    return function cleanup() {
      document.removeEventListener('keypress', onKeyPress);
    }
  }, []);

  const onKeyPress = (keyName) => {
    setOutput(keyName.key);
    console.log('The Key up is -> ', keyName.key);
  };

  const LeForm = () => (
    <Form>
      <Button type='submit' onClick={handleMarco}>Find him</Button>     
    </Form>

  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Find Marco!</h1>
        <h4>How the Game works:</h4>
        <p>To play the classic game <strong>Marco Polo</strong>, Press the button below to see if you can find him.</p>
        <p>If you do, you'll find his coordinates on the screen.</p>
        <p>Be patient if you don't find him on the first, second or tenth try! He's there somewhere, check the source code otherwise :) </p>
        {LeForm()}
      </header>
      
    </div>
  );
}

export default App;
