/* eslint-disable react/no-unescaped-entities */

const Prices = () => {
  return (
    <div className='p-2 pt-16 lg:p-16 sm:p-8' id='prices'>
      <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Les tarifs
      </h2>
      <h3 className='font-bold text-2xl'>Saison 2023/2024</h3>

      <ul className='py-4'>
        <li className='text-sm'>
          <span className='font-bold text-xl'>Cotisation annuelle :</span> 40€
        </li>
        <li className='text-sm'>
          <span className='font-bold text-xl'>Licence annuelle FFE :</span>
          <ul>
            <li>- de 18 ans : 25€</li>
            <li>+ de 18 ans : 36€</li>
          </ul>
        </li>
      </ul>
      {/* Forfaits */}
      <div className='py-4'>
        <h4 className='font-bold text-xl'>
          Forfaits "tout compris" (Adhésion + licence + cours)
        </h4>
        <div className='py-4'>
          <h5 className='font-bold'>Du 1er septembre au 6 juillet</h5>
          <p className='italic text-sm '>
            Cette année, exceptionnellement, les cours auront lieu du 9 octobre
            au 6 juillet. <br />
            Pas de cours durant les vacances scolaires.
          </p>
        </div>
        <table className='bg-white border-2 border-principal-color text-xs mobile:text-base'>
          <thead className='bg-principal-color border border-principal-color text-white'>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-white'>Formules</th>
              <th className='py-2 px-4 border border-white'>Baby</th>
              <th className='py-2 px-4 border border-white'>- de 18ans</th>
              <th className='py-2 px-4 border border-white'>+ de 18ans</th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                1h/semaine
              </th>
              <td className='py-2 px-4 border border-principal-color'>455€</td>
              <td className='py-2 px-4 border border-principal-color'>525€</td>
              <td className='py-2 px-4 border border-principal-color'>543€</td>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                2h/semaine
              </th>
              <td className='py-2 px-4 bg-principal-color border border-principal-color'></td>
              <td className='py-2 px-4 border border-principal-color'>980€</td>
              <td className='py-2 px-4 border border-principal-color'>1015€</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Cartes */}
      <div className='py-4'>
        <h4 className='font-bold text-xl'>Cartes</h4>
        <p className='italic py-4 font-sm'>
          Cotisation et licence obligatoire (non comprises)
        </p>
        <table className='bg-white border-2 border-principal-color text-xs mobile:text-base'>
          <thead className='bg-principal-color text-white'>
            <tr className='h-16  text-left'>
              <th className='py-2 px-4 border border-white'>Cartes</th>
              <th className='py-2 px-4 border border-white'>Tarifs</th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 text-left'>
              <th
                className='py-2 px-4 border-2 border-principal-color'
                colSpan='2'
              >
                Cours collectifs
              </th>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                5 heures
              </th>
              <td className='py-2 px-4  border border-principal-color'>85€</td>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                10 heures
              </th>
              <td className='py-2 px-4  border border-principal-color'>160€</td>
            </tr>
            <tr className='h-16 text-left'>
              <th
                className='py-2 px-4 border-2 border-principal-color'
                colSpan='2'
              >
                Cours particuliers
              </th>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                5 cours club
              </th>
              <td className='py-2 px-4  border border-principal-color'>145€</td>
            </tr>
            <tr className='h-16'>
              <th className='py-2 px-4 border border-principal-color'>
                5 cours propriétaire
              </th>
              <td className='py-2 px-4  border border-principal-color'>135€</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Demi et tiers de pension */}
      <div className='py-4'>
        <h4 className='font-bold text-xl'>Demi pension et tiers de pension</h4>
        <div className='py-4'>
          <p className='font-bold text-sm'>
            (En fonction des chevaux disponibles)
          </p>
          <p className='italic py-4 text-sm'>
            Cotisation et licence obligatoire (non comprises).
            <br />
            La monte libre exclus la pratique de l'obstacle.
          </p>
        </div>
        <table className='bg-white border-2 border-principal-color text-xs mobile:text-base'>
          <thead className='bg-principal-color border border-principal-color text-white'>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-white'>Formules</th>
              <th className='py-2 px-4 border border-white'>Descriptions</th>
              <th className='py-2 px-4 border border-white'>Tarif mensuel</th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                Tiers de pension
              </th>
              <td className='py-2 px-4 border border-principal-color'>
                1 cours par semaine + 1 monte libre
              </td>
              <td className='py-2 px-4 border border-principal-color'>100€</td>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                Demi pension
              </th>
              <td className='py-2 px-4 border border-principal-color'>
                1 cours par semaine + 2 montes libres
              </td>
              <td className='py-2 px-4 border border-principal-color'>150€</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prices;
