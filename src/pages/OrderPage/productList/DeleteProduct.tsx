import CloseButton from 'react-bootstrap/CloseButton'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Product } from '../../../models'
import Tooltip from '../../../components/Tooltip'
import apiClient from '../../../components/apiClient'

type DeleteProductProps = {
	product: number
	update: () => void
}

export function DeleteProduct({ product, update }: DeleteProductProps) {
	const config = {
		data: {
			id: product,
		},
	}

	const { handleSubmit } = useForm<Product>()

	const onSubmit: SubmitHandler<Product> = async () => {
		await apiClient.delete<Product>('products/', config)
		await update()
	}

	return (
		<Tooltip conditions={true} text='Удалить изделие'>
			<CloseButton onClick={handleSubmit(onSubmit)} />
		</Tooltip>
	)
}
