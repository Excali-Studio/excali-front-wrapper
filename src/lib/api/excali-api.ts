import axios from 'axios';
import { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

export type Uuid = string;
export type UserId = string;
export type CanvasFiles = BinaryFiles;
export type CanvasAppState = AppState | null;
export type CanvasElements = ExcalidrawElement[] | null;

export class ExcaliApi {
	static url = import.meta.env.VITE_API_BASE_URL;

	private static readonly instance = axios.create({
		baseURL: `${ExcaliApi.url}/`,
		withCredentials: true,
	});

	public static getMe = async (): Promise<ExcaliApiUserDto> => {
		const res = await this.instance.get('/user/me');
		return res.data;
	};

	public static getCanvases = async (
		selectedTagsIds?: string[]
	): Promise<ApiPageData<CanvasDTO>> => {
		const queryKey = 'tagIds';
		const query = selectedTagsIds
			?.map((tagId) => `${queryKey}=${tagId}`)
			.join('&');

		const res = await this.instance.get(
			`/canvas${selectedTagsIds ? `?${query}` : ''}`
		);

		return res.data;
	};

	public static getCanvasById = async (canvasUid: Uuid): Promise<CanvasDTO> => {
		const res = await this.instance.get(`/canvas/${canvasUid}`);
		return res.data;
	};

	public static getTagById = async (tagId: Uuid): Promise<CanvasTagDTO> => {
		const res = await this.instance.get(`/canvas-tag/${tagId}`);
		return res.data;
	};

	public static logOutUser = async (): Promise<void> => {
		await this.instance.delete(`/auth/logout`);
	};

	public static updateCanvasState = async (
		canvasUid: Uuid,
		updatedState: CanvasStateUpdateDTO
	): Promise<CanvasDTO> => {
		const res = await this.instance.post(
			`/canvas/${canvasUid}/state`,
			updatedState
		);
		return res.data;
	};

	public static updateCanvasMetadata = async (
		canvasId: Uuid,
		metadata: UpdateCanvasMetaDTO
	) => {
		return this.instance.patch(`/canvas/${canvasId}`, {
			name: metadata.name,
		});
	};

	public static createCanvas = async (
		createDto: CanvasCreateDTO
	): Promise<CanvasDTO> => {
		const res = await this.instance.post(`/canvas`, createDto);
		return res.data;
	};

	public static createTag = async (createDto: CreateTagDTO) => {
		const res = await this.instance.post(`/canvas-tag`, createDto);
		return res.data;
	};

	public static updateTag = async (id: string, updateDto: CreateTagDTO) => {
		const res = await this.instance.put(`/canvas-tag/${id}`, updateDto);
		return res.data;
	};

	public static deleteTag = async (id: string) => {
		return this.instance.delete(`/canvas-tag/${id}`);
	};

	public static getCanvasState = async (
		canvasId: Uuid
	): Promise<CanvasContentStateDTO> => {
		const res = await this.instance.get(`/canvas/${canvasId}/state`);
		return res.data;
	};

	public static getCanvasTags = async (): Promise<CanvasTagDTO[]> => {
		const { data } = await this.instance.get('/canvas-tag');
		return data.data;
	};

	public static addTagToCanvas = async (
		canvasId: Uuid,
		tagIds: string[]
	): Promise<void> => {
		return this.instance.post(`/canvas/${canvasId}/tags`, { tagIds });
	};

	public static removeTagFromCanvas = async (
		canvasId: Uuid,
		tagIds: string[]
	): Promise<void> => {
		return this.instance.delete(`/canvas/${canvasId}/tags`, {
			data: { tagIds },
		});
	};

	public static getUsers = async (): Promise<UserDTO[]> => {
		const { data } = await this.instance.get('user/users');
		return data;
	};

	public static giveAccessByTag = async (accessData: canvasAccessDTO) => {
		return this.instance.post('/canvas/access', accessData);
	};

	public static giveAccessById = async ({
		personId,
		canvasId,
	}: canvasAccessByIdDTO) => {
		return this.instance.post(`/canvas/${canvasId}/access`, { personId });
	};

	public static removeAccessById = async ({
		personId,
		canvasId,
	}: canvasAccessByIdDTO) => {
		return this.instance(`/canvas/${canvasId}/access`, {
			method: 'DELETE',
			data: { personId },
		});
	};

	public static deleteCanvasById = async (canvasId: Uuid) => {
		return this.instance.delete(`/canvas/${canvasId}`);
	};
}

//@TODO load interfaces from api project as a separate npm package

export interface ExcaliApiUserDto {
	uid: UserId;
	roles: { name: string }[];
	displayName: string;
}

export interface CreateTagDTO {
	name: string;
	color?: string;
	description?: string;
}

export interface CanvasDTO {
	id: Uuid;
	workspaceId: Uuid;
	dateCreated: Date;
	dateUpdated: Date;
	name: string;
	tags: CanvasTagDTO[];
	isOwner: boolean;
	owner: string;
	canvasAccesses: CanvasAccessesDTO[];
}

export interface CanvasAccessesDTO {
	isOwner: boolean;
	user: UserDTO;
}

export interface ApiPageInfo {
	totalItems: number;
	totalPages: number;
	pageSize: number;
	pageNumber: number;
}

export interface ApiPageParams {
	pageSize?: number;
	page?: number;
}

export interface ApiPageData<DATA> {
	page: ApiPageInfo;
	data: DATA[];
}

export interface CanvasStateUpdateDTO {
	appState: CanvasAppState;
	elements: CanvasElements;
	files: CanvasFiles;
}

export interface CanvasCreateDTO {
	name: string;
	userId: Uuid;
}

export interface CanvasContentStateDTO {
	id: Uuid;
	appState: CanvasAppState;
	elements: CanvasElements;
	files: CanvasFiles;
}

export interface CanvasTagDTO {
	id: Uuid;
	name: string;
	color: string | null;
	description: string | null;
}

export interface UpdateCanvasMetaDTO {
	name: string;
}

export interface UserDTO {
	id: string;
	email: string;
	displayName: string;
}

export interface canvasAccessDTO {
	tagIds: string[];
	personIds: string[];
}

export interface canvasAccessByIdDTO {
	canvasId: string;
	personId: string;
}
