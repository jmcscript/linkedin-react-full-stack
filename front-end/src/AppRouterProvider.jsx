import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
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
        loader: ArticleListPage.loader,
      },
      {
        path: '/articles/:name',
        element: <ArticlePage />,
        loader: ArticlePage.loader,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/create-account',
        element: <CreateAccountPage />,
      },
    ],
  },
];

const appRouter = createBrowserRouter(appRoutes);

export default function AppRouterProvider() {
  return <RouterProvider router={appRouter} />;
}
