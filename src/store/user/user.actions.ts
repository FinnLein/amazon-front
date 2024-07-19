import { errorCatch } from '@/api/api.helper'
import { getAuthUrl } from '@/config/configUrl'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthResponse, IEmailPassword } from './user.interface'

//register
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	`${getAuthUrl}/register`,
	async (data, thunkApi) => {
		try {
			const response = await AuthService.main(AuthorizationType.register, data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

//login
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	`${getAuthUrl}/login`,
	async (data, thunkApi) => {
		try {
			const response = await AuthService.main(AuthorizationType.login, data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

//logout
export const logout = createAsyncThunk(`${getAuthUrl}/logout`, async () => {
	removeFromStorage()
})

//check-auth
export const checkAuth = createAsyncThunk<IAuthResponse>(
	`${getAuthUrl}/check-auth`,
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(error)
		}
	}
)
