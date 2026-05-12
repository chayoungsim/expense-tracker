import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import api from '../../api/api';
import type { Transaction } from '../TransactionItem';

// BarChart에 넘길 데이터 형태
interface ChartData {
    date: string;    // "5월 8일" 형식으로 표시
    income: number;  // 해당 날짜 수입 합계
    expense: number; // 해당 날짜 지출 합계
}

// Transaction[] → 날짜별 수입/지출 합계로 변환
function toChartData(transactions: Transaction[]): ChartData[] {
    const map = new Map<string, { income: number; expense: number }>();

    for (const tx of transactions) {
        const day = tx.date.split('T')[0]; // "2025-05-08T09:00:00" → "2025-05-08"
        if (!map.has(day)) map.set(day, { income: 0, expense: 0 });
        const entry = map.get(day)!;
        if (tx.type === 'income') entry.income += tx.amount;
        else entry.expense += tx.amount;
    }

    return Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b)) // 날짜 오름차순 정렬
        .map(([day, { income, expense }]) => ({
            date: new Date(day).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }),
            income,
            expense,
        }));
}

// Y축 금액 단위 포맷 (50000 → "5만")
function formatYAxis(value: number): string {
    if (value >= 10000) return `${(value / 10000).toFixed(0)}만`;
    return value.toLocaleString('ko-KR');
}

function IncomeExpenseBarChart() {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/transactions');
                // 원본 Transaction[] → 차트용 ChartData[]로 변환
                setChartData(toChartData(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (    
        <div style={{ width: '100%', height: 300 }}>
            {/* ResponsiveContainer: 부모 너비에 맞춰 차트 크기 자동 조절 */}
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* X축: 날짜 ("5월 8일" 등) */}
                    <XAxis dataKey="date" />
                    {/* Y축: 금액 (만 단위로 축약) */}
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip formatter={(value: number) => `₩ ${value.toLocaleString('ko-KR')}`} />
                    <Legend />
                    {/* 수입 막대 (초록) */}
                    <Bar dataKey="income" name="수입" fill="#27ae60" radius={[4, 4, 0, 0]} />
                    {/* 지출 막대 (빨강) */}
                    <Bar dataKey="expense" name="지출" fill="#e74c3c" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default IncomeExpenseBarChart;
