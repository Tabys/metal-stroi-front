import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Detail } from "../../../../models"


type RadioProps = {
    name: string
    defaultValue: string
    data: Detail
    onSubmit: () => void
}

export function FormRadio({ name, defaultValue, data, onSubmit }: RadioProps) {
    const { register, setValue } = useFormContext()
    const [choise, setChoise] = useState(defaultValue)

    return (
        <>
            <div>
                <input
                    {...register(name)}
                    onChange={(e) => {
                        setChoise(e.target.value);
                        setValue(name, e.target.value ? 'laser' : 'plasma')
                        onSubmit()
                    }}

                    type="radio"
                    defaultValue="laser"
                    defaultChecked={choise === 'laser' ? true : false}
                />
            </div>
            <div>
                <input
                    {...register(name)}
                    onChange={(e) => {
                        setChoise(e.target.value);
                        setValue(name, e.target.value ? 'plasma' : 'laser')
                        onSubmit()
                    }}

                    type="radio"
                    defaultValue="plasma"
                    defaultChecked={choise === 'plasma' ? true : false} />
            </div>
        </>
    )
}