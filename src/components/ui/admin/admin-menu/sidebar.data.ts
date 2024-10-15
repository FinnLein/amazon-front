import {
	ChartArea,
	ChartColumnStacked,
	ChartPie,
	FolderKanban,
	Home,
	LucideIcon,
	Users
} from 'lucide-react'

export interface IMenuItem {
	icon: LucideIcon
	name: string
	ref: string
}

const admin = 'admin'

export const sidebarData: IMenuItem[] = [
	{
		name: 'Home',
		icon: Home,
		ref: `/${admin}`
	},
	{
		name: 'Main chart',
		icon: ChartArea,
		ref: `/${admin}/main-chart`
	},
	{
		name: 'Category chart',
		icon: ChartPie,
		ref: `/${admin}/category-chart`
	},
	{
		name: 'Users',
		icon: Users,
		ref: `/${admin}/users`
	},
	{
		name: 'Products',
		icon: FolderKanban,
		ref: `/${admin}/products`
	},
	{
		name: 'Categories',
		icon: ChartColumnStacked,
		ref: `/${admin}/categories`
	}
]
