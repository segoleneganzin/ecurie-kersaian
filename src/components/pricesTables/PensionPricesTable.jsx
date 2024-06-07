import PropTypes from 'prop-types';

const PensionPricesTable = ({ prices, classNames }) => {
  return (
    <div className='py-4 w-fit m-auto lg:m-0 lg:w-full lg:flex lg:justify-between'>
      {/* Infos */}
      <div>
        <p className='font-bold text-base'>
          (En fonction des chevaux disponibles)
        </p>
        <p className='italic py-4 text-base'>
          Cotisation et licence obligatoires (non comprises). <br />
          La monte libre exclut la pratique de l&apos;obstacle.
        </p>
      </div>
      {/* Table prices */}
      <div className={classNames.tableContainer}>
        <table className={classNames.table}>
          <thead className={classNames.tableHead}>
            <tr className={classNames.tableRow}>
              <th className={classNames.tableHeadData}>Formules</th>
              <th className={classNames.tableHeadData}>Descriptions</th>
              <th className={classNames.tableDataLastRow}>Tarif mensuel</th>
            </tr>
          </thead>
          <tbody>
            <tr className={classNames.tableRow}>
              <th className={classNames.tableData}>Tiers de pension</th>
              <td className={classNames.tableData}>
                {prices && prices['thirdPartPension']['description']}
              </td>
              <td className={classNames.tableDataLastRow}>
                {' '}
                {prices && prices['thirdPartPension']['price']}€
              </td>
            </tr>
            <tr className={classNames.tableRow + ' border-b-0'}>
              <th className={classNames.tableData}>Demi pension</th>
              <td className={classNames.tableData}>
                {prices && prices['halfPension']['description']}
              </td>
              <td className={classNames.tableDataLastRow}>
                {' '}
                {prices && prices['halfPension']['price']}€
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
PensionPricesTable.propTypes = {
  prices: PropTypes.object.isRequired,
  classNames: PropTypes.object.isRequired,
};
export default PensionPricesTable;
