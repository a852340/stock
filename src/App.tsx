import { StockList } from './components/StockList'
import { MainContent } from './components/MainContent'
import './App.css'

function App() {
  return (
    <div className="flex h-screen bg-dark">
      <StockList />
      <MainContent />
    </div>
  )
}

export default App