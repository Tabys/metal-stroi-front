import axios from "axios"
import Form from 'react-bootstrap/Form';
import { useForm, SubmitHandler } from "react-hook-form"
import { Setup } from '../../../models'
import { Detail } from "../../../models"




type addDetailProps = {
    onCreate: () => void
    onClose: () => void
    setups: Setup[]
}

export function AddDetail({ onCreate, onClose, setups }: addDetailProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<Detail>();

    const onSubmit: SubmitHandler<Detail> = async data => {
        await axios.post<Detail>('http://localhost:8080/api/detail/', data)
        onCreate();
        onClose();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="mb-3">
                <label className="form-label">Назавние детали</label>
                <input  {...register("name", { required: "Это поле обязательное" })} className={errors.name ? 'form-control is-invalid' : 'form-control'} />
                {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
            </div>
            <div className="mb-3">
                <label className="form-label">Материал</label>
                <Form.Select {...register("setup_id")} >
                    {setups.map((item) => (
                        <option key={item.id} value={item.id}>{item.id} - {item.material}</option>
                    ))}
                </Form.Select>
            </div>
            <div className="mb-3">
                <label className="form-label">Кол-во изделий, шт</label>
                <input
                    type="number"
                    {...register("quantity", {
                        required: "Это поле обязательное",
                        min: {
                            value: 1,
                            message: "Минимальное колличество 1"
                        },
                        max: {
                            value: 100,
                            message: "Максимальное колличество 100"
                        }
                    })}
                    className={errors.quantity ? 'form-control is-invalid' : 'form-control'}
                />
                {errors.quantity && <Form.Text className="text-danger">{errors.quantity.message}</Form.Text>}
            </div>
            <div className="mb-3">
                <label className="form-label">Кол-во рубов</label>
                <input
                    type="number"
                    {...register("cut_count", {
                        required: "Это поле обязательное",
                        min: {
                            value: 1,
                            message: "Минимальное колличество 1"
                        },
                        max: {
                            value: 100,
                            message: "Максимальное колличество 100"
                        }
                    })}
                    className={errors.cut_count ? 'form-control is-invalid' : 'form-control'}
                />
                {errors.cut_count && <Form.Text className="text-danger">{errors.cut_count.message}</Form.Text>}
            </div>

            <div className="mb-3">
                <label className="form-label">Время обработки</label>
                <input
                    type="number"
                    step="any"
                    {...register("time", {
                        required: "Это поле обязательное"
                    })}
                    className={errors.time ? 'form-control is-invalid' : 'form-control'}
                />
                {errors.time && <Form.Text className="text-danger">{errors.time.message}</Form.Text>}
            </div>

            <div className="mb-3">
                <label className="form-label">Вес</label>
                <input
                    type="number"
                    step="any"
                    {...register("weight", {
                        required: "Это поле обязательное"
                    })}
                    className={errors.weight ? 'form-control is-invalid' : 'form-control'}
                />
                {errors.weight && <Form.Text className="text-danger">{errors.weight.message}</Form.Text>}
            </div>
            <button type="submit" className="btn btn-primary container-fluid mt-5">Create</button>
        </form>
    )
}