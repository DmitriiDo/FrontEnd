import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ path }) => {
    const paths = path.split('/').filter(Boolean);

    // Соответствие между путями и их читаемыми именами
    const pathNames = {
        components: 'Компоненты',
        // Добавьте другие соответствия по мере необходимости
    };

    return (
        <nav className="flex items-center space-x-3 text-lg font-roboto text-gray-600 my-4 ml-6">
            {/* Главная страница */}
            <Link
                to="/"
                className="text-[#1746C1] hover:text-gray-700 font-medium"
            >
                Главная
            </Link>
            {/* Динамические части пути */}
            {paths.map((segment, index) => (
                <React.Fragment key={index}>
                    <span className="text-gray-400">/</span>
                    {index === paths.length - 1 ? (
                        <span className="text-gray-700 font-semibold">
                            {pathNames[segment] || segment}
                        </span>
                    ) : (
                        <Link
                            to={`/${paths.slice(0, index + 1).join('/')}`}
                            className="text-[#1746C1] hover:text-gray-700"
                        >
                            {pathNames[segment] || segment}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
