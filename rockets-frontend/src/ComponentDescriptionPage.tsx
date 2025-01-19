import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.tsx";
import Breadcrumbs from "./components/Breadcrumbs.tsx";

const mockComponents = [
    {
        id: 1,
        name: "Титановый шаробалон",
        description:
            "В августе 2018 года было сообщено, что первая товарная партия титановых шаробаллонов (ТШБ) для ракет-носителей «Ангара» отправлена с Воронежского механического завода (ВМЗ) в ПО «Полёт». Это первый комплект ТШБ российского производства: до 2014 года для российских ракет-носителей их поставлял завод «Южмаш» (Украина).",
        category: "Дополнительные запчасти",
        price: "1 200 000 ₽",
        image: "http://localhost:9000/images/1.png",
    },
    {
        id: 2,
        name: "Разгонный блок 'Бриз-М'",
        description:
            "В качестве верхней ступени предусмотрено применение разгонных блоков: «Бриз-КМ», «Бриз-М», кислородно-водородный среднего класса (КВСК) и кислородно-водородный тяжёлого класса (КВТК).",
        category: "Разгонные блоки",
        price: "15 000 000 ₽",
        image: "http://localhost:9000/images/2.png",
    },
    {
        id: 3,
        name: "Центральная вычислительная машина 'Бисер-6'",
        description:
            "«Бисер-6» предназначен для управления движением и бортовыми системами, а также для контроля полёта и формирования телеметрической информации. При решении задач навигации и наведения с помощью «Бисера-6» выполняются арифметические и логические операции, а также операции обмена информацией с внешними абонентами.",
        category: "Электроника",
        price: "5 500 000 ₽",
        image: "http://localhost:9000/images/3.png",
    },
];

const ComponentDescriptionPage = () => {
    const { componentId } = useParams();
    const [component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchComponent = async () => {
        try {
            const response = await fetch(`/api/api/components/${componentId}/`);
            if (!response.ok) throw new Error("Ошибка при загрузке данных");
            const componentData = await response.json();
            setComponent(componentData);
        } catch (err) {
            const mockComponent = mockComponents.find(
                (item) => item.id === parseInt(componentId, 10)
            );
            if (mockComponent) {
                setComponent(mockComponent);
            } else {
                setError("Компонент не найден");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComponent();
    }, [componentId]);

    if (loading) {
        return <div className="text-center my-5">Загрузка данных компонента...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 my-5">Ошибка: {error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen font-roboto">
            {/* Navbar */}
            <Navbar />
            <Breadcrumbs path={`/components/${component.name}`} />

            {/* Контент */}
            <div className="max-w-5xl mx-auto p-4 flex justify-center items-center">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
                    {/* Левая часть: Картинка */}
                    <img
                        src={component.image}
                        alt={component.name}
                        className="w-1/2 object-cover"
                    />

                    {/* Правая часть: Информация */}
                    <div className="p-6 flex flex-col justify-between">
                        <h1 className="text-3xl font-bold text-black mb-4">
                            {component.name}
                        </h1>
                        <p className="text-gray-700 text-lg mb-4">{component.description}</p>
                        <p className="text-gray-600 text-md mb-2">
                            <strong>Категория:</strong> {component.category}
                        </p>
                        <p className="text-md text-gray-600">
                            <strong>Цена:</strong> {component.price} ₽
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentDescriptionPage;
