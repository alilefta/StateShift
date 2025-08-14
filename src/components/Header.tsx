export const Header = ({ className }: { className?: string }) => {
	const title = "Shift State";
	return (
		<div className={` ${className ? className.split(" ").filter(Boolean).join(" ").trim() : ""}`}>
			<h2 className="text-2xl font-bold">{title}</h2>
		</div>
	);
};
