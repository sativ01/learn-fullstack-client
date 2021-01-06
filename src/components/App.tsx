import { BrowserRouter, Route } from 'react-router-dom'

const Survey = () => <h3> Survey </h3>
const Langing = () => <h4> Langing </h4>

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Langing} />
            <Route path="/survey" component={Survey} />
          </div>
        </BrowserRouter>
        <a
          className="App-link"
          href="/auth/google"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login with Google
        </a>
      </header>
    </div>
  )
}

export default App
