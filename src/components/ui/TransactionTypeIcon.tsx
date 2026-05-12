import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

type TransactionType = 'income' | 'expense';

interface TransactionTypeIconProps {
    type: TransactionType;
    size?: number;
    className?: string;
}

const TransactionTypeIcon = ({
    type,
    size = 18,
    className = '',
}: TransactionTypeIconProps) => {
    return (
        <span
            className={`tx-type-icon tx-type-icon--${type} ${className}`.trim()}
            aria-hidden="true"
        >
            {type === 'income' ? (
                <ArrowDownLeft size={size} />
            ) : (
                <ArrowUpRight size={size} />
            )}
        </span>
    );
};

export default TransactionTypeIcon;
export type { TransactionType };
