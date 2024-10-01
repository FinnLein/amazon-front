import { instance } from "@/api/api.interceptor";

export const FileService = {
	async upload(file: FormData, folder?: string) {
		return instance.post<{ url: string; name: string }[]>(`/media`, file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},
}
