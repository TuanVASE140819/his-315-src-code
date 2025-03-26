import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { route } from './routes/router'
import AuthComponent from './layout/AuthComponent'
import RootLayout from './layout/RootLayout'
import LayoutDefault from './layout/LayoutDefault/LayoutDefault'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            {route?.map(
              ({ index, path, Component, isLayout, isAuth, redirectPath }) => {
                const element = (
                  <AuthComponent
                    isAuth={isAuth}
                    Component={Component}
                    redirectPath={redirectPath}
                  />
                )
                return (
                  <Route
                    index={index}
                    key={path}
                    path={path}
                    element={
                      isLayout ? <LayoutDefault Component={element} /> : element
                    }
                  />
                )
              },
            )}
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
