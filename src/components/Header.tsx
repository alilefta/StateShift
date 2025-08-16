export const Header = ({ className }: { className?: string }) => {
	const title = "Shift State";
	return (
		<header className={`backdrop-blur-lg bg-white/10 border-b border-white/20 px-6 py-4 ${className ? className.split(" ").filter(Boolean).join(" ").trim() : ""}`}>
			<div className="container mx-auto">
				<h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{title}</h2>
			</div>
		</header>
	);
};
