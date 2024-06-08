import PropTypes from 'prop-types';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';

const Section = ({ editable, title, id, children }) => {
  //add class when is visible for animation
  const [inView, setInView] = useState(false);
  const TitleTag = editable ? 'h3' : 'h2';
  const sectionTitleClassName =
    'text-principal-color font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56';
  const sectionClassName = 'p-2 pt-16 lg:p-16 sm:p-8 z-10';

  return (
    <InView onChange={setInView}>
      <section className={sectionClassName} id={id}>
        <div className={inView ? 'animate-fadeIn' : 'opacity-0'}>
          <TitleTag className={sectionTitleClassName}>{title}</TitleTag>
          {children}
        </div>
      </section>
    </InView>
  );
};
Section.propTypes = {
  editable: PropTypes.bool.isRequired,
  title: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.element,
};
export default Section;
