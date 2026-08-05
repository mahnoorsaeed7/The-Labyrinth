import { useState, useEffect } from 'react'

function App() {
  // Create a state variable named "status".
  // Initial value: "Reaching into the Labyrinth..."
  // status -> current value
  // setStatus -> function to update the value
  const [status, setStatus] = useState('Reaching into the Labyrinth...')

  // Runs once after the component is first rendered
  // because the dependency array [] is empty.
  
  useEffect(() => {
    // Send a GET request to the backend
    fetch('http://localhost:5000/api/health')

      // Convert the response from JSON text
      // into a JavaScript object
      .then((response) => response.json())

      // data is now a JavaScript object like:
      // {
      //   status: "ok",
      //   message: "Server is running"
      // }
      .then((data) => {
        // Update the state with the message
        // React will automatically re-render the UI
        setStatus(data.message)
      })

      // If something goes wrong (server down, wrong URL, etc.)
      .catch((error) => {
        console.error(error)
        setStatus('❌ Unable to connect to the server.')
      })
  }, [])

  // JSX returned by the component
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* Display the current value of the status state */}
      <p>{status}</p>
    </div>
  )
}

// Make this component available to other files
export default App