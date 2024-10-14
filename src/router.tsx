import { createBrowserRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import ErrorPage from './components/ErrorPage';
import Editor from './components/Editor';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TagsManager from '@/components/TagsManager';
import { NoAccessPage } from '@/components/NoAccessPage';

export const router = createBrowserRouter([
	{
		errorElement: <ErrorPage />,
		children: [
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: '/editor/:canvasId',
						element: <Editor />,
					},
					{
						path: '/dashboard',
						element: <UserDashboard />,
					},
					{
						path: '/tags',
						element: <TagsManager />,
					},
				],
			},
			{
				path: '/error-test',
				element: <ErrorPage />,
			},
			{
				path: '/no-access',
				element: <NoAccessPage />,
			},
			{
				path: '/',
				element: <Homepage />,
			},
		],
	},
]);
