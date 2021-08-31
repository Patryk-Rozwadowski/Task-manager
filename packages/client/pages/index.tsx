import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/common/hooks/hooks";
import { getAllTasks } from "../redux/slices/dashboard/tasksSlice";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

export const selectQuote = (state: RootState) => state.tasks;

export const tasksSelector = createSelector(selectQuote, (state) => state);

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
		</>
	);
};

export default IndexPage;
