import { DocTableDetail, Order, PaintingMods, TotalData, Detail } from '../../../../models'
import styles from './style.module.css'
import { FormDetailList } from './formDetailList'
import { ControlPanel } from './component/controlPanel/controlPanel'
import Tooltip from '../../../../components/Tooltip'
import { PPHint } from './component/ppHint/ppHint'

type detailListProps = {
	dataOrder: Order
	detailGroupList: Detail[]
	editedDetails?: DocTableDetail[]
	editedDetailsFull?: DocTableDetail[]
	paintingMods: PaintingMods[]
	total: TotalData
	totalOnlyDetail: TotalData
	updated: () => void
}

export function DetailList({ dataOrder, detailGroupList, editedDetails, editedDetailsFull, paintingMods, total, totalOnlyDetail, updated }: detailListProps) {
	return (
		<div className={styles.wrapper_table}>
			<div className={styles.detail_list + ' ' + styles.border_bold}>
				<div className={styles.row + ' ' + styles.header}>
					<div className={styles.line}>№</div>
					<div className={styles.line}>Наименование детали</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/numbers-min.png' alt='quantity' />
						<p>Количество деталей, шт</p>
					</div>

					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/heavy-min.png' alt='weight-metal' />
						<p>Толщина металла, мм</p>
					</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/free-icon-metal-9920910-min.png' alt='metal-type' />
						<p>Вид металла</p>
					</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/ruble-min.png' alt='metal-price' />
						<p>Цена металла</p>
					</div>

					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/laser-gun-min.png' alt='lazer-cut' />
						<p>Лазерная резка</p>
					</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/plasma-ball-min.png' alt='plasma-cut' />
						<p>Плазменная резка</p>
					</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/free-icon-cut-264276-min.png' alt='incet-price' />
						<p>Цена врезания</p>
					</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/ruble-min.png' alt='cut-ptice' />
						<p>Цена резки</p>
					</div>

					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/free-icon-bending-1055057-min.png' alt='bend-quantity' />
						<p>Кол-во гибов</p>
					</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/ruble-min.png' alt='bending-price' />
						<p>Цена гибки</p>
					</div>

					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/free-icon-wood-3727622-min.png' alt='chop-quantity' />
						<p>Кол-во рубов</p>
					</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/ruble-min.png' alt='chop-price' />
						<p>Цена рубки</p>
					</div>

					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/rolling-machine-min.png' alt='rolling-quantity' />
						<p>Вид вальцовки</p>
					</div>
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/ruble-min.png' alt='rolling-price' />
						<p>Цена вальцовки</p>
					</div>

					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/color-palette-min.png' alt='pp-color' />
						<p>Цвет ПП</p>
					</div>
					<div className={styles.line + ' ' + styles.small + ' ' + styles.pp_options}>
						<Tooltip conditions={true} text={<PPHint paintingMods={paintingMods} />}>
							<img src='/images/header-table/free-icon-options-8129628-min.png' alt='pp-options' />
						</Tooltip>
						<p>Опции ПП</p>
					</div>
					{/* <div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/ruble-min.png' alt='pp-price' />
						<p>Цена за м²</p>
					</div> */}
					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/ruble-min.png' alt='pp-price' />
						<p>Цена за деталь</p>
					</div>

					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/free-icon-protactor-3976304-min.png' alt='drowing' />
						<p>Чертёж</p>
					</div>

					<div className={styles.line + ' ' + styles.small}>
						<img src='/images/header-table/free-icon-money-bag-5584203-min.png' alt='cost' />
						<p>Стоимость</p>
					</div>
				</div>

				<ControlPanel orderData={dataOrder} update={updated} paintingMods={paintingMods} />

				<FormDetailList
					updData={updated}
					editedDetails={editedDetails}
					editedDetailsFull={editedDetailsFull}
					total={total}
					totalOnlyDetail={totalOnlyDetail}
					details={detailGroupList}
					orderData={dataOrder}
					paintingMods={paintingMods}
				/>
			</div>
		</div>
	)
}
