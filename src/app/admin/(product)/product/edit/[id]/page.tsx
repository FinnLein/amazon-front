import { ProductForm } from '@/ui/fields/product-form/ProductForm'

export default function ProductEditPage({
	params: { id }
}: {
	params: { id: string }
}) {
	return <ProductForm id={id} type='edit' />
}
