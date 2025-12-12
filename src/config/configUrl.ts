export const ADMIN_PANEL_URL = '/admin'

export const getSiteUrl = () => process.env.APP_URL as string
export const getAdminUrl = (path = '') => `${ADMIN_PANEL_URL}/${path}`

export const 	getAuthUrl = (string?: string) => `/auth/${string}`
export const getCategoriesUrl = (string?: string) => `/categories/${string}`
export const getBrandsUrl = (string?: string) => `/brands/${string}`
export const getReviewsUrl = (string?: string) => `/reviews/${string}`
export const getUsersUrl = (string?: string) => `/users/${string}`
export const getOrdersUrl = (string?: string) => `/orders/${string}`
export const getStatisticsUrl = (string?: string) => `/statistics/${string}`
export const getPaymentUrl = (string?: string) => `/payment/${string}`
export const getProductsUrl = (string?: string) => `/products/${string}`

export const getCategoryUrl = (string?: string) => `/category/${string}`
export const getBrandUrl = (string?: string) => `/category/${string}`
export const getProductUrl = (string?: string) => `/product/${string}`
