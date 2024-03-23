// import "../styles/index.sass"
import ListBlogs from "./blog/ListBlogs";
import ViewBlogs from "./blog/ViewBlogs";
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListBlogs />} />
        <Route path="/blog/:id" element={<ViewBlogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
