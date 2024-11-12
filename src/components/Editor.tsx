import { Excalidraw, Footer } from '@excalidraw/excalidraw';
import { Theme } from '@excalidraw/excalidraw/types/element/types';
import { useTheme } from '@/components/ThemeProvider';
import { Badge } from '@/components/ui/badge';
import CanvasBackButton from '@/components/buttons/CanvasBackButton';
import { useEditor } from '@/hooks/useEditor';
import { useState } from 'react';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';

export default function Editor() {
	const theme = useTheme();

	const [excalidrawAPI, setExcalidrawApi] =
		useState<ExcalidrawImperativeAPI | null>(null);

	const {
		debouncedChangeHandler,
		loadedCanvas,
		canvasState,
		debouncedPointerHandler,
	} = useEditor(excalidrawAPI);

	//@TODO add animated loaders
	return (
		<div style={{ height: 'calc(100vh)' }} className="custom-styles">
			{canvasState && (
				<Excalidraw
					onChange={debouncedChangeHandler}
					initialData={canvasState}
					renderTopRightUI={() => CanvasBackButton()}
					theme={theme.theme as Theme}
					isCollaborating={true}
					excalidrawAPI={setExcalidrawApi}
					onPointerUpdate={debouncedPointerHandler}
				>
					<Footer>
						{loadedCanvas && (
							<div className={'ml-4 mt-1'}>
								<Badge variant="secondary">{loadedCanvas.name}</Badge>
							</div>
						)}
					</Footer>
				</Excalidraw>
			)}
		</div>
	);
}
