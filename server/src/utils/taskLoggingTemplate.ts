const taskLoggingTemplate = (task): string => {
	const { id, status, title, description } = task;
	return `
        title: ${title}
        description: ${description}
        id: ${id}
        status: ${status}
    `;
};

export { taskLoggingTemplate };
