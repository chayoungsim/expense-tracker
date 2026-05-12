import { NavLink, useLocation } from 'react-router-dom';
import { Home, PieChart, Target, User, Plus } from 'lucide-react';
import '../../styles/layout/_nav.scss';

const navItems = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/analytics', label: 'Analytics', icon: PieChart, end: false },
    null, // 중앙 추가 버튼 자리
    { to: '/transactionHistory', label: 'Goals', icon: Target, end: false },
    { to: '/profile', label: 'Profile', icon: User, end: false },
] as const;

const Nav = () => {
    const location = useLocation();

    return (
        <nav className="bottom-nav" aria-label="메인 내비게이션">
            <ul className="bottom-nav__list" role="list">
                {navItems.map((item, idx) => {
                    // 중앙 추가 버튼
                    if (item === null) {
                        return (
                            <li key="add" className="bottom-nav__item bottom-nav__item--add">
                                <NavLink
                                    to="/addTransaction"
                                    className="bottom-nav__add-btn"
                                    aria-label="거래 추가"
                                >
                                    <Plus size={22} strokeWidth={2.5} />
                                </NavLink>
                            </li>
                        );
                    }

                    const Icon = item.icon;
                    const isActive = item.end
                        ? location.pathname === item.to
                        : location.pathname.startsWith(item.to);

                    return (
                        <li key={idx} className="bottom-nav__item">
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={({ isActive: navIsActive }) =>
                                    `bottom-nav__link${navIsActive ? ' bottom-nav__link--active' : ''}`
                                }
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <span className="bottom-nav__icon" aria-hidden="true">
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                                </span>
                                <span className="bottom-nav__label">{item.label}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Nav;
