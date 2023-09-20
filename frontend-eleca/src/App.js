import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Importing Components
import Home from './components/home/Home'
import TermsAndConditions from './components/home/TermsAndConditions';
import AdminLogin from './components/home/AdminLogin';
import ServiceDetailsPage from './components/home/ServiceDetailsPage';
import WarrantyCardUser from './components/home/WarrantyCard'

// Admin Components
import AdminDashboard from './components/admin/Dashboard'
import ServicePage from './components/admin/ServicePage'
import Payment from './components/home/Payment'
import NewService from './components/admin/NewService'
import PriceList from './components/admin/PriceList'
import WarrantyCard from './components/admin/WarrantyCard'

// 404
import Error from './components/Error'

const router = createBrowserRouter([
  // Home / User
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <AdminLogin/>
  },
  // Payment
  {
    path: '/pay',
    element: <Payment/>
  },
  // User Warranty Card
  {
    path: '/warranty-card',
    element: <WarrantyCardUser/>
  },
  {
    path: '/service-request/:id',
    element: <ServiceDetailsPage/>
  },

  // Admin Dashboard
  {
    path: '/admin/dashboard',
    element: <AdminDashboard/>
  },
  {
    path: '/admin/view-service-details/:id',
    element: <ServicePage/>
  },
  {
    path: '/admin/new-service-request',
    element: <NewService/>
  },
  {
    path: '/admin/warranty-info',
    element: <WarrantyCard/>
  },
  {
    path: '/admin/price-list',
    element: <PriceList/>
  },

  // Terms and Conditions
  {
    path: '/term-and-conditions',
    element: <TermsAndConditions/>
  },
  {
    path: '*',
    element: <Error/>
  }
])

function App() {
  return (
    <AnimatePresence initial={false}>
      <RouterProvider router={router}/>
    </AnimatePresence>
  );
}

export default App;
