import { Button } from '@/components/ui/button.tsx';

const CanvasBackButton = () => {
	return (
		<Button onClick={() => (window.location.href = '/dashboard')}>Back</Button>
	);
};

export default CanvasBackButton;
