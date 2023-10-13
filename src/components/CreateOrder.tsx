import axios from 'axios'
import { Order } from '../models'
import { useForm, SubmitHandler } from "react-hook-form"
import { Form } from 'react-bootstrap'

type CreateOrderProps = {
    onCreate: () => void
    addItem: (order: Order) => void
}

export function CreateOrder({ onCreate, addItem }: CreateOrderProps) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<Order>();

    const onSubmit: SubmitHandler<Order> = async data => {
        await axios.post<Order>('http://localhost:8080/api/import/', data)
            .then((result) => {
                onCreate()
                addItem(data)
            })
            .catch((err) => {
                console.log(err.response)
                if (err.response.status > 200) {
                    setError('root.serverError', {
                        type: err.response.status,
                        message: err.response.data.message
                    })
                }
            })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title" className="form-label">ID сделки</label>
            <input {...register("id", { required: "Это поле обязательное" })} className={errors.id || errors.root ? 'form-control is-invalid' : 'form-control'} type="numer" id="id" />
            {errors.id && <Form.Text className="text-danger">{errors.id.message}</Form.Text>}
            {errors.root?.serverError.type === 400 && <Form.Text className="text-danger">{errors?.root?.serverError.message}</Form.Text>}
            <button type="submit" className="btn btn-primary container-fluid mt-5">Добавить</button>
        </form>
    )
}