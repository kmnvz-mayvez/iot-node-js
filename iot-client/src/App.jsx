import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
// import AddDevice from "./pages/AddDevice"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
            {/* Public */}
            <Route path="/" element={<Dashboard />} />
         
            {/* <Route element={<Required />} >
              <Route path="/auth" element={<Auth />} />
            </Route> */}

            {/* <Route element={<PrivateRoute />}>
              <Route path="/dashboard/course" element={<Dashboard />} >
                <Route path="transaction" element={<TransactionDashboard />}/>
                <Route path="cart" element={<CartDashboard />}/>
              </Route>

              <Route path="/course/:id" element={<CoursePayment />} />

            </Route>  */}
              
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App