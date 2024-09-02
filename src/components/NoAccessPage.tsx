import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ExcaliErrorImage from '@/assets/images/excali_error.png';

export const NoAccessPage = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<img
					className="w-[40%]"
					src={ExcaliErrorImage}
					alt="excali-error-image"
				/>
				<h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					Access Denied
				</h1>
				<div className="text-gray-500 dark:text-gray-200">
					You can't go further.
				</div>

				<Link to={'/'}>
					<Button>Go Back Home</Button>
				</Link>
			</div>
		</div>
	);
};
