import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="grid place-content-center">
      <p className="text-5xl font-bold">404 - Not Found</p>
      <Link to="/" className="text-xl underline text-secondary">
        Go back to the main page
      </Link>
    </div>
  )
}

export default NotFound
