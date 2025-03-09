import { useState } from "react"
import { useFormContext } from "react-hook-form"


type CheckBoxProps = {
    name: string
    disable?: boolean
    defaultChecked: boolean
    onSubmit: () => void
}

export function FormCheckbox({ name, defaultChecked, disable, onSubmit }: CheckBoxProps) {
    const { register, setValue } = useFormContext()
    const [checked, setChecked] = useState(defaultChecked)

    return (
        <input
            {...register(name)}
            onChange={(e) => {
                setChecked(!checked)
                setValue(name, e.target.checked ? true : false)
                onSubmit()
            }}
            disabled={disable ? disable : false}
            type="checkbox"
            defaultChecked={checked}
            className="form-check-input"
        />
    )
}