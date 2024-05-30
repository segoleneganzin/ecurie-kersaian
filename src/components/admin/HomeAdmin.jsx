const HomeAdmin = () => {
  return (
    <div className='flex flex-col items-center gap-8 mt-10 px-6 text-center'>
      <p className='text-lg border-b-2 border-principal-color pb-8'>
        Cette page permet de mettre à jour les données visibles par les
        visiteurs{' '}
      </p>
      <p>Il est possible de modifier : </p>
      <ul className='pt-4 leading-8 text-left space-y-4'>
        <li>
          Les <span className='font-bold text-green-800'>tarifs</span> des pages
          &lsquo;centre équestre&rsquo; et &lsquo;pension&rsquo;
        </li>
        <li>
          Les <span className='font-bold text-green-800'>plannings</span> de la
          page &lsquo;centre équestre&rsquo;
        </li>
      </ul>
    </div>
  );
};

export default HomeAdmin;
