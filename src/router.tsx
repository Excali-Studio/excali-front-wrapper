import { createBrowserRouter } from 'react-router-dom';
import Homepage from './components/Homepage.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import Editor from './components/Editor.tsx';
import UserDashboard from './components/UserDashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import TagsManager from '@/components/TagsManager.tsx';

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
				path: '/',
				element: <Homepage />,
			},
		],
	},
]);
