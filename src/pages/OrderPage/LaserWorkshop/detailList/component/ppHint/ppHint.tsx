import { PaintingMods } from '../../../../../../models'
import styles from '../../style.module.css'

type PPHintProps = {
	paintingMods: PaintingMods[]
}

export function PPHint({ paintingMods }: PPHintProps) {
	return (
		<div className={styles.pp_hint}>
			{paintingMods.map(paintingMod => {
				return (
					<p key={paintingMod.id}>
						<i className={'fi ' + paintingMod.icon}></i> - {paintingMod.name}
					</p>
				)
			})}
		</div>
	)
}
