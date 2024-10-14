import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ExcaliErrorImage from '@/assets/images/excali_error.png';
import { useTranslation } from 'react-i18next';

export const NoAccessPage = () => {
	const { t } = useTranslation();
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<img
					className="w-[40%]"
					src={ExcaliErrorImage}
					alt="excali-error-image"
				/>
				<h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					{t('components.noAccessPage.title')}
				</h1>
				<div className="text-gray-500 dark:text-gray-200">
					{t('components.noAccessPage.description')}
				</div>

				<Link to={'/'}>
					<Button>{t('components.noAccessPage.backButton')}</Button>
				</Link>
			</div>
		</div>
	);
};
