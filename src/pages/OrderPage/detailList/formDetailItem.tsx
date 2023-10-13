import axios from "axios";
import { useState } from "react"
import { useForm, SubmitHandler, FieldValues, FormProvider } from "react-hook-form"
import { Detail } from "../../../models";
import styles from './style.module.css'
import { UpdCutInset } from "./updPrices/updCutInset";
import { UpdBandChop } from "./updPrices/updBendChop";
import { UpdFoodSteel } from "./updPrices/updFoodSteel";
import { FormCheckbox } from "./formElements/formCheckbox";
import { FormRadio } from "./formElements/formRadio";
import { FormSelect } from "./formElements/formSelect";


type FormDetailItemProps = {
  DetailItem: Detail
  index: number
  updDetail: () => void
}

export function FormDetailItem({ DetailItem, index, updDetail }: FormDetailItemProps) {
  const methods = useForm<Detail>();


  const onSubmitBendChop: SubmitHandler<Detail> = async data => {
    // console.log(data)
    await axios.put<Detail>('http://localhost:8080/api/detail/', await UpdBandChop(data))
    methods.setValue('bend_cost', data.bend_cost)
    methods.setValue('chop_cost', data.chop_cost)
    updDetail()
  }

  const onSubmitCutInset: SubmitHandler<Detail> = async data => {
    // console.log(data)
    await axios.put<Detail>('http://localhost:8080/api/detail/', await UpdCutInset(data))
    methods.setValue('cut_cost', data.cut_cost)
    methods.setValue('inset_cost', data.inset_cost)
    updDetail()
  }

  const onSubmitFoodSteel: SubmitHandler<Detail> = async data => {
    // console.log(data)
    await axios.put<Detail>('http://localhost:8080/api/detail/', await UpdFoodSteel(data))
    methods.setValue('metal_cost', data.metal_cost)
    updDetail()
  }

  const onSubmitPrice: SubmitHandler<Detail> = async data => {
    // console.log(data)
    await axios.put<Detail>('http://localhost:8080/api/detail/', data)
    updDetail()
  }


  return (
    <FormProvider {...methods}>
      <form className={styles.row}>
        <input {...methods.register('id')} type="hidden" defaultValue={DetailItem.id} />
        <input {...methods.register('setup_id')} type="hidden" defaultValue={DetailItem.setup_id} />
        <div>{index + 1} </div>
        <div>{DetailItem.name}</div>
        <div>{DetailItem.thickness}</div>
        <div>{DetailItem.material}</div>
        <div>{DetailItem.quantity}</div>
        <div>
          {DetailItem.cut_count === null ? 0 : DetailItem.cut_count}
        </div>
        <FormRadio name="cut_type" defaultValue={DetailItem.cut_type} data={DetailItem} onSubmit={methods.handleSubmit(onSubmitCutInset)} />
        <div>
          <input {...methods.register('chop_count', { onBlur: methods.handleSubmit(onSubmitBendChop) })} defaultValue={DetailItem.chop_count === null ? 0 : DetailItem.chop_count} type="number" />
        </div>
        <div>
          <input {...methods.register('bends_count', { onBlur: methods.handleSubmit(onSubmitBendChop) })} defaultValue={DetailItem.bends_count === null ? 0 : DetailItem.bends_count} type="number" />
        </div>
        <div>
          <FormCheckbox name="polymer" defaultChecked={DetailItem.polymer} onSubmit={methods.handleSubmit(onSubmitPrice)} />
        </div>
        <div>
          <FormSelect name="rolling" selected={DetailItem.rolling} arrOptions={['-', 'Прокат', 'Конус']} onSubmit={methods.handleSubmit(onSubmitCutInset)} />
        </div>
        <div>
          <input {...methods.register('chop_cost', { onBlur: methods.handleSubmit(onSubmitPrice) })} defaultValue={DetailItem.chop_cost === null ? 0 : DetailItem.chop_cost} type="number" step="0.1" />
        </div>
        <div>
          <input {...methods.register('bend_cost', { onBlur: methods.handleSubmit(onSubmitPrice) })} defaultValue={DetailItem.bend_cost === null ? 0 : DetailItem.bend_cost} type="number" step="0.1" />
        </div>
        <div>
          <input {...methods.register('cut_cost', { onBlur: methods.handleSubmit(onSubmitPrice) })} defaultValue={DetailItem.cut_cost === null ? 0 : DetailItem.cut_cost} type="number" step="0.1" />
        </div>
        <div>
          <input {...methods.register('inset_cost', { onBlur: methods.handleSubmit(onSubmitPrice) })} defaultValue={DetailItem.inset_cost === null ? 0 : DetailItem.inset_cost} type="number" step="0.1" disabled={DetailItem.cut_type === 'laser' ? true : false} />
        </div>
        <div>
          <input {...methods.register('metal_cost')} defaultValue={DetailItem.metal_cost === null ? 0 : DetailItem.metal_cost} type="number" step="0.1" disabled />
        </div>
        <div>
          <FormCheckbox name="food_steel" defaultChecked={DetailItem.food_steel} disable={DetailItem.material === '1.4301' ? false : true} onSubmit={methods.handleSubmit(onSubmitFoodSteel)} />
        </div>
        <div>
          <FormSelect name="markup" selected={DetailItem.markup} arrOptions={[0, 2, 7, 10]} onSubmit={methods.handleSubmit(onSubmitFoodSteel)} />
        </div>
      </form>
    </FormProvider>
  )
}
