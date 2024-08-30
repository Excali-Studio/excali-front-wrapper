import { Button } from '@/components/ui/button';
import { Link, useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);
	let errorText = '';
	const { t } = useTranslation();

	if (error instanceof Error) {
		errorText = error.message;
	}

	return (
		<div className="grid h-screen place-content-center">
			<div className="text-center">
				<div className="flex items-center justify-center pt-12">
					<img src={'/excali_error.png'} width={'40%'} alt={''} />
				</div>
				<h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					{t('errorPage.title')}
				</h1>

				<p className="mt-4 text-gray-500 dark:text-gray-200">
					{t('errorPage.description')}
				</p>

				<p className="mt-8 text-center text-gray-500 dark:text-gray-200">
					<i>{errorText}</i>
				</p>

				<Link to={'/'}>
					<Button>{t('errorPage.goBackButton')}</Button>
				</Link>
			</div>
		</div>
	);
}
