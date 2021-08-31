import React, { useEffect, useState } from "react";
import {
	decrement,
	increment,
	incrementByAmount,
} from "../redux/slices/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/common/hooks";
import { getAllTasks } from "../redux/slices/dashboard/tasksSlice";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

export const selectQuote = (state: RootState) => state.tasks;

export const tasksSelector = createSelector(selectQuote, (state) => state);

const IndexPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { data, pending, error } = useAppSelector(tasksSelector);
	const [incrementAmount, setIncrementAmount] = useState<number>(0);
	useEffect(() => {
		dispatch(getAllTasks());
	}, []);
	return (
		<>
			<h1>Welcome to the greatest app in the world!</h1>
			<h2>
				{!pending ? (
					data.map((el) => (
						<>
							<p>{el.id}</p>
							<p>{el.title}</p>
							<p>{el.description}</p>
						</>
					))
				) : (
					<p>loading</p>
				)}
			</h2>
			<div>
				<input
					value={incrementAmount}
					onChange={(e) => setIncrementAmount(Number(e.target.value))}
					type="number"
				/>
				<button onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}>
					Increment by amount
				</button>
			</div>
			<div>
				<button onClick={() => dispatch(decrement())}>Decrement by 1</button>
				<button onClick={() => dispatch(increment())}>Increment by 1</button>
			</div>
		</>
	);
};

export default IndexPage;
