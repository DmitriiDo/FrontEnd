const Navbar = () => {
    return (
        <nav className="bg-[#1746C1] text-white px-6 py-4 flex justify-between items-center">
            {/* Левая часть */}
            <div className="text-lg font-bold">
                <a
                    href="/"
                    className="hover:text-gray-300 transition-colors duration-200"
                >
                    Сборка ракетоносителей Ангара разных типов
                </a>
            </div>
            {/* Правая часть */}
            <div className="flex space-x-4">
                <a
                    href="/components"
                    className="text-md font-medium hover:text-gray-300"
                >
                    Компоненты
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
