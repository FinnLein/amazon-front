import {
	Airplay,
	BookA,
	ChartArea,
	ChartColumnStacked,
	ChartPie,
	FolderKanban,
	Home,
	LucideIcon,
	Star,
	Users
} from 'lucide-react'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

export interface IMenuItem {
	icon: LucideIcon
	name: string
	ref: string
}

export const admin = 'admin'

export const SIDEBAR_DATA: IMenuItem[] = [
	{
		name: 'Home',
		icon: Home,
		ref: ADMIN_PAGES.HOME
	},
	{
		name: 'Main chart',
		icon: ChartArea,
		ref: ADMIN_PAGES.MAIN_CHART
	},
	{
		name: 'Category chart',
		icon: ChartPie,
		ref: ADMIN_PAGES.CATEGORY_CHART
	},
	{
		name: 'Users',
		icon: Users,
		ref: ADMIN_PAGES.USERS
	},
	{
		name: 'Products',
		icon: FolderKanban,
		ref: ADMIN_PAGES.PRODUCTS
	},
	{
		name: 'Categories',
		icon: ChartColumnStacked,
		ref: ADMIN_PAGES.CATEGORIES
	},
	{
		name: 'Brands',
		icon: Airplay,
		ref: ADMIN_PAGES.BRANDS
	},
	{
		name: 'Reviews',
		icon: Star,
		ref: ADMIN_PAGES.REVIEWS
	},
	{
		name: 'Orders',
		icon: BookA,
		ref: ADMIN_PAGES.ORDERS
	}
]
