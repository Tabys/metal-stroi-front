import { Order } from '../../../models'
import styles from './style.module.css'
import { FormDetailList } from './formDetailList'
import { CreateDetailGroupList } from './createDetailGroupList'

type detailListProps = {
	dataOrder: Order
}

export function DetailList({ dataOrder }: detailListProps) {
	return (
		<div className={styles.wrapper_table}>
			<div className={styles.detail_list}>
				<div className={styles.row}>
					<div className={styles.line}>№</div>
					<div className={styles.line}>Наименование изделия</div>
					<div className={styles.line}>Толщина металла, мм</div>
					<div className={styles.line}>Металл</div>
					<div className={styles.line}>Кол-во изделий, шт</div>
					{/* <div className={styles.line}>Кол-во врезаний</div> */}
					<div className={styles.line}>Лазер (опция)</div>
					<div className={styles.line}>Плазма (опция)</div>
					<div className={styles.line}>Кол-во рубов</div>
					<div className={styles.line}>Цена рубки</div>
					<div className={styles.line}>Кол-во гибов</div>
					<div className={styles.line}>Цена гибки</div>
					<div className={styles.line}>Цвет ПП</div>
					<div className={styles.line}>Опции ПП</div>
					<div className={styles.line}>Цена за м²</div>
					<div className={styles.line}>Вид вальц.</div>
					<div className={styles.line}>Вальцовка</div>
					<div className={styles.line}>Чертеж</div>
					<div className={styles.line}>Цена резки</div>
					<div className={styles.line}>Цена врезания</div>
					<div className={styles.line}>Цена металла</div>
					<div className={styles.line}>Стоимость</div>
					{/* <div className={styles.line}>Пищевая сталь</div> */}
				</div>

				<FormDetailList details={CreateDetailGroupList(dataOrder)} orderData={dataOrder} />
			</div>
		</div>
	)
}
