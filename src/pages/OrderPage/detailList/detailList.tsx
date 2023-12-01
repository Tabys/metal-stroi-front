import { Order } from "../../../models";
import styles from './style.module.css'
import { FormDetailList } from "./formDetailList";
import { CreateDetailGroupList } from "./createDetailGroupList";

type detailListProps = {
    dataOrder: Order
}


export function DetailList({ dataOrder }: detailListProps) {


    return (
        <div className={styles.wrapper_table}>
            <div className={styles.detail_list}>
                <div className={styles.row}>
                    <div>№</div>
                    <div>Наименование изделия</div>
                    <div>Толщина металла, мм</div>
                    <div>Металл</div>
                    <div>Кол-во изделий, шт</div>
                    <div>Кол-во врезаний</div>
                    <div>Лазер (опция)</div>
                    <div>Плазма (опция)</div>
                    <div>Кол-во рубов</div>
                    <div>Кол-во гибов</div>
                    <div>Полимерка (опция)</div>
                    <div>Вальцовка</div>
                    <div>Цена рубки</div>
                    <div>Цена гибки</div>
                    <div>Цена резки</div>
                    <div>Цена врезки</div>
                    <div>Цена металла</div>
                    <div>Пищевая сталь</div>
                </div>

                <FormDetailList details={CreateDetailGroupList(dataOrder)} orderData={dataOrder} />
            </div>
        </div>
    );
}
