import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type SelectProps = {
    arrOptions: any[]
    selected: any
    name: string
    onSubmit: () => void
}

export function FormSelect({ arrOptions, selected, name, onSubmit }: SelectProps) {
    const { register, setValue } = useFormContext()
    const [select, setSelect] = useState(selected);

    const options = arrOptions.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    return (
        <select
            {...register(name)}
            defaultValue={select}
            onChange={(e) => {
                setValue(name, e.target.value)
                onSubmit()
            }}
        >
            {options}
        </select>
    )
}
