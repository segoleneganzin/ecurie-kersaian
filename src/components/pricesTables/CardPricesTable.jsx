import PropTypes from 'prop-types';
/**
 * @component
 * @param {Object} props
 * @param {Object} props.prices
 * @param {Object} props.classNames
 * @returns {JSX.Element}
 */
const CardPricesTable = ({ prices, classNames }) => {
  return (
    <div className='py-4 md:flex md:justify-between'>
      {/* cards infos */}
      <p className='italic py-4 font-sm'>{prices['infos']} </p>
      {/* cards table prices */}
      <div className={classNames.tableContainer}>
        <table className={classNames.table}>
          <thead className={classNames.tableHead}>
            <tr className={classNames.tableRow}>
              <th className={classNames.tableHeadData}>Cartes</th>
              <th className={classNames.tableHeadData}>Baby</th>
              <th className={classNames.tableHeadData}>- de 18ans</th>
              <th className={classNames.tableHeadData + ' border-r-0'}>
                + de 18ans
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={classNames.tableRow}>
              <th
                className='py-2 px-4 border-b-2 border-secondary-color'
                colSpan='4'
              >
                Cours collectifs
              </th>
            </tr>

            <tr className={classNames.tableRow}>
              <th className={classNames.tableData}>10 heures</th>
              <td className={classNames.tableData}>
                {prices['cardGroupLessons']['tenHours']['baby']}€
              </td>
              <td className={classNames.tableData}>
                {prices['cardGroupLessons']['tenHours']['under18']}€
              </td>
              <td className={classNames.tableDataLastRow}>
                {prices['cardGroupLessons']['tenHours']['over18']}€
              </td>
            </tr>
            <tr className={classNames.tableRow}>
              <th
                className='py-2 px-4 border-t-2 border-b-2 border-secondary-color'
                colSpan='4'
              >
                Cours particuliers
              </th>
            </tr>
            <tr className={classNames.tableRow}>
              <th className={classNames.tableData}> 5 heures club</th>
              <td className={classNames.tableData + ' bg-secondary-color'}></td>

              <td className={classNames.tableData}>
                {prices['cardPrivatesLessons']['fiveClubLessons']['under18']}€
              </td>
              <td className={classNames.tableDataLastRow}>
                {prices['cardPrivatesLessons']['fiveClubLessons']['over18']}€
              </td>
            </tr>
            <tr className={classNames.tableRow + ' border-b-0'}>
              <th className={classNames.tableData}>5 heures propriétaire</th>
              <td className={classNames.tableData + ' bg-secondary-color'}></td>
              <td className={classNames.tableData}>
                {prices['cardPrivatesLessons']['fiveOwnerLessons']['under18']}€
              </td>
              <td className={classNames.tableDataLastRow}>
                {prices['cardPrivatesLessons']['fiveOwnerLessons']['over18']}€
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
CardPricesTable.propTypes = {
  prices: PropTypes.object.isRequired,
  classNames: PropTypes.object.isRequired,
};
export default CardPricesTable;
