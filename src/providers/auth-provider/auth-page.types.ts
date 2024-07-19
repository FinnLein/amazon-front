import { NextPage } from 'next'

export type TypeRoles = {
	isOnlyUser?: boolean
}

export type NextAuthPage<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles }
