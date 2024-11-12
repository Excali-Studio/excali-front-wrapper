import { useRef } from 'react';

export function useSyncVersions() {
	const lastSyncSceneVersion = useRef(-1);
	const syncElementVersions = useRef<Map<string, number>>(new Map());

	return { lastSyncSceneVersion, syncElementVersions };
}
