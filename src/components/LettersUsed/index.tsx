import styles from "./styles.module.css";

import { Letter } from "../Letter";

export type LettersUsedProps = {
	value: string;
	isCorrect: boolean;
};

type Props = {
	data: LettersUsedProps[];
};

export function LettersUsed({ data }: Props) {
	return (
		<div className={styles.letterUsed}>
			<h5>Letras Utilizadas</h5>

			<div>
				{data.map(({ value, isCorrect }) => (
					<Letter 
                    key={value} 
                    value={value} 
                    size="small" 
                    color={isCorrect ? "correct" : "wrong"} 
                    />
				))}
			</div>
		</div>
	);
}
