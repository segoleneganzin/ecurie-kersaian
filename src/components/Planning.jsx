const Planning = () => {
  return (
    <div className='p-4 pt-16 lg:p-16 sm:p-8' id='planning'>
      <h2 className='font-bold pb-10 text-5xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Le planning
      </h2>
      <h3 className='font-bold text-3xl'>Période scolaire</h3>
      <table className='bg-white border-2 border-principal-color min-w-full my-6'>
        <thead className='bg-principal-color text-white'>
          <tr>
            <th className='py-2 px-4 border border-white'></th>
            <th className='py-2 px-4 border border-white'>Lundi</th>
            <th className='py-2 px-4 border border-white'>Mardi</th>
            <th className='py-2 px-4 border border-white'>Mercredi</th>
            <th className='py-2 px-4 border border-white'>Jeudi</th>
            <th className='py-2 px-4 border border-white'>Vendredi</th>
            <th className='py-2 px-4 border border-white'>Samedi</th>
            <th className='py-2 px-4 border border-white'>Dimanche</th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-16'>
            <th className='py-2 px-4 border border-principal-color'>9h /10h</th>
            {/* Lundi */}
            <td
              className='py-2 px-4 bg-principal-color border border-principal-color text-white'
              rowSpan='7'
            >
              Repos
            </td>
            {/* Mardi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Mercredi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Jeudi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Vendredi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Samedi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Dimanche */}
            <td className='py-2 px-4 border border-principal-color'></td>
          </tr>
          <tr className='h-16'>
            <th className='py-2 px-4 border border-principal-color'>11h/12h</th>
            {/* Mardi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Mercredi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Jeudi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Vendredi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Samedi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Dimanche */}
            <td className='py-2 px-4 border border-principal-color'></td>
          </tr>
          <tr className='h-16'>
            <th className='py-2 px-4 border border-principal-color'>14h/15h</th>
            {/* Mardi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Mercredi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Jeudi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Vendredi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Samedi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Dimanche */}
            <td className='py-2 px-4 border border-principal-color'></td>
          </tr>
          <tr className='h-16'>
            <th className='py-2 px-4 border border-principal-color'>16h/17h</th>
            {/* Mardi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Mercredi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Jeudi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Vendredi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Samedi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Dimanche */}
            <td className='py-2 px-4 border border-principal-color'></td>
          </tr>
          <tr className='h-16'>
            <th className='py-2 px-4 border border-principal-color'>18h/19h</th>
            {/* Mardi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Mercredi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Jeudi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Vendredi */}
            <td className='py-2 px-4 border border-principal-color'>Cours</td>
            {/* Samedi */}
            <td className='py-2 px-4 border border-principal-color'></td>
            {/* Dimanche */}
            <td className='py-2 px-4 border border-principal-color'></td>
          </tr>
        </tbody>
      </table>
      <h3 className='font-bold text-3xl'>Vacances scolaires</h3>
    </div>
  );
};

export default Planning;
