import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table"

import './App.css';



const App = () => {
  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One Piece</td>
            <td>Oda</td>
            <td>Adventure</td>
            <td>9.99</td>
          </tr>
          <tr>
            <td>Percy Jackson</td>
            <td>Rick Riordan</td>
            <td>Adventure</td>
            <td>12.99</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
