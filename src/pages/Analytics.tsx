import IncomeExpenseBarChart from "../components/charts/IncomeExpenseBarChart"
import TrendLineChart from "../components/charts/TrendLineChart"

const Analytics = () => {
  return (
    <div>

      {/* 월별 수입/지출 비교 */}
      <header className="tx-history__header">
          <h1 className="tx-history__title">통계</h1>
        </header>
      <div>
          <h2>월별 수입/지출 비교</h2>
          <IncomeExpenseBarChart />
      </div>


      {/* 지출 추이 */}
      <div>
          <h2>지출 추이</h2>
          <TrendLineChart />
      </div>

      {/* 카테고리별 지출 */}
      <div>

      </div>

    </div>
  )
}

export default Analytics