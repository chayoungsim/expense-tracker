import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Dot } from 'recharts';
import { useState, useEffect } from 'react';
import api from '../../api/api';
import type { Transaction } from '../TransactionItem';

interface ChartData {
    date: string;    // "5월 8일" 형식으로 표시
    expense: number; // 해당 날짜 지출 합계
}

// Transaction[] → 날짜별 지출 합계로 변환
function toChartData(transactions: Transaction[]): ChartData[] {
    const map = new Map<string, number>();

    for (const tx of transactions) {
        if (tx.type !== 'expense') continue; // 지출만 집계
        const day = tx.date.split('T')[0]; // "2025-05-08T09:00:00" → "2025-05-08"
        map.set(day, (map.get(day) ?? 0) + tx.amount);
    }

    return Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b)) // 날짜 오름차순 정렬
        .map(([day, expense]) => ({
            date: new Date(day).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }),
            expense,
        }));
}

export default function TrendLineChart() {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/transactions');
                // 원본 Transaction[] → 날짜별 지출 합계로 변환
                setChartData(toChartData(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                {/* X축: 날짜 ("5월 8일" 등) */}
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--text)' }} />
                {/* Y축: 만 단위로 축약 */}
                <YAxis
                    tick={{ fontSize: 11, fill: 'var(--text)' }}
                    tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
                />
                <Tooltip formatter={(value: number) => [`₩ ${value.toLocaleString('ko-KR')}`, '지출']} />
                <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="var(--expense, #e74c3c)"
                    strokeWidth={2.5}
                    dot={<Dot r={4} fill="var(--expense, #e74c3c)" />}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
