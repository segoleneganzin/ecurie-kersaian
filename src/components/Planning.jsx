// import WeeklyPlanner from './WeeklyPlanner';

const Planning = () => {
  return (
    <div className='p-4 pt-16 lg:p-16 sm:p-8' id='planning'>
      <h2 className='font-bold pb-10 text-5xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Le planning
      </h2>
      {/* School period */}
      <h3 className='font-bold text-3xl'>Période scolaire</h3>
      {/* <WeeklyPlanner /> */}
      <div className='overflow-scroll w-100dvh'>
        <table className='bg-white border-2 border-principal-color my-6 text-xs sm:text-base w-full'>
          <thead className='bg-principal-color text-white text-left'>
            <tr>
              <th className='p-2 md:py-2 md:px-4 border border-white'></th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>Lundi</th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>Mardi</th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>
                Mercredi
              </th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>Jeudi</th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>
                Vendredi
              </th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>
                Samedi
              </th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>
                Dimanche
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color text-principal-color'>
                9h /10h
              </th>
              {/* Lundi */}
              <td
                className='p-2 md:py-2 md:px-4 bg-principal-color border border-principal-color'
                rowSpan='7'
              >
                Repos
              </td>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-red-400'>
                G2/3
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Samedi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-red-400'>
                G2/3
              </td>
              {/* Dimanche */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
            </tr>
            <tr className='h-16  text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color  text-principal-color'>
                11h/12h
              </th>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-amber-500'>
                G1/2
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-lime-600'>
                Adultes confirmés
              </td>
              {/* Samedi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-amber-500'>
                G1/2
              </td>
              {/* Dimanche */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
            </tr>
            <tr className='h-16  text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color  text-principal-color'>
                14h/15h
              </th>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-cyan-800'>
                G5/6/7
              </td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-cyan-800'>
                G5/6/7
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-cyan-800'>
                G5/6/7
              </td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Samedi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-cyan-800'>
                G5/6/7
              </td>
              {/* Dimanche */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
            </tr>
            <tr className='h-16 text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color  text-principal-color'>
                16h/17h
              </th>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-red-800'>
                G1/2/3
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Samedi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-red-800'>
                G1/2/3
              </td>
              {/* Dimanche */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
            </tr>
            <tr className='h-16 text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color  text-principal-color'>
                18h/19h
              </th>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-lime-800'>
                Adultes
              </td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-violet-900'>
                G7
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-lime-800'>
                Adultes
              </td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-teal-500'>
                G5/6
              </td>
              {/* Samedi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
              {/* Dimanche */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color'></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* School vacations */}
      <h3 className='font-bold text-3xl'>Vacances scolaires</h3>
      <div className='overflow-scroll w-100dvh'>
        <table className='bg-white border-2 border-principal-color my-6 text-xs sm:text-base w-full'>
          <thead className='bg-principal-color text-white text-left'>
            <tr>
              <th className='p-2 md:py-2 md:px-4 border border-white'></th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>Mardi</th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>
                Mercredi
              </th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>Jeudi</th>
              <th className='p-2 md:py-2 md:px-4 border border-white'>
                Vendredi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color text-principal-color'>
                10h /12h
              </th>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-lime-700'>
                Jeux pour les plus jeunes
              </td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-red-400'>
                Initiation shetland 3 à 5ans
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-blue-800'>
                Stage doubles poneys G1/2
              </td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-red-400'>
                Initiation shetland 3 à 5ans
              </td>
            </tr>
            <tr className='h-16  text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color  text-principal-color'>
                13h/14h
              </th>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-red-500'>
                Cours galops 5/6/7
              </td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-orange-800'>
                Cours de rattrapage cavalier du club (G2/3 doubles poneys)
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-orange-800'>
                Cours de rattrapage cavalier du club (baby poney)
              </td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-orange-800'>
                Cours de rattrapage cavalier du club (Shetland débutant/ galop
                1)
              </td>
            </tr>
            <tr className='h-16  text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color  text-principal-color'>
                14h/16h
              </th>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-cyan-800'>
                Jeux pour les plus grands
              </td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-cyan-800'>
                Initiation doubles poneys
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-red-400'>
                Stages shetland débutant/G1 (savoir galoper)
              </td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-cyan-800'>
                Stage doubles poneys G2/3
              </td>
            </tr>
            <tr className='h-16 text-white'>
              <th className='p-2 md:py-2 md:px-4 border border-principal-color  text-principal-color'>
                16h15/17h
              </th>
              {/* Mardi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-slate-600'>
                Baptême poney, promenade à shetland
              </td>
              {/* Mercredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-slate-600'>
                Baptême poney, promenade à shetland
              </td>
              {/* Jeudi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-slate-600'>
                Baptême poney, promenade à shetland
              </td>
              {/* Vendredi */}
              <td className='p-2 md:py-2 md:px-4 border border-principal-color bg-slate-600'>
                Baptême poney, promenade à shetland
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Planning;
