import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DashboardPage from '../pages/DashboardPage';
import Analytics from '../pages/Analytics';
import AddTransaction from '../pages/AddTransaction';
import TransactionHistory from '../pages/TransactionHistory';
import Profile from '../pages/Profile';

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[
            {
                index:true, //시작페이지(/)
                element: <DashboardPage />,
            },
            {
                path:'analytics',
                element:<Analytics />
            },
            {
                path:'addTransaction',
                element:<AddTransaction />
            },
            {
                path:'transactionHistory',
                element:<TransactionHistory />
            },
            {
                path:'profile',
                element: <Profile />
            }

        ]
    }
])

