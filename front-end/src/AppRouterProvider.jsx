import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const appRoutes = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/articles',
        element: <ArticleListPage />,
      },
      {
        path: '/articles/:name',
        element: <ArticlePage />,
        loader: async function () {
          const response = await axios.get('/api/articles/learn-node');
          const { upvotes, comments } = response.data;
          return { upvotes, comments };
        },
      },
    ],
  },
];

const appRouter = createBrowserRouter(appRoutes);

export default function AppRouterProvider() {
  return <RouterProvider router={appRouter} />;
}
