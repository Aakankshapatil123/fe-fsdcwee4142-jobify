import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello Word</h1>
  }
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
