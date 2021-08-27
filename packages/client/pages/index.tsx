import React, { useEffect, useState } from "react";
import {
	decrement,
	increment,
	incrementByAmount,
	selectCount,
} from "../redux/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTasks, getTasks } from "../redux/dashboard/dashboardSlice";

const IndexPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const count = useAppSelector(selectCount);
	const tasks = useAppSelector(getTasks);
	const [incrementAmount, setIncrementAmount] = useState<number>(0);
	useEffect(() => {
		dispatch(fetchTasks());
	});
	return (
		<>
			<h1>Welcome to the greatest app in the world!</h1>
			<h2>
				The current number is
				{count}
				{tasks}
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
