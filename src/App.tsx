import styles from "./app.module.css";
import { WORDS, Challenge } from "./utils/words";

import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { LettersUsed, LettersUsedProps } from "./components/LettersUsed";
import { Tip } from "./components/Tip";
import { useEffect, useState } from "react";

const ATTEMPT_MARGIN = 3;

export function App() {
	const [score, setScore] = useState<number>(0);
	const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
	const [letter, setletter] = useState<string>("");
	const [challenge, setChallenge] = useState<Challenge | null>(null);

	function handleConfirm() {
		if (!challenge) return;

		if (!letter.trim) return alert("Digite uma letra");

		const value = letter.toUpperCase();

		const exists = lettersUsed.find(used => used.value === value.toUpperCase());

		if (exists) {
			setletter("");

			return alert("Vocë já utilizou a letra " + value);
		}

		const hits = challenge.word
			.toUpperCase()
			.split("")
			.filter(char => char === value).length;

		const isCorrect = hits > 0;

		const currentScore = score + hits;

		setLettersUsed(prev => [...prev, { value, isCorrect }]);
		setScore(currentScore);
		setletter("");
	}

	function handleRestartGame() {
		const isConfirmed = window.confirm("Você tem certeza que deseja reiniciar?");

		if (isConfirmed) {
			return startGame();
		}
	}

	function startGame() {
		const index = Math.floor(Math.random() * WORDS.length);
		const randomWord = WORDS[index];

		setChallenge(randomWord);

		setScore(0);
		setletter("");
		setLettersUsed([]);
	}

	function endGame(message: string) {
		alert(message);

		startGame();
	}

	useEffect(() => {
		startGame();
	}, []);

	useEffect(() => {
		if (!challenge) {
			return;
		}

		setTimeout(() => {
			if (score === challenge.word.length) {
				return endGame("Parabéns você descobriu a palavra!");
			}

			const attemptLimit = challenge.word.length + ATTEMPT_MARGIN;
			if (lettersUsed.length === attemptLimit) {
				return endGame("Que pena você usou todas as tentativas");
			}
		}, 200);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [score, lettersUsed.length]);

	if (!challenge) {
		return;
	}

	return (
		<div className={styles.container}>
			<main>
				<Header current={lettersUsed.length} max={challenge.word.length + ATTEMPT_MARGIN} onRestart={handleRestartGame} />

				<Tip tip={challenge.tip} />

				<div className={styles.words}>
					{challenge.word.split("").map((letter, index) => {
						const letterUsed = lettersUsed.find(used => used.value.toUpperCase() === letter.toUpperCase());

						return (
							<Letter value={letterUsed?.value} key={index} color={letterUsed?.isCorrect ? "correct" : "default"} />
						);
					})}
				</div>

				<h4>Palpite</h4>

				<div className={styles.guess}>
					<Input autoFocus maxLength={1} placeholder="?" onChange={e => setletter(e.target.value)} value={letter} />
					<Button title="Confirmar" onClick={handleConfirm} disabled={!letter} />
				</div>

				<LettersUsed data={lettersUsed} />
			</main>
		</div>
	);
}
