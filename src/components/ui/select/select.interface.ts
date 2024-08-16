import { EnumProductSort } from "@/services/product/productSort.enum"
import { Dispatch, SetStateAction } from "react"

export interface ISelect {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}
export interface IOption {
	value: EnumProductSort
	label: string
}