import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { useUserAuth } from '../lib/useUserAuth';
import { Link, Navigate } from 'react-router-dom';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

function Homepage() {
	const { data: user } = useUserAuth();

	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	return (
		<>
			<div
				className={
					'flex h-screen min-h-screen items-center justify-center align-middle'
				}
			>
				<Card className="mx-auto max-w-sm">
					<CardHeader>
						<img
							src={'/excali_logo-sm.png'}
							alt={'Logo'}
							className="mb-5 h-32 w-auto"
						/>
						<CardTitle className="text-center text-2xl">
							Continue with
						</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent className={'text-center'}>
						<Link
							to={`${import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_AUTH_REDIRECT_URL}`}
						>
							<Button className={'font-bold'}>
								<div className="mr-2 h-4 w-4">
									<GoogleIcon />
								</div>
								Google
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default Homepage;
