import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import Breadcrumbs from "./components/Breadcrumbs.tsx";

const mockComponents = [
    { id: 1, name: 'Титановый шаробалонн', image: 'http://localhost:9000/images/1.png', category: 'Дополнительные запчасти' },
    { id: 2, name: 'Разгонный блок \'Бриз-М\'', image: 'http://localhost:9000/images/2.png', category: 'Разгонные блоки' },
    { id: 3, name: 'Центральная вычислительная машина \'Бисер-6\'', image: 'http://localhost:9000/images/3.png', category: 'Электроника' },
];

const ComponentsPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [components, setComponents] = useState(mockComponents);
    const [currentRocketId, setCurrentRocketId] = useState(null);
    const [currentCount, setCurrentCount] = useState(0);

    const fetchComponents = async () => {
        try {
            const response = await fetch('/api/api/components/');
            const componentsData = await response.json();
            console.log(componentsData.components);
            const filteredData = componentsData.components.filter((item: { id: undefined; }) => item.id !== undefined);
            const rocketIdData = componentsData.draft_rocket_id;
            const rocketCountData = componentsData.components_count;
            setComponents(filteredData);
            setCurrentRocketId(rocketIdData?.draft_request_id || null);
            setCurrentCount(rocketCountData?.count || 0);
        } catch (error) {
            console.error('Ошибка при загрузке данных компонентов:', error);
            setComponents(mockComponents);
            setCurrentRocketId(null);
            setCurrentCount(0);
        }
    };

    useEffect(() => {
        fetchComponents();
    }, []);

    const handleSearch = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/api/components/?component_name=${inputValue}`);
            const result = await response.json();
            const filteredResult = result.components.filter((item: { id: undefined; }) => item.id !== undefined);
            setComponents(filteredResult);
        } catch (error) {
            console.error('Ошибка при выполнении поиска:', error);
            setComponents([]);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-roboto">
            {/* Navbar */}
            <Navbar />
            <Breadcrumbs path="/components" />
            {/* Поиск */}
            <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
                <form onSubmit={handleSearch} className="flex w-full max-w-2xl space-x-2">
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Найти
                    </button>
                </form>
                <div className="flex items-center pointer-events-none">
                    <Link
                        to="/cart"
                        className="relative px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700"
                    >
                        КОРЗИНА
                        <span
                            className="absolute -top-2 -right-2 w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm">
                            {currentCount}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Компоненты */}
            <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {components.length > 0 ? (
                    components.map((component) => (
                        <div key={component.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={component.image}
                                alt={component.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[#1746C1] mb-2 min-h-16">{component.name}</h3>
                                <p className="text-gray-600 mb-4">Категория: {component.category}</p>
                                <Link
                                    to={`/components/${component.id}`}
                                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Подробнее
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-full text-gray-700 font-semibold text-lg">
                        Упс, кажется у нас нет такого компонента
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComponentsPage;
