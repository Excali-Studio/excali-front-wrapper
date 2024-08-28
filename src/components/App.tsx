import { router } from '../router.tsx';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider.tsx';
import { QueryProvider } from '@/providers/QueryProvider/QueryProvider.tsx';

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
