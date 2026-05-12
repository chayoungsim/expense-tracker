import TransactionTypeIcon from './ui/TransactionTypeIcon';
import type { TransactionType } from './ui/TransactionTypeIcon';

export interface Transaction {
    id: number;
    name: string;
    category: string;
    date: string;
    amount: number;
    type: TransactionType;
}

interface TransactionItemProps extends Omit<Transaction, 'id'> {
    showTypeLabel?: boolean;
    className?: string;
}

export function formatAmount(amount: number): string {
    const abs = Math.abs(amount);
    if (abs >= 1000000) return `${(abs / 1000000).toFixed(1)}M`;
    if (abs >= 10000) return `${(abs / 10000).toFixed(1)}만`;
    return abs.toLocaleString('ko-KR');
}

const TransactionItem = ({
    name,
    category,
    date,
    amount,
    type,
    showTypeLabel = false,
    className = '',
}: TransactionItemProps) => {
    return (
        <li className={`tx-item ${className}`.trim()}>
            <TransactionTypeIcon type={type} />
            <div className="tx-item__info">
                <span className="tx-item__name">{name}</span>
                <span className="tx-item__meta">{category} · {date}</span>
            </div>
            <div className="tx-item__trailing">
                <span className={`tx-item__amount tx-item__amount--${type}`}>
                    {type === 'income' ? '+' : '-'}₩ {formatAmount(amount)}
                </span>
                {showTypeLabel && (
                    <span className="tx-item__type-label">
                        {type === 'income' ? '수입' : '지출'}
                    </span>
                )}
            </div>
        </li>
    );
};

export default TransactionItem;
