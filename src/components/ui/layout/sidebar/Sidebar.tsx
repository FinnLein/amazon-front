import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import { LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu'

import Loader from '@/ui/Loader'
import { useGetCategories } from '@/ui/layout/sidebar/useGetCategories'

import { useUserStore } from '@/store/user/userStore'
import { FiLogOut } from 'react-icons/fi'

const Sidebar: FC = () => {
	const { data, isLoading } = useGetCategories()

	const [isRolledUp, setIsRolledUp] = useState(false)

	const pathName = usePathname()
	const { user } = useUserStore()
	const { logout } = useUserStore()

	const toggleSidebar = () => {
		setIsRolledUp(!isRolledUp)
	}

	return (
		<aside className='relative bg-secondary flex flex-col justify-between'>
			<button
				type='button'
				className='absolute top-0 right-7'
				onClick={() => toggleSidebar()}
			>
				{isRolledUp ? (
					<LuPanelLeftOpen size={30} color={'white'} />
				) : (
					<LuPanelLeftClose size={30} color={'white'} />
				)}
			</button>
			{isLoading ? (
				<Loader />
			) : data ? (
				<div className='mb-20'>
					<div className='text-xl text-white mt-4 mb-6 ml-6'>Categories: </div>
					<ul>
						{data?.map(category => (
							<li key={category.id}>
								<Link
									className={cn(
										'block text-lg my-3 px-10 hover:text-primary transition-colors duration-200 ',
										pathName === `/category/${category.slug}`
											? 'text-primary'
											: 'text-white'
									)}
									href={`/category/${category.slug}`}
								>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div>Categories not found</div>
			)}
			{!!user && (
				<div>
					<button
						className='text-white flex items-center ml-10 my-10'
						onClick={() => logout()}
						type='button'
					>
						<FiLogOut />
						<span className='ml-2'>Logout</span>
					</button>
				</div>
			)}
		</aside>
	)
}

export default Sidebar
