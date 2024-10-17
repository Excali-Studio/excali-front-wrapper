import { createBrowserRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import ErrorPage from './components/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
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
						lazy: async () => {
							const { default: Component } = await import(
								'./components/Editor'
							);
							return { Component };
						},
					},
					{
						path: '/dashboard',
						lazy: async () => {
							const { default: Component } = await import(
								'./components/UserDashboard'
							);
							return { Component };
						},
					},
					{
						path: '/tags',
						lazy: async () => {
							const { default: Component } = await import(
								'@/components/TagsManager'
							);
							return { Component };
						},
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
