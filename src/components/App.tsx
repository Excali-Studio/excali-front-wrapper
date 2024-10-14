import { router } from '@/router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider/QueryProvider';

export default function App() {
	return (
		<>
			<QueryProvider>
				<ThemeProvider defaultTheme={'dark'} storageKey="vite-ui-theme">
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryProvider>
		</>
	);
}
