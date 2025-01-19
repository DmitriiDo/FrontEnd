import Navbar from './components/Navbar';

const HomePage = () => {
    return (
        <div className="bg-background bg-cover bg-center min-h-screen flex flex-col font-roboto">
            {/* Navbar */}
            <Navbar />

            {/* Контент */}
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-gradient-to-r from-[#1746C1] to-[#1D4ED8] shadow-2xl rounded-lg p-8 max-w-lg text-center transform hover:scale-105 transition duration-300 ease-in-out">
                    <h1 className="text-3xl font-semibold mb-4 text-white">
                        Добро пожаловать
                    </h1>
                    <p className="text-gray-100">
                        Здесь вы можете управлять сборкой ракетоносителей Ангара, отслеживать
                        компоненты и следить за прогрессом. Начните с выбора компонента или
                        просмотра доступных сборок.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
