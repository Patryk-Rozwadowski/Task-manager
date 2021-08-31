import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/common/hooks/hooks";
import { getAllTasks } from "../redux/slices/tasks/tasks.slice";
import { tasksSelector } from "../redux/slices/tasks/tasks.selector";

const IndexPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { data, pending, error } = useAppSelector(tasksSelector);
	useEffect(() => {
		dispatch(getAllTasks());
	}, []);
	return (
		<>
			<h1>Welcome to the greatest app in the world!</h1>
			<h2>
				{!pending ? (
					data.map((el, i) => (
						<div key={i}>
							<p>{el.id}</p>
							<p>{el.title}</p>
							<p>{el.description}</p>
						</div>
					))
				) : (
					<p>loading</p>
				)}
			</h2>
		</>
	);
};

export default IndexPage;
