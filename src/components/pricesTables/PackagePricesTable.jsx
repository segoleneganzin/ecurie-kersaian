import PropTypes from 'prop-types';
/**
 * @component
 * @param {Object} props
 * @param {string} props.frequency
 * @param {Object} props.prices
 * @param {Object} props.classNames
 * @returns {JSX.Element}
 */
const PackagePricesTable = ({ frequency, prices, classNames }) => {
  return (
    <div className='py-4 md:flex md:justify-between'>
      {/* packages infos */}
      <div className='md:max-w-[300px] lg:max-w-full'>
        <p className='font-bold'>{prices['period']}</p>
        <p className='italic text-base mr-2 '>
          {prices['infos']} <br />
          Pas de cours durant les vacances scolaires.
        </p>
      </div>
      {/* package table prices */}
      <div className={classNames.tableContainer + ' mt-2'}>
        <table className={classNames.table}>
          <thead className={classNames.tableHead}>
            <tr className={classNames.tableRow}>
              <th className={classNames.tableHeadData + ' text-left'}>
                Formules
              </th>
              <th className={classNames.tableHeadData}>Baby</th>
              <th className={classNames.tableHeadData}>- de 18ans</th>
              <th className={classNames.tableHeadData + ' border-r-0'}>
                + de 18ans
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={classNames.tableRow}>
              <th className={classNames.tableData}>1h/semaine</th>
              <td className={classNames.tableData}>
                {prices[frequency]['oneHourWeekly']['baby']}€
              </td>
              <td className={classNames.tableData}>
                {prices[frequency]['oneHourWeekly']['under18']}€
              </td>
              <td className={classNames.tableDataLastRow}>
                {prices[frequency]['oneHourWeekly']['over18']}€
              </td>
            </tr>
            <tr className={classNames.tableRow + ' border-b-0'}>
              <th className={classNames.tableData}>2h/semaine</th>
              <td className={classNames.tableData + ' bg-secondary-color'}></td>
              <td className={classNames.tableData}>
                {prices[frequency]['twoHoursWeekly']['under18']}€
              </td>
              <td className={classNames.tableDataLastRow}>
                {prices[frequency]['twoHoursWeekly']['over18']}€
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
PackagePricesTable.propTypes = {
  prices: PropTypes.object.isRequired,
  classNames: PropTypes.object.isRequired,
  frequency: PropTypes.string.isRequired,
};
export default PackagePricesTable;
