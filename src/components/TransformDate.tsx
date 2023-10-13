type DateNull = Date | null
type StringNull = string | null

type TransDateProps = {
    orderDate: string | undefined
}

export function TransformDate({ orderDate }: TransDateProps) {
    const oldDate: DateNull = orderDate ? new Date(orderDate) : null;
    const customDate: StringNull = oldDate ? ('0' + oldDate.getDate()).slice(-2) + '.' + ('0' + oldDate.getMonth()).slice(-2) + '.' + oldDate.getFullYear() : null;

    return (
        <>
            {customDate}
        </>
    )
}