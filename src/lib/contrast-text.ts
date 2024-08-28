import tinyColor from 'tinycolor2';

export function getContrastText(bgColor: string) {
	const color = tinyColor(bgColor);
	const luminance = color.getLuminance();

	return luminance > 0.5 ? 'black' : 'white';
}
