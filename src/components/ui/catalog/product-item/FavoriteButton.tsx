'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useProfile } from '@/hooks/useProfile'

import { UserService } from '@/services/user/user.service'

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
	const {
		user: { isLoggedIn, favorites }
	} = useProfile()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => UserService.toggleFavorite(productId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get profile'] })
		}
	})

	const isExists = (favorites || []).some(favorite => favorite.id === productId)

	return isLoggedIn ? (
		<div>
			<button className='text-primary' onClick={() => mutate()}>
				{isExists ? <AiFillHeart /> : <AiOutlineHeart />}
			</button>
		</div>
	) : null
}

export default FavoriteButton
