import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

function App() {
  return (
    <div className='bg-stone-50'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
