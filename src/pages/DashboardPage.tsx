import {
    Bell,
    Search,
    Eye,
    EyeOff,
    TrendingUp,
    TrendingDown,
    ChevronRight,
    CreditCard,
    Plus,
} from 'lucide-react';
import { useState } from 'react';
import '../styles/components/_dashboard.scss';
import TransactionItem from '../components/TransactionItem';
import type { Transaction } from '../components/TransactionItem';

// ─── 더미 데이터 ──────────────────────────────────────────────────────────────


const recentTransactions: Transaction[] = [
    {
        id: 1,
        name: 'PayPal',
        category: '이체',
        date: '오늘, 오후 2:30',
        amount: +125000,
        type: 'income' as const,
    },
    {
        id: 2,
        name: 'Spotify',
        category: '구독',
        date: '어제, 오전 9:15',
        amount: -10900,
        type: 'expense' as const,
    },
    {
        id: 3,
        name: 'Notion',
        category: '업무 도구',
        date: '5월 6일, 오후 4:00',
        amount: -16000,
        type: 'expense' as const,
    },
    {
        id: 4,
        name: '월급',
        category: '급여',
        date: '5월 5일, 오전 9:00',
        amount: +3200000,
        type: 'income' as const,
    },
    {
        id: 5,
        name: '월급',
        category: '급여',
        date: '5월 5일, 오전 9:00',
        amount: +3200000,
        type: 'income' as const,
    },
];

// ─── 서브 컴포넌트 ────────────────────────────────────────────────────────────



function formatBalance(amount: number): string {
    return amount.toLocaleString('ko-KR');
}

// ─── 메인 페이지 ─────────────────────────────────────────────────────────────

const DashboardPage = () => {
    const [balanceVisible, setBalanceVisible] = useState(true);

    const totalBalance = 12458500;
    const monthlyIncome = 3325000;
    const monthlyExpense = 866800;

    return (
        <main className="dashboard">
            {/* ── 히어로 헤더 ────────────────────────────────── */}
            <section className="dashboard__hero">
                <div className="dashboard__hero__bg" aria-hidden="true">
                    <span className="blob blob--1" />
                    <span className="blob blob--2" />
                    <span className="blob blob--3" />
                </div>

                <div className="dashboard__hero__inner">
                    {/* 상단: 인사말 + 아이콘 버튼 */}
                    <div className="dashboard__hero__top">
                        <div className="dashboard__hero__user">
                            <div className="dashboard__avatar" aria-hidden="true">J</div>
                            <div className="dashboard__hero__greeting">
                                <span className="dashboard__hero__name">John Doe</span>
                                <span className="dashboard__hero__sub">Welcome back 👋</span>
                            </div>
                        </div>
                        <div className="dashboard__hero__actions">
                            <button
                                className="dashboard__icon-btn"
                                aria-label="검색"
                                type="button"
                            >
                                <Search size={20} />
                            </button>
                            <button
                                className="dashboard__icon-btn dashboard__icon-btn--notif"
                                aria-label="알림"
                                type="button"
                            >
                                <Bell size={20} />
                                <span className="dashboard__notif-dot" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    {/* 잔액 표시 */}
                    <div className="dashboard__balance">
                        <div className="dashboard__balance__label">
                            <span>현재 잔액</span>
                            <button
                                onClick={() => setBalanceVisible((v) => !v)}
                                aria-label={balanceVisible ? '잔액 숨기기' : '잔액 보이기'}
                                type="button"
                            >
                                {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                        </div>
                        <p className="dashboard__balance__amount">
                            {balanceVisible ? `₩ ${formatBalance(totalBalance)}` : '₩ ••••••'}
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 콘텐츠 영역 ────────────────────────────────── */}
            <div className="dashboard__body">

                {/* ── 수입 / 지출 요약 ─────────────────────────── */}
                <section className="dashboard__recap" aria-labelledby="recap-heading">
                    <h2 id="recap-heading" className="sr-only">이번 달 요약</h2>
                    <div className="dashboard__recap__card dashboard__recap__card--income">
                        <div className="dashboard__recap__icon">
                            <TrendingUp size={18} />
                        </div>
                        <div className="dashboard__recap__info">
                            <span className="dashboard__recap__label">이번 달 수입</span>
                            <span className="dashboard__recap__amount">
                                +₩ {formatBalance(monthlyIncome)}
                            </span>
                        </div>
                    </div>
                    <div className="dashboard__recap__card dashboard__recap__card--expense">
                        <div className="dashboard__recap__icon">
                            <TrendingDown size={18} />
                        </div>
                        <div className="dashboard__recap__info">
                            <span className="dashboard__recap__label">이번 달 지출</span>
                            <span className="dashboard__recap__amount">
                                -₩ {formatBalance(monthlyExpense)}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ── 카드 섹션 ────────────────────────────────── */}
                <section className="dashboard__section" aria-labelledby="card-heading">
                    <div className="dashboard__section__header">
                        <h2 id="card-heading" className="dashboard__section__title">내 카드</h2>
                        <button
                            className="dashboard__section__more"
                            type="button"
                            aria-label="카드 전체 보기"
                        >
                            전체 보기 <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="dashboard__card-list" role="list">
                        <div className="dashboard__card dashboard__card--main" role="listitem">
                            <div className="dashboard__card__top">
                                <span className="dashboard__card__type">VISA</span>
                                <CreditCard size={20} />
                            </div>
                            <p className="dashboard__card__number">•••• •••• •••• 4291</p>
                            <div className="dashboard__card__bottom">
                                <div>
                                    <span className="dashboard__card__meta-label">카드 소유자</span>
                                    <span className="dashboard__card__meta-value">John Doe</span>
                                </div>
                                <div>
                                    <span className="dashboard__card__meta-label">만료일</span>
                                    <span className="dashboard__card__meta-value">12/27</span>
                                </div>
                            </div>
                        </div>
                        <button
                            className="dashboard__card dashboard__card--add"
                            type="button"
                            aria-label="카드 추가"
                        >
                            <Plus size={24} />
                            <span>카드 추가</span>
                        </button>
                    </div>
                </section>



                {/* ── 최근 거래 ────────────────────────────────── */}
                <section className="dashboard__section" aria-labelledby="transactions-heading">
                    <div className="dashboard__section__header">
                        <h2 id="transactions-heading" className="dashboard__section__title">
                            최근 거래
                        </h2>
                        <button
                            className="dashboard__section__more"
                            type="button"
                            aria-label="거래 전체 보기"
                        >
                            전체 보기 <ChevronRight size={14} />
                        </button>
                    </div>
                    <ul className="dashboard__tx-list" role="list">
                        {recentTransactions.map((tx) => (
                            <TransactionItem key={tx.id} {...tx} />
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default DashboardPage;
