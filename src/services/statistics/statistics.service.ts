import { instance } from '@/api/api.interceptor'
import { getStatisticsUrl } from '@/config/configUrl'
import { TStatisticsResponse } from '@/types/statistics.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

export const StatisticsService = {
	async getMain() {
		return instance<TStatisticsResponse>({
			url: getStatisticsUrl('main'),
			method: EnumHTTPMethods.get
		})
	}
}
