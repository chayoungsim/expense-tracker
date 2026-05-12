import { useState, useMemo } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import TransactionItem from '../components/TransactionItem';
import type { Transaction } from '../components/TransactionItem';
import '../styles/pages/_transaction-history.scss';

// ─── 더미 데이터 ──────────────────────────────────────────────────────────────

const TRANSACTIONS: Transaction[] = [
    { id: 1,  name: '월급-1월',               category: '급여',   date: '2025-05-08 · 09:00', amount: 3200000, type: 'income' },
    { id: 2,  name: '월세',                   category: '주거',   date: '2025-05-08 · 10:30', amount: 650000,  type: 'expense' },
    { id: 3,  name: '마트 장보기',             category: '식비',   date: '2025-05-08 · 14:20', amount: 87500,   type: 'expense' },
    { id: 4,  name: '헬스장 회원권',           category: '건강',   date: '2025-05-07 · 09:00', amount: 60000,   type: 'expense' },
    { id: 5,  name: '프리랜서 디자인 프로젝트', category: '부수입', date: '2025-05-07 · 16:00', amount: 450000,  type: 'income' },
    { id: 6,  name: '카페라떼',               category: '식비',   date: '2025-05-07 · 08:30', amount: 6500,    type: 'expense' },
    { id: 7,  name: '카풀',                   category: '교통',   date: '2025-05-07 · 07:50', amount: 12000,   type: 'expense' },
    { id: 8,  name: 'Spotify',               category: '구독',   date: '2025-05-06 · 00:00', amount: 10900,   type: 'expense' },
    { id: 9,  name: 'YouTube Premium',       category: '구독',   date: '2025-05-06 · 00:00', amount: 13900,   type: 'expense' },
    { id: 10, name: '배당금 입금',             category: '투자',   date: '2025-05-06 · 11:00', amount: 38000,   type: 'income' },
    { id: 11, name: '점심',                   category: '식비',   date: '2025-05-05 · 12:30', amount: 9000,    type: 'expense' },
    { id: 12, name: '지하철',                  category: '교통',   date: '2025-05-05 · 08:10', amount: 1400,    type: 'expense' },
];

// ─── 날짜 그룹화 유틸 ─────────────────────────────────────────────────────────

function getDateLabel(dateStr: string): string {
    const date = new Date(dateStr.split(' · ')[0]);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const fmt = (d: Date) => d.toDateString();
    if (fmt(date) === fmt(today)) return '오늘';
    if (fmt(date) === fmt(yesterday)) return '어제';

    return date.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
    });
}

function groupByDate(list: Transaction[]): { label: string; items: Transaction[] }[] {
    const map = new Map<string, Transaction[]>();
    for (const tx of list) {
        const key = tx.date.split(' · ')[0];
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(tx);
    }
    return Array.from(map.entries()).map(([key, items]) => ({
        label: getDateLabel(key + ' · 00:00'),
        items,
    }));
}

// ─── 필터 타입 ────────────────────────────────────────────────────────────────

type FilterType = 'all' | 'income' | 'expense';

const FILTERS: { value: FilterType; label: string }[] = [
    { value: 'all',     label: '전체' },
    { value: 'income',  label: '수입' },
    { value: 'expense', label: '지출' },
];

// ─── 페이지 컴포넌트 ──────────────────────────────────────────────────────────

const TransactionHistory = () => {
    const [query, setQuery]   = useState('');
    const [filter, setFilter] = useState<FilterType>('all');

    const filtered = useMemo(() => {
        return TRANSACTIONS.filter((tx) => {
            const matchType   = filter === 'all' || tx.type === filter;
            const matchSearch = query === '' ||
                tx.name.toLowerCase().includes(query.toLowerCase()) ||
                tx.category.toLowerCase().includes(query.toLowerCase());
            return matchType && matchSearch;
        });
    }, [query, filter]);

    const grouped = useMemo(() => groupByDate(filtered), [filtered]);

    return (
        <main className="tx-history">
            {/* ── 헤더 ──────────────────────────────────────── */}
            <header className="tx-history__header">
                <h1 className="tx-history__title">거래 내역</h1>
            </header>

            {/* ── 검색 + 필터 ───────────────────────────────── */}
            <div className="tx-history__toolbar">
                <div className="tx-history__search">
                    <Search size={18} className="tx-history__search-icon" aria-hidden="true" />
                    <input
                        type="search"
                        className="tx-history__search-input"
                        placeholder="검색"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="거래 검색"
                    />
                </div>

                <div className="tx-history__filters" role="group" aria-label="거래 유형 필터">
                    <button
                        className="tx-history__filter-icon"
                        type="button"
                        aria-label="정렬 및 필터"
                    >
                        <SlidersHorizontal size={18} />
                    </button>
                    {FILTERS.map(({ value, label }) => (
                        <button
                            key={value}
                            type="button"
                            className={`tx-history__chip${filter === value ? ' tx-history__chip--active' : ''}`}
                            onClick={() => setFilter(value)}
                            aria-pressed={filter === value}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── 거래 목록 ─────────────────────────────────── */}
            <div className="tx-history__body">
                {grouped.length === 0 ? (
                    <div className="tx-history__empty" role="status">
                        <p>조건에 맞는 거래 내역이 없습니다.</p>
                    </div>
                ) : (
                    grouped.map(({ label, items }) => (
                        <section key={label} className="tx-history__group">
                            <div className="tx-history__group-header" aria-label={label}>
                                <span className="tx-history__group-label">{label}</span>
                                <span className="tx-history__group-divider" aria-hidden="true" />
                            </div>
                            <ul className="tx-history__list" role="list">
                                {items.map((tx) => (
                                    <TransactionItem
                                        key={tx.id}
                                        {...tx}
                                        showTypeLabel
                                    />
                                ))}
                            </ul>
                        </section>
                    ))
                )}
            </div>
        </main>
    );
};

export default TransactionHistory;
